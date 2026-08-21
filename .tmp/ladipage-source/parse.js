const fs = require('fs');
const html = fs.readFileSync(process.argv[2], 'utf8');

// 1. Find section boundaries (order of appearance)
const sectionRe = /id="(SECTION[0-9A-Z_]*)"/g;
let m;
const sections = [];
while ((m = sectionRe.exec(html))) {
  sections.push({ id: m[1], pos: m.index });
}
// dedupe consecutive same id (id appears once per opening tag normally)
const uniqSections = [];
const seen = new Set();
for (const s of sections) {
  if (!seen.has(s.id)) { uniqSections.push(s); seen.add(s.id); }
}

// 2. Find all element ids in doc order (top-level ladi-element divs)
const elRe = /<div id="((?:IMAGE|HEADLINE|GROUP|BOX|LINE|SHAPE|FORM|BUTTON|POPUP|FORM_ITEM)[0-9]+)" class=['"]ladi-element/g;
const elements = [];
while ((m = elRe.exec(html))) {
  elements.push({ id: m[1], pos: m.index });
}

function sectionFor(pos) {
  let cur = null;
  for (const s of uniqSections) {
    if (s.pos <= pos) cur = s.id; else break;
  }
  return cur;
}

const bySection = {};
for (const el of elements) {
  const sec = sectionFor(el.pos);
  bySection[sec] = bySection[sec] || [];
  bySection[sec].push(el.id);
}

console.log('=== SECTION ORDER ===');
console.log(uniqSections.map(s => s.id).join(' -> '));
console.log('\n=== ELEMENTS PER SECTION ===');
for (const s of uniqSections) {
  const els = bySection[s.id] || [];
  console.log(`\n-- ${s.id} (${els.length} elements) --`);
  console.log(els.join(', '));
}
