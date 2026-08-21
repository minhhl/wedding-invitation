const fs = require('fs');
const html = fs.readFileSync(process.argv[2], 'utf8');

const re = /<div id="(HEADLINE[0-9]+)" class=['"]ladi-element[^>]*>\s*<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/g;
let m;
while ((m = re.exec(html))) {
  const id = m[1];
  let text = m[2].replace(/<br\s*\/?>/g, ' / ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  console.log(`${id}: ${text || '(empty)'}`);
}
