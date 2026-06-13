const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgs = [
  'toyota.svg', 'honda.svg', 'ford.svg', 'chevrolet.svg', 'bmw.svg',
  'mercedes.svg', 'audi.svg', 'nissan.svg', 'hyundai.svg', 'kia.svg',
  'volkswagen.svg', 'subaru.svg', 'mazda.svg', 'lexus.svg', 'jeep.svg'
];

const dir = 'public/brands';

async function convert() {
  for (const svg of svgs) {
    const inPath = path.join(dir, svg);
    const outPath = path.join(dir, svg.replace('.svg', '.png'));
    try {
      const c = fs.readFileSync(inPath, 'utf-8');
      const m = c.match(/viewBox="0 0 (\d+) (\d+)"/);
      let w = 800, h = 400;
      if (m) { const r = parseInt(m[2]) / parseInt(m[1]); w = 800; h = Math.round(w * r); }
      await sharp(inPath).resize(w, h).png().toFile(outPath);
      const s = fs.statSync(outPath);
      console.log('OK ' + svg.replace('.svg', '.png') + ' (' + s.size + 'b ' + w + 'x' + h + ')');
    } catch (e) { console.log('FAIL ' + svg + ' - ' + e.message); }
  }
  console.log('DONE');
}
convert();
