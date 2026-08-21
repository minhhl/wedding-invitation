const fs = require('fs');
const html = fs.readFileSync(process.argv[2], 'utf8');

const idRe = /<div id="(HEADLINE[0-9]+)" class=['"]ladi-element['"][^>]*>/g;
let m;
while ((m = idRe.exec(html))) {
  const id = m[1];
  const start = idRe.lastIndex;
  // find the matching close by tracking div depth from start
  let depth = 1;
  let i = start;
  const divOpen = /<div/g;
  const divClose = /<\/div>/g;
  // simple scan char by char for div tags
  let pos = start;
  while (depth > 0 && pos < html.length) {
    const nextOpen = html.indexOf('<div', pos);
    const nextClose = html.indexOf('</div>', pos);
    if (nextClose === -1) break;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      pos = nextClose + 6;
    }
  }
  const inner = html.slice(start, pos - 6);
  const text = inner.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  if (text) console.log(`${id}: ${text}`);
}
