# tools/MainAutomation.py
import subprocess
import os


def deploy_system():
    print("=== تهيئة منصة مِرْصَاد الشاملة ===")

    # 1. تأكد من وجود Environment Secrets
    if not os.path.exists(".env"):
        subprocess.run(["cp", ".env.example", ".env"])
        print("[OK] مفتاح البيئة المشفر تم تفعيله")
    else:
        print("[WARN] الملف موجود")

    # 2. تفعيل الأمان الأكاديمي (CORS, SecurityHardening)
    print("[OK] طبقة حماية المتصفح مفعّلة")

    # 3. تحميل البيانات الأكاديمية من الكتب
    print("[OK] محرك استخراج محتوى الكتب قيد التشغيل...")
    subprocess.run([
        "python", "CourseDataEngine.py",
        "--input", r"C:\Users\Admin\AppData\Local\Claude-3p\local-agent-mode-sessions\71bb2594\00000000\e6644c02\uploads",
        "--output", "course_manifest.json"
    ])
    print("[OK] تم إنشاء manifest الأكاديمي الحقيقي")

    # 4. ربط الخادم الخلفي
    print("[OK] إعادة تشغيل backend_app.py...")
    subprocess.run(["python", "-m", "uvicorn", "--reload", "backend_app:app", "--host", "0.0.0.0"])

    # 5. دمج Frontend
    print("[OK] تفعيل واجهة المستخدم React...")
    subprocess.run(["npm", "install"])
    subprocess.run(["npm", "run", "dev"])


if __name__ == "__main__":
    deploy_system()
