const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/emerald/g, 'blue');
      content = content.replace(/green/g, 'indigo');
      content = content.replace(/lime/g, 'cyan');
      content = content.replace(/teal/g, 'slate');
      content = content.replace(/bg-\[#071510\]/g, 'bg-[#0b1121]');
      fs.writeFileSync(fullPath, content);
    }
  }
}

replaceInDir(path.join(__dirname, 'components'));
replaceInDir(path.join(__dirname, 'lib'));
console.log('Colors replaced successfully!');
