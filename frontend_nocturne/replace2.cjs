const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (fs.statSync(dirPath).isDirectory()) {
            walk(dirPath, callback);
        } else {
            callback(path.join(dir, f));
        }
    });
}

// 1. Update logo size across files
walk('./src', function(filePath) {
    if (filePath.endsWith('.vue') || filePath.endsWith('.html')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent = content.replace(/style="height: 1.5em; width: auto; object-fit: contain; margin-right: 8px; border-radius: 50%;"/g, 'style="height: 2.5em; width: auto; object-fit: contain; margin-right: 12px; border-radius: 50%;"');
        
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent);
            console.log('Updated logo size in', filePath);
        }
    }
});

// 2. Update brand-title CSS in CatalogoView.vue
let catalogoPath = './src/views/CatalogoView.vue';
let catalogoContent = fs.readFileSync(catalogoPath, 'utf8');
let newCatalogoContent = catalogoContent.replace(/font-size: 6rem;/g, 'font-size: clamp(2rem, 5.5vw, 5rem);\n  line-height: 1.1;\n  padding: 0 15px;');
if (catalogoContent !== newCatalogoContent) {
    fs.writeFileSync(catalogoPath, newCatalogoContent);
    console.log('Updated brand-title in', catalogoPath);
}

