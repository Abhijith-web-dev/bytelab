import pypdf
import sys

# Set standard output encoding to utf-8
sys.stdout.reconfigure(encoding='utf-8')

reader = pypdf.PdfReader('agent/PYTHON PROGRAMMING NOTES.pdf')
print(f"Total Pages: {len(reader.pages)}")

# Print pages 2 to 10 to inspect syllabus / index
for page_num in range(1, min(12, len(reader.pages))):
    print(f"\n--- PAGE {page_num + 1} ---")
    page_text = reader.pages[page_num].extract_text()
    for line in page_text.split('\n'):
        if line.strip():
            print(line)
