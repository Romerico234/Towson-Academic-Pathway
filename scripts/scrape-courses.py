import requests
import io
from pdfminer.high_level import extract_text

url = "https://catalog.towson.edu/pdf/Undergraduate%2024-25.pdf"
res = requests.get(url)

if res.status_code == 200:
    pdf_file = io.BytesIO(res.content)
    
    text = extract_text(pdf_file)
    
    print(text)
else:
    print(f"Failed to fetch the PDF. Status code: {res.status_code}")
