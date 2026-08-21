// Walks the raw Ladipage HTML into a real DOM-ish tree so we can preserve
// parent/child nesting for absolutely-positioned elements (their top/left is
// relative to the nearest positioned ancestor, not the page).
const fs = require('fs');

const html = fs.readFileSync(process.argv[2], 'utf8');
const spec = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));

const VOID_TAGS = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);

function tokenize(html) {
  const tokens = [];
  const tagRe = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:\s+[^<>]*?)?)\s*(\/?)>/g;
  let lastIndex = 0;
  let m;
  while ((m = tagRe.exec(html))) {
    if (m.index > lastIndex) {
      const text = html.slice(lastIndex, m.index);
      if (text.trim()) tokens.push({ type: 'text', text });
    }
    const [, closing, tag, attrsRaw, selfClose] = m;
    if (closing) {
      tokens.push({ type: 'close', tag: tag.toLowerCase() });
    } else {
      const attrs = {};
      const attrRe = /([a-zA-Z0-9_-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
      let am;
      while ((am = attrRe.exec(attrsRaw))) {
        attrs[am[1]] = am[2] !== undefined ? am[2] : am[3];
      }
      const isVoid = VOID_TAGS.has(tag.toLowerCase()) || !!selfClose;
      tokens.push({ type: 'open', tag: tag.toLowerCase(), attrs, void: isVoid });
    }
    lastIndex = tagRe.lastIndex;
  }
  return tokens;
}

function buildTree(tokens) {
  const root = { tag: 'root', attrs: {}, children: [] };
  const stack = [root];
  for (const t of tokens) {
    const top = stack[stack.length - 1];
    if (t.type === 'open') {
      const node = { tag: t.tag, attrs: t.attrs, children: [] };
      top.children.push(node);
      if (!t.void) stack.push(node);
    } else if (t.type === 'close') {
      // pop until matching tag found (handles the few places void tags aren't marked self-closing)
      for (let i = stack.length - 1; i > 0; i--) {
        if (stack[i].tag === t.tag) {
          stack.length = i;
          break;
        }
      }
    } else if (t.type === 'text') {
      top.children.push({ tag: '#text', text: t.text, children: [] });
    }
  }
  return root;
}

function textOf(node) {
  let out = '';
  for (const c of node.children) {
    if (c.tag === '#text') out += c.text;
    else if (c.tag === 'br') out += ' / ';
    else out += textOf(c);
  }
  return out.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
}

// Find every element whose id matches one of our known types, walking the
// whole tree, and record its parent ladi-element id (skipping intermediate
// wrapper divs like .ladi-group/.ladi-image that aren't ladi-elements).
const KNOWN = /^(IMAGE|HEADLINE|GROUP|BOX|LINE|SHAPE|FORM|FORM_ITEM|BUTTON|POPUP|SECTION)[0-9_A-Z]*$/;

function findHeadlineNode(node) {
  if (node.tag && /^h[1-6]$/.test(node.tag)) return node;
  if (node.attrs && (node.attrs.class || '').includes('ladi-headline')) return node;
  for (const c of node.children) {
    if (c.attrs && c.attrs.id && KNOWN.test(c.attrs.id)) continue; // don't cross into a nested id'd element
    const found = findHeadlineNode(c);
    if (found) return found;
  }
  return null;
}

function walk(node, parentElementId, sectionId, out) {
  const id = node.attrs && node.attrs.id;
  let nextParent = parentElementId;
  let nextSection = sectionId;
  if (id && KNOWN.test(id)) {
    if (/^SECTION/.test(id)) {
      nextSection = id;
    } else {
      const entry = spec[id] || {};
      const record = {
        id,
        tag: node.tag,
        parent: parentElementId,
        section: sectionId,
        top: entry.top,
        left: entry.left,
        width: entry.width,
        height: entry.height,
        bgImage: entry.bgImage,
        font: entry.font,
        animation: entry.animation,
      };
      if (/^HEADLINE/.test(id)) {
        const hNode = findHeadlineNode(node);
        if (hNode) record.text = textOf(hNode);
      }
      out.push(record);
      nextParent = id;
    }
  }
  for (const child of node.children) {
    walk(child, nextParent, nextSection, out);
  }
}

const tokens = tokenize(html);
const tree = buildTree(tokens);
const out = [];
walk(tree, null, null, out);

fs.writeFileSync(process.argv[4], JSON.stringify(out, null, 1));
console.log('Wrote', out.length, 'nodes with parent/section info to', process.argv[4]);
