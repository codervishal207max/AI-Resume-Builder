# AI Resume & Portfolio Builder
### IBM Edunet Foundation Internship · Vishal · SISTec-R Bhopal 2026

## 🚀 Setup

### Backend
```bash
cd backend
py -3.13 -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
# Create .env file and add: GEMINI_API_KEY=your_key_here
python -m uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 📁 Structure
```
ai-resume-builder/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── .env          ← Create this yourself (not in GitHub)
│   └── routes/
│       ├── __init__.py
│       └── resume.py
└── frontend/
    ├── package.json
    ├── public/
    └── src/
        ├── App.jsx
        ├── index.css
        ├── components/Navbar.jsx
        ├── pages/Home.jsx, Builder.jsx, Preview.jsx
        └── services/api.js
```

## ✨ Features
- AI Resume Generation (Gemini 1.5 Flash)
- 5 Resume Templates
- Cover Letter Generator
- PDF Download

*GitHub: codervishal207max*
