from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional
import google.generativeai as genai
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.enums import TA_CENTER, TA_LEFT
import os
import io
from dotenv import load_dotenv

load_dotenv()
router = APIRouter()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

class ResumeForm(BaseModel):
    fullName: str
    email: Optional[str] = ""
    phone: Optional[str] = ""
    location: Optional[str] = ""
    linkedin: Optional[str] = ""
    github: Optional[str] = ""
    targetRole: Optional[str] = ""
    yearsExp: Optional[str] = ""
    degree: Optional[str] = ""
    college: Optional[str] = ""
    graduationYear: Optional[str] = ""
    cgpa: Optional[str] = ""
    skills: Optional[str] = ""
    project1Title: Optional[str] = ""
    project1Desc: Optional[str] = ""
    project2Title: Optional[str] = ""
    project2Desc: Optional[str] = ""
    certifications: Optional[str] = ""
    achievements: Optional[str] = ""
    jobDescription: Optional[str] = ""

@router.post("/generate-resume")
async def generate_resume(form: ResumeForm):
    summary_prompt = f"""Write a professional resume summary (3-4 sentences) for:
Name: {form.fullName}
Target Role: {form.targetRole}
Experience: {form.yearsExp or 'Fresher'}
Skills: {form.skills}
Education: {form.degree} from {form.college}
Achievements: {form.achievements}
Make it ATS-friendly and impactful. Only return the summary text."""

    summary_response = model.generate_content(summary_prompt)
    ai_summary = summary_response.text.strip()

    projects = []
    if form.project1Title:
        p1 = model.generate_content(f"Improve this project description for a resume (2-3 lines, action verbs):\nProject: {form.project1Title}\nDesc: {form.project1Desc}\nOnly return improved description.")
        projects.append({"title": form.project1Title, "desc": p1.text.strip()})

    if form.project2Title:
        p2 = model.generate_content(f"Improve this project description for a resume (2-3 lines, action verbs):\nProject: {form.project2Title}\nDesc: {form.project2Desc}\nOnly return improved description.")
        projects.append({"title": form.project2Title, "desc": p2.text.strip()})

    cover_letter = None
    if form.jobDescription:
        cover = model.generate_content(f"Write a professional cover letter (3 paragraphs) for:\nApplicant: {form.fullName}\nRole: {form.targetRole}\nSkills: {form.skills}\nEducation: {form.degree} from {form.college}\nJob Description: {form.jobDescription}\nOnly return the cover letter.")
        cover_letter = cover.text.strip()

    resume = {
        "name": form.fullName,
        "email": form.email,
        "phone": form.phone,
        "location": form.location,
        "linkedin": form.linkedin,
        "github": form.github,
        "summary": ai_summary,
        "education": {"degree": form.degree, "college": form.college, "year": form.graduationYear, "cgpa": form.cgpa},
        "skills": form.skills,
        "projects": projects,
        "certifications": form.certifications,
        "achievements": form.achievements,
    }
    return {"resume": resume, "coverLetter": cover_letter}

@router.post("/download-pdf")
async def download_pdf(data: dict):
    resume = data.get("resume", {})
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4,
                            rightMargin=0.75*inch, leftMargin=0.75*inch,
                            topMargin=0.75*inch, bottomMargin=0.75*inch)
    styles = getSampleStyleSheet()
    story = []

    name_style = ParagraphStyle('Name', fontSize=22, fontName='Helvetica-Bold', alignment=TA_CENTER, spaceAfter=4)
    story.append(Paragraph(resume.get("name", ""), name_style))

    contact_parts = [x for x in [resume.get("email"), resume.get("phone"), resume.get("location"), resume.get("linkedin"), resume.get("github")] if x]
    if contact_parts:
        contact_style = ParagraphStyle('Contact', fontSize=9, alignment=TA_CENTER, textColor=colors.grey, spaceAfter=8)
        story.append(Paragraph(" | ".join(contact_parts), contact_style))

    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#6c63ff")))
    story.append(Spacer(1, 8))

    sec = ParagraphStyle('Sec', fontSize=10, fontName='Helvetica-Bold', textColor=colors.HexColor("#6c63ff"), spaceBefore=10, spaceAfter=4)
    body = ParagraphStyle('Body', fontSize=9.5, spaceAfter=4, leading=14)
    bold = ParagraphStyle('Bold', fontSize=9.5, fontName='Helvetica-Bold', spaceAfter=2)

    if resume.get("summary"):
        story.append(Paragraph("PROFESSIONAL SUMMARY", sec))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.lightgrey))
        story.append(Spacer(1, 4))
        story.append(Paragraph(resume["summary"], body))

    edu = resume.get("education", {})
    if edu.get("degree"):
        story.append(Paragraph("EDUCATION", sec))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.lightgrey))
        story.append(Spacer(1, 4))
        story.append(Paragraph(edu["degree"], bold))
        edu_line = edu.get("college", "")
        if edu.get("cgpa"): edu_line += f" | CGPA: {edu['cgpa']}"
        if edu.get("year"): edu_line += f" | {edu['year']}"
        story.append(Paragraph(edu_line, body))

    if resume.get("skills"):
        story.append(Paragraph("TECHNICAL SKILLS", sec))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.lightgrey))
        story.append(Spacer(1, 4))
        story.append(Paragraph(resume["skills"], body))

    if resume.get("projects"):
        story.append(Paragraph("PROJECTS", sec))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.lightgrey))
        story.append(Spacer(1, 4))
        for proj in resume["projects"]:
            story.append(Paragraph(f"• {proj['title']}", bold))
            story.append(Paragraph(proj["desc"], body))

    if resume.get("certifications"):
        story.append(Paragraph("CERTIFICATIONS", sec))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.lightgrey))
        story.append(Spacer(1, 4))
        story.append(Paragraph(resume["certifications"], body))

    if resume.get("achievements"):
        story.append(Paragraph("ACHIEVEMENTS", sec))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.lightgrey))
        story.append(Spacer(1, 4))
        story.append(Paragraph(resume["achievements"], body))

    doc.build(story)
    buffer.seek(0)
    return StreamingResponse(buffer, media_type="application/pdf",
                             headers={"Content-Disposition": "attachment; filename=resume.pdf"})
