import os
import shutil

# Paths
root_dir = r"C:\Users\Tx098\Desktop\presentacionTx\sis257_NocturneTx"

replacements = {
    "NOCTURNE: COLD STORAGE": "NOCTURNE: COLD STORAGE",
    "Nocturne: Cold Storage": "Nocturne: Cold Storage",
    "nocturnecoldstorage": "nocturnecoldstorage",
    "NOCTURNE_COLD_STORAGE": "NOCTURNE_COLD_STORAGE",
    "nocturne_cold_storage": "nocturne_cold_storage"
}

ignore_dirs = {"node_modules", "dist", ".git", "build"}

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return # Skip binary files or unreadable files

    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated: {filepath}")

for root, dirs, files in os.walk(root_dir):
    dirs[:] = [d for d in dirs if d not in ignore_dirs]
    for file in files:
        if file.endswith((".ts", ".tsx", ".vue", ".js", ".html", ".css", ".json", ".env", ".yml", ".md")):
            process_file(os.path.join(root, file))

# Copy image
source_img = r"C:\Users\Tx098\.gemini\antigravity\brain\180e57bf-1dee-4655-ac79-ff279f56e953\owl_head_logo_1781641669628.png"
dest_img = os.path.join(root_dir, "frontend_nocturne", "public", "logo.png")

if os.path.exists(source_img):
    shutil.copy2(source_img, dest_img)
    print(f"Copied logo to {dest_img}")
else:
    print(f"Source image not found: {source_img}")

