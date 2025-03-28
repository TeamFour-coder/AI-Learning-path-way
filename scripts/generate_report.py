#Purpose: Generates a PDF report of the student's performance.
#command: python scripts/generate_report.py

from fpdf import FPDF

# Import report from analyze_responses.py
from analyze_responses import report

def generate_pdf_report(report):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    # Title
    pdf.cell(200, 10, txt="Student Performance Report", ln=True, align='C')
    pdf.ln(10)

    # Total Marks
    pdf.cell(200, 10, txt=f"Total Marks: {report['Total Marks']} / 60", ln=True)

    # Category Performance
    pdf.ln(10)
    pdf.cell(200, 10, txt="Category Performance:", ln=True)
    for category, performance in report["Category Performance"].items():
        pdf.cell(200, 10, txt=f" - {category}: {performance:.2f}%", ln=True)

    # Difficulty Performance
    pdf.ln(10)
    pdf.cell(200, 10, txt="Difficulty Level Performance:", ln=True)
    for difficulty, performance in report["Difficulty Performance"].items():
        pdf.cell(200, 10, txt=f" - Difficulty {difficulty}: {performance:.2f}%", ln=True)

    # Save PDF
    pdf.output("student_performance_report.pdf")
    print("PDF Report has been generated successfully!")

# Generate PDF Report
generate_pdf_report(report)
