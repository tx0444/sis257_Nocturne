const fs = require('fs');
const path = require('path');

const target = "import { PartialType } from '@nestjs/mapped-types';";

function walk(dir) {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (full.endsWith('.ts')) {
      let content = fs.readFileSync(full, 'utf8');
      // Si contiene el import y no está al mero inicio (index > 50)
      if (content.includes(target) && content.indexOf(target) > 50) {
         let newC = content.split(target).join('');
         // Limpiar nuevas líneas que pudieron quedar
         newC = newC.replace(/\n\s*\n/g, '\n\n');
         
         // Insertarlo al inicio
         fs.writeFileSync(full, target + '\n' + newC.trimStart());
         console.log('Fixed:', full);
      }
    }
  }
}

walk('src');
