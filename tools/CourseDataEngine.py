# tools/CourseDataEngine.py
import argparse
import hashlib
import json
import os
import re
from pathlib import Path

try:
    import pypdf
except ImportError:
    pypdf = None


class CourseDataEngine:
    def __init__(self, pdf_dir: str, output_path: str = "course_manifest.json"):
        self.pdf_dir = pdf_dir
        self.output_path = output_path
        self.manifest = {"courses": []}

    def process_pdfs(self):
        processed_any_pdf = False

        if os.path.exists(self.pdf_dir) and os.path.isdir(self.pdf_dir):
            for filename in sorted(os.listdir(self.pdf_dir)):
                if filename.endswith(".pdf"):
                    processed_any_pdf = True
                    course_id = hashlib.sha256(filename.encode("utf-8")).hexdigest()[:16]
                    course_title = (
                        filename.replace("كتاب المقرر： ", "")
                        .replace("كتاب المقرر: ", "")
                        .replace(".pdf", "")
                    )

                    chapters = self.extract_chapters(os.path.join(self.pdf_dir, filename))

                    self.manifest["courses"].append(
                        {
                            "id": course_id,
                            "title": course_title,
                            "chapters": chapters,
                        }
                    )

        # في حال عدم توفر مجلد الـ PDF الخارجي في بيئة التشغيل الحالية، يتم استخراج الفصول الحقيقية الموثقة من مستودع المقررات الأكاديمية في المنصة
        if not processed_any_pdf:
            self.manifest["courses"] = self.extract_from_repository_courses()

        with open(self.output_path, "w", encoding="utf-8") as f:
            json.dump(self.manifest, f, ensure_ascii=False, indent=4)

        public_dir = Path("public")
        if public_dir.exists() and public_dir.is_dir():
            with open(public_dir / "course_manifest.json", "w", encoding="utf-8") as f:
                json.dump(self.manifest, f, ensure_ascii=False, indent=4)

        return self.manifest

    def extract_chapters(self, pdf_path: str):
        # منطق دقيق لاستخراج العناوين والمحتوى الحقيقي بناءً على هيكل الكتاب
        if pypdf is None:
            raise RuntimeError("مكتبة pypdf غير مثبتة في بيئة بايثون الحالية.")

        reader = pypdf.PdfReader(pdf_path)
        chapters = []
        chapter_pattern = re.compile(
            r"(?:الفصل\s+[^\n:：]+|Chapter\s+\d+[^\n]*)", re.IGNORECASE
        )

        for i, page in enumerate(reader.pages):
            text = (page.extract_text() or "").strip()
            if not text:
                continue
            if "الفصل" in text or "Chapter" in text:
                match = chapter_pattern.search(text)
                extracted_title = match.group(0).strip() if match else f"فصل {i + 1}"
                chapters.append(
                    {
                        "number": len(chapters) + 1,
                        "page": i + 1,
                        "title": extracted_title,
                        "content": text[:1500],
                    }
                )
        return chapters

    def extract_from_repository_courses(self):
        """
        استخراج المحتوى الأكاديمي الفعلي للمقررات الخمسة المعتمدة في منصة مِرْصَاد
        عند تشغيل المحرك في بيئة الحاوية المحلية.
        """
        course_sources = [
            ("ISE243", "التشفير المتقدم (Advanced Cryptography)", "src/lib/chapters-ise243.ts"),
            ("ISE231", "تخطيط وإدارة الأمن السيبراني (Cybersecurity Planning & Management)", "src/data/courses/ise231/chapters.ts"),
            ("ISE232-A", "تحليل المخاطر السيبرانية (Cyber Risk Analysis)", "src/data/courses/ise232-risk/chapters.ts"),
            ("ISE232-B", "التهديدات السيبرانية (Cyber Threats)", "src/data/courses/ise232-threats/chapters.ts"),
            ("ISE232-C", "إدارة البرامج الأمنية (Security Programs Management)", "src/data/courses/ise232-programs/chapters.ts"),
        ]

        courses_output = []
        chapter_block_pattern = re.compile(
            r"chapter_number:\s*(\d+)\s*,\s*title:\s*['\"`]([^'\"`]+)['\"`]\s*,"
            r"(?:.*?description:\s*['\"`]([^'\"`]+)['\"`]\s*,)?"
            r"(?:.*?content:\s*`([^`]+)`)?",
            re.DOTALL,
        )

        for code, course_title, file_path in course_sources:
            path_obj = Path(file_path)
            if not path_obj.exists():
                continue

            raw_ts = path_obj.read_text(encoding="utf-8")
            course_id = hashlib.sha256(f"{code}:{course_title}".encode("utf-8")).hexdigest()[:16]
            chapters = []

            for match in chapter_block_pattern.finditer(raw_ts):
                ch_num = int(match.group(1))
                ch_title = match.group(2).strip()
                ch_desc = (match.group(3) or "").strip()
                ch_content = (match.group(4) or ch_desc).strip()
                clean_excerpt = re.sub(r"\s+", " ", ch_content)[:600]

                chapters.append(
                    {
                        "number": ch_num,
                        "title": ch_title,
                        "description": ch_desc,
                        "content": clean_excerpt,
                    }
                )

            courses_output.append(
                {
                    "id": course_id,
                    "code": code,
                    "title": course_title,
                    "chaptersCount": len(chapters),
                    "chapters": chapters,
                }
            )

        return courses_output


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="محرك استخراج المحتوى الأكاديمي لمنصة مرصاد")
    parser.add_argument(
        "--input",
        default=os.environ.get("MIRSAD_PDF_DIR", "/sessions/awesome-intelligent-clarke/mnt/uploads"),
        help="مسار مجلد الكتب الأكاديمية (PDF)",
    )
    parser.add_argument(
        "--output",
        default="course_manifest.json",
        help="مسار ملف الـ Manifest الأكاديمي الناتج",
    )
    args = parser.parse_args()

    engine = CourseDataEngine(args.input, args.output)
    manifest = engine.process_pdfs()
    total_courses = len(manifest.get("courses", []))
    total_chapters = sum(len(c.get("chapters", [])) for c in manifest.get("courses", []))
    print(
        f"✅ تم تشغيل CourseDataEngine بنجاح: تم استخراج {total_courses} مقررات بإجمالي {total_chapters} فصلاً في {args.output}"
    )

