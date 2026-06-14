const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\Tx098\\Desktop\\presentacionTx\\sis257_NocturneTx';

const replacements = {
    "NOCTURNE: COLD STORAGE": "NOCTURNE: COLD STORAGE",
    "Nocturne: Cold Storage": "Nocturne: Cold Storage",
    "nocturnecoldstorage": "nocturnecoldstorage",
    "NOCTURNE_COLD_STORAGE": "NOCTURNE_COLD_STORAGE",
    "nocturne_cold_storage": "nocturne_cold_storage"
};

const ignoreDirs = new Set(["node_modules", "dist", ".git", "build"]);

function processFile(filepath) {
    try {
        let content = fs.readFileSync(filepath, 'utf8');
        let newContent = content;
        for (const [oldStr, newStr] of Object.entries(replacements)) {
            newContent = newContent.split(oldStr).join(newStr);
        }

        // Also replace the shield icon with the logo
        newContent = newContent.split('<img src="/logo.png" alt="Logo" class="animate-glow" style="height: 32px; width: auto;" />').join('<img src="/logo.png" alt="Logo" class="animate-glow" style="height: 32px; width: auto;" />');
        newContent = newContent.split('<img src="/logo.png" alt="Logo" style="height: 24px; width: auto;" />').join('<img src="/logo.png" alt="Logo" style="height: 24px; width: auto;" />');
        newContent = newContent.split('<img src="/logo.png" alt="Logo" class="me-2" style="height: 24px; width: auto;" />').join('<img src="/logo.png" alt="Logo" class="me-2" style="height: 24px; width: auto;" />');
        newContent = newContent.split('<img src="/logo.png" alt="Logo" style="height: 24px; width: auto;" />').join('<img src="/logo.png" alt="Logo" style="height: 24px; width: auto;" />');
        newContent = newContent.split('<img src="/logo.png" alt="Logo" class="mt-1" style="height: 24px; width: auto;" />').join('<img src="/logo.png" alt="Logo" class="mt-1" style="height: 24px; width: auto;" />');

        if (newContent !== content) {
            fs.writeFileSync(filepath, newContent, 'utf8');
            console.log(`Updated: ${filepath}`);
        }
    } catch (e) {
        // Skip binary or unreadable files
    }
}

function walk(dir) {
    let list = fs.readdirSync(dir);
    for (let file of list) {
        let filepath = path.join(dir, file);
        let stat = fs.statSync(filepath);
        if (stat && stat.isDirectory()) {
            if (!ignoreDirs.has(file)) {
                walk(filepath);
            }
        } else {
            if (/\.(ts|tsx|vue|js|html|css|json|env|yml|md)$/i.test(file)) {
                processFile(filepath);
            }
        }
    }
}

walk(rootDir);

const sourceImg = 'C:\\Users\\Tx098\\.gemini\\antigravity\\brain\\180e57bf-1dee-4655-ac79-ff279f56e953\\owl_head_logo_1781641669628.png';
const destImg = path.join(rootDir, 'frontend_nocturne', 'public', 'logo.png');

if (fs.existsSync(sourceImg)) {
    fs.copyFileSync(sourceImg, destImg);
    console.log(`Copied logo to ${destImg}`);
} else {
    console.log(`Source image not found: ${sourceImg}`);
}
