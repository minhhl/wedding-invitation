const fs = require('fs');
const html = fs.readFileSync(process.argv[2], 'utf8');

// Pull out the #style_element block content (it's one giant <style> tag)
const styleMatch = html.match(/<style id="style_element"[^>]*>([\s\S]*?)<\/style>/);
const css = styleMatch[1];

// Split into rules: selector{body}
const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
let m;
const idRules = {}; // id -> array of {selector, body}
while ((m = ruleRe.exec(css))) {
  const selectorGroup = m[1];
  const body = m[2].trim();
  if (!body) continue;
  const selectors = selectorGroup.split(',').map(s => s.trim());
  for (const sel of selectors) {
    const idMatch = sel.match(/^#([A-Z_]+[0-9]+)/);
    if (!idMatch) continue;
    const id = idMatch[1];
    idRules[id] = idRules[id] || [];
    idRules[id].push({ sel, body });
  }
}

function numProp(body, prop) {
  const re = new RegExp(prop + ':\\s*(-?[0-9.]+)px');
  const mm = body.match(re);
  return mm ? parseFloat(mm[1]) : undefined;
}

const result = {};
for (const id of Object.keys(idRules)) {
  const rules = idRules[id];
  const entry = { top: undefined, left: undefined, width: undefined, height: undefined, bgImage: undefined, font: {}, animation: undefined };
  for (const { sel, body } of rules) {
    if (sel === `#${id}`) {
      const t = numProp(body, 'top'); if (t !== undefined) entry.top = t;
      const l = numProp(body, 'left'); if (l !== undefined) entry.left = l;
      const w = numProp(body, 'width'); if (w !== undefined) entry.width = w;
      const h = numProp(body, 'height'); if (h !== undefined) entry.height = h;
    }
    if (sel.includes('.ladi-image-background') && sel.startsWith(`#${id} `)) {
      const bg = body.match(/background-image:\s*url\("([^"]+)"\)/);
      if (bg) entry.bgImage = bg[1];
      const w = numProp(body, 'width'); if (w !== undefined) entry.bgWidth = w;
      const h = numProp(body, 'height'); if (h !== undefined) entry.bgHeight = h;
    }
    if (sel.match(new RegExp(`^#${id} > \\.ladi-headline$`)) || sel.match(new RegExp(`^#${id} > \\.ladi-headline,`)) || sel.includes(`#${id} > .ladi-headline`)) {
      const ff = body.match(/font-family:\s*([^;]+);/);
      const fs_ = body.match(/font-size:\s*([0-9.]+)px/);
      const color = body.match(/color:\s*(rgb\([^)]+\)|#[0-9a-fA-F]+)/);
      const ls = body.match(/letter-spacing:\s*([0-9.]+)px/);
      const ta = body.match(/text-align:\s*(\w+)/);
      const lh = body.match(/line-height:\s*([0-9.]+)/);
      if (ff) entry.font.family = ff[1].trim();
      if (fs_) entry.font.size = fs_[1];
      if (color) entry.font.color = color[1];
      if (ls) entry.font.letterSpacing = ls[1];
      if (ta) entry.font.textAlign = ta[1];
      if (lh) entry.font.lineHeight = lh[1];
    }
    if (sel.includes('.ladi-animation') && body.includes('animation-name')) {
      const an = body.match(/animation-name:\s*(\w+)/);
      const ad = body.match(/animation-delay:\s*([0-9.]+s)/);
      const adur = body.match(/animation-duration:\s*([0-9.]+s)/);
      if (an) entry.animation = { name: an[1], delay: ad ? ad[1] : undefined, duration: adur ? adur[1] : undefined };
    }
  }
  result[id] = entry;
}

fs.writeFileSync(process.argv[3], JSON.stringify(result, null, 1));
console.log('Wrote', Object.keys(result).length, 'element specs to', process.argv[3]);
