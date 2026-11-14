# tools/system_validator.py
import os
import sys
import subprocess

class MirsadValidator:
    def __init__(self):
        self.root = os.getcwd()
        self.required_files = [
            'backend_app.py',
            'course_manifest.json',
            'src/App.tsx',
            'src/lib/apiClient.ts',
            'src/lib/securityHardening.ts',
            'src/lib/adaptiveEngine.ts',
            'src/lib/CertificateGenerator.ts'
        ]
        self.results = []

    def check_files(self):
        print("🔍 [1/4] التحقق من وجود الملفات الجوهرية...")
        for file in self.required_files:
            status = "✅ موجود" if os.path.exists(os.path.join(self.root, file)) else "❌ مفقود"
            self.results.append(f"File {file}: {status}")

    def check_syntax(self):
        print("⚙️ [2/4] فحص السلامة النحوية (Backend)...")
        try:
            # محاولة تجميع كود البايثون للتأكد من خلوه من أخطاء Syntax
            py_exec = sys.executable or "python3"
            subprocess.run([py_exec, "-m", "py_compile", "backend_app.py"], check=True)
            self.results.append("Backend Syntax: ✅ سليم")
        except Exception:
            self.results.append("Backend Syntax: ❌ خطأ برمي!")

    def check_dependencies(self):
        print("📦 [3/4] فحص الاعتماديات (Dependencies)...")
        # فحص وجود node_modules و venv
        has_node = os.path.exists('node_modules')
        self.results.append(f"Node Modules: {'✅ مكتمل' if has_node else '⚠️ يحتاج npm install'}")

    def run_full_scan(self):
        self.check_files()
        self.check_syntax()
        self.check_dependencies()
        
        print("\n" + "="*40)
        print("🚩 تقرير جاهزية نظام مِرْصَاد")
        print("="*40)
        for res in self.results:
            print(res)
        
        is_ready = all("❌" not in r for r in self.results)
        if is_ready:
            print("\n✅ النظام متكامل وجاهز لبناء مستودع الكود (Git Hook Ready).")
        else:
            print("\n❌ تنبيه: هناك نواقص يجب معالجتها قبل البدء.")

if __name__ == "__main__":
    validator = MirsadValidator()
    validator.run_full_scan()
