const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

walk('./src', function(filePath) {
    if (filePath.endsWith('.vue') || filePath.endsWith('.html') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent = content.replace(/<i[^>]*bi-shield-fill[^>]*><\/i>/g, '<img src="/logo_owl.png" alt="Nocturne Logo" style="height: 1.5em; width: auto; object-fit: contain; margin-right: 8px; border-radius: 50%;" />');
        
        // Also replace bi-shield if it's used
        newContent = newContent.replace(/<i[^>]*bi-shield[^>]*><\/i>/g, '<img src="/logo_owl.png" alt="Nocturne Logo" style="height: 1.5em; width: auto; object-fit: contain; margin-right: 8px; border-radius: 50%;" />');

        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent);
            console.log('Updated', filePath);
        }
    }
});
