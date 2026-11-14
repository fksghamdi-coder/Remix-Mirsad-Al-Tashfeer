# تنفيذ هذا السكربت سيقوم بتجميع المشروع بالكامل في ملف واحد للتفتيش
import os

def collect_project_code(output_file="project_full_dump.txt"):
    target_extensions = ('.tsx', '.ts', '.py', '.sql', '.html', '.css', '.mjs')
    excluded_dirs = {'node_modules', '.git', '.svn', '.hg', '__pycache__', 'venv', 'env', 'dist', 'build', 'test-results', 'playwright-report'}
    
    with open(output_file, 'w', encoding='utf-8') as outfile:
        for root, dirs, files in os.walk('.'):
            # استثناء المجلدات غير الضرورية
            dirs[:] = [d for d in dirs if d not in excluded_dirs and not d.startswith('.')]
            
            for file in sorted(files):
                # Don't dump the dump itself if it matched an extension
                if file == output_file or file == "project_full_dump.txt":
                    continue
                if file.endswith(target_extensions):
                    file_path = os.path.join(root, file)
                    outfile.write(f"\n{'='*20}\nFILE: {file_path}\n{'='*20}\n\n")
                    try:
                        with open(file_path, 'r', encoding='utf-8') as infile:
                            outfile.write(infile.read())
                    except Exception as e:
                        outfile.write(f"--- [Error reading file: {e}] ---\n")
    print(f"تم تجميع كامل المشروع بنجاح في الملف: {output_file}")

if __name__ == "__main__":
    collect_project_code()
