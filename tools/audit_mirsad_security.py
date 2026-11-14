import os
import re

class MirsadSecurityAuditor:
    def __init__(self, root_dir):
        self.root_dir = root_dir
        self.report = {
            "completed": [],
            "incomplete_or_broken": [],
            "security_risks": [],
            "fake_or_mock_logic": [],
            "structural_issues": []
        }

    def audit_file(self, file_path):
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            rel_path = os.path.relpath(file_path, self.root_dir)

            # 1. البحث عن الأكواد المقطوعة أو المعلقة (Incomplete/Broken)
            if "TODO" in content or "FIXME" in content:
                self.report["incomplete_or_broken"].append(f"{rel_path}: يحتوي على علامات TODO/FIXME")

            # 2. البحث عن المنطق الوهمي (Fake/Mock logic)
            if "mock" in content.lower() or "Math.random()" in content or "setTimeout" in content:
                if "Lab" in rel_path or "Service" in rel_path:
                    self.report["fake_or_mock_logic"].append(f"{rel_path}: يعتمد على محاكاة زمنية أو بيانات عشوائية بدلاً من الربط الحقيقي")

            # 3. التحقق من الحماية الأمنية (Security Checks)
            if "securityHardening" not in content and rel_path.endswith('Layout.tsx'):
                self.report["security_risks"].append(f"{rel_path}: لا يستدعي طبقة الحماية الصارمة للمتصفح (securityHardening)")
            
            if "localStorage" in content and "SyncEngine" not in content:
                self.report["security_risks"].append(f"{rel_path}: يستخدم التخزين المحلي دون المرور بمحرك التزامن المؤمن (SyncEngine)")

            # 4. التحقق من سلامة البناء (Structural integrity)
            if ": any" in content and ".tsx" in rel_path:
                self.report["structural_issues"].append(f"{rel_path}: استخدام Type ': any' يضعف دقة الكود (Type Safety)")

    def run_audit(self):
        for root, dirs, files in os.walk(self.root_dir):
            if any(x in root for x in ['node_modules', '.git', 'dist']): continue
            for file in files:
                if file.endswith(('.ts', '.tsx', '.py', '.mjs')):
                    self.audit_file(os.path.join(root, file))

    def generate_report(self):
        print("\n" + "="*50)
        print("🚩 تقرير الفحص الهندسي الصارم لمنصة مِرْصَاد")
        print("="*50)

        for category, items in self.report.items():
            print(f"\n[{category.upper().replace('_', ' ')}]:")
            if not items:
                print(" - لا يوجد ملاحظات.")
            for item in items:
                print(f" ⚠️ {item}")

if __name__ == "__main__":
    auditor = MirsadSecurityAuditor('./src')
    auditor.run_audit()
    auditor.generate_report()
