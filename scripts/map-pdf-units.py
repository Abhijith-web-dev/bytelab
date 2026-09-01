import pypdf
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

reader = pypdf.PdfReader('agent/PYTHON PROGRAMMING NOTES.pdf')

unit_pages = {}
current_unit = "Intro"

for page_idx, page in enumerate(reader.pages):
    text = page.extract_text()
    unit_match = re.search(r'UNIT\s*–?\s*([I|V|X]+)', text)
    if unit_match:
        current_unit = f"UNIT {unit_match.group(1)}"
        if current_unit not in unit_pages:
            unit_pages[current_unit] = []
    if current_unit not in unit_pages:
        unit_pages[current_unit] = []
    unit_pages[current_unit].append(page_idx + 1)

print("Found Units and Page Ranges:")
for u, pages in unit_pages.items():
    print(f"  {u}: Pages {pages[0]} to {pages[-1]} ({len(pages)} pages)")
