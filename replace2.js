const fs = require('fs');
const path = require('path');

const filesToUpdate = [
    {
        path: 'C:\\Users\\Tx098\\Desktop\\presentacionTx\\sis257_NocturneTx\\frontend_nocturne\\src\\views\\LoginView.vue',
        replacements: [
            ['<i class="bi bi-shield-fill" style="font-size: 2.5rem; color: var(--accent);"></i>', '<img src="/logo.png" alt="Logo" style="height: 3rem; width: auto;" />']
        ]
    },
    {
        path: 'C:\\Users\\Tx098\\Desktop\\presentacionTx\\sis257_NocturneTx\\frontend_nocturne\\src\\views\\RegisterView.vue',
        replacements: [
            ['<i class="bi bi-shield-fill text-accent" style="font-size: 2.5rem;"></i>', '<img src="/logo.png" alt="Logo" style="height: 3rem; width: auto;" />']
        ]
    },
    {
        path: 'C:\\Users\\Tx098\\Desktop\\presentacionTx\\sis257_NocturneTx\\frontend_nocturne\\src\\components\\AdminLayout.vue',
        replacements: [
            ['<a href="/" class="text-decoration-none d-flex align-items-center gap-2 mb-4 px-2">', '<div class="d-flex align-items-center justify-content-center gap-2 mb-1">'],
            ['</a>', '</div>']
        ]
    },
    {
        path: 'C:\\Users\\Tx098\\Desktop\\presentacionTx\\sis257_NocturneTx\\frontend_nocturne\\src\\components\\VendedorLayout.vue',
        replacements: [
            ['<i class="bi bi-shield-fill text-gold" style="font-size: 1.4rem;"></i>', '<img src="/logo.png" alt="Logo" style="height: 1.4rem; width: auto;" />']
        ]
    }
];

filesToUpdate.forEach(f => {
    try {
        let content = fs.readFileSync(f.path, 'utf8');
        let newContent = content;
        f.replacements.forEach(r => {
            newContent = newContent.split(r[0]).join(r[1]);
        });
        if (newContent !== content) {
            fs.writeFileSync(f.path, newContent, 'utf8');
            console.log('Updated:', f.path);
        }
    } catch (e) {
        console.log('Error processing', f.path, e.message);
    }
});
