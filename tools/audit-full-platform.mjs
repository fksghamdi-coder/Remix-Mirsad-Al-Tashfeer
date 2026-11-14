import fs from 'fs';
import path from 'path';

const SRC_DIR = './src';

function scanCodeBase(dir) {
    let files = fs.readdirSync(dir);
    files.forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            scanCodeBase(fullPath);
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                console.log(`[AUDIT] Analyzing: ${fullPath}`);
                const content = fs.readFileSync(fullPath, 'utf8');
                // فحص الكفاءة والثغرات
                if (content.includes('localStorage') && !content.includes('SyncEngine')) {
                    console.warn(`[WARNING] Unsynced local storage found in ${file}`);
                }
                if (content.includes('eval(')) {
                    console.error(`[CRITICAL] Security Risk: eval() found in ${file}`);
                }
            }
        }
    });
}

console.log("--- Mirsad Platform Full Engineering Audit Starting ---");
scanCodeBase(SRC_DIR);
console.log("--- Audit Complete ---");
