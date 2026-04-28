import pdfplumber

pdf_path = r'C:\\Users\\kev\\OneDrive - Université Laval\\cours interactif\\agilite_xp_source.pdf'
out_path = r'C:\\Users\\kev\\OneDrive - Université Laval\\cours interactif\\graphify-out\\pdf_text.txt'

with pdfplumber.open(pdf_path) as pdf:
    total = len(pdf.pages)
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(f'Total pages: {total}\n')
        for i, page in enumerate(pdf.pages):
            text = page.extract_text()
            f.write(f'--- Page {i+1} ---\n')
            f.write((text if text else '(empty)') + '\n\n')

print('Done - wrote to:', out_path)