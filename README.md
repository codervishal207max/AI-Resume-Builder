<div align="center">

# 📄 AI Resume & Portfolio Builder

**Generate professional, ATS-friendly resumes and cover letters in minutes, powered by Google Gemini.**

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.13-3776AB?logo=python&logoColor=white)
![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?logo=google&logoColor=white)

*Built as part of the **IBM Edunet Foundation Internship 2026***

</div>

---

## 📑 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [How It Works](#-how-it-works)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [Troubleshooting](#-troubleshooting)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

## 📌 About the Project

Writing a good resume is time-consuming, and most students and fresh graduates struggle to phrase their experience professionally. **AI Resume & Portfolio Builder** solves this by combining a clean React interface with a FastAPI backend that uses **Google Gemini** to turn raw user details into polished resume content and tailored cover letters.

Users enter their information once, pick a template, preview the result live, and download it as a PDF.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Resume Generation** | Gemini converts your raw details into well-written, professional resume content. |
| 🎨 **5 Resume Templates** | Choose from five designs and switch between them on the preview page. |
| ✉️ **Cover Letter Generator** | Generate a tailored cover letter from your profile. |
| 📥 **PDF Download** | Export the final resume as a PDF, ready to share or upload. |
| 👀 **Live Preview** | Review the resume in the selected template before downloading. |

---

## 🛠 Tech Stack

**Frontend**
- React (JavaScript, JSX)
- CSS
- Axios / Fetch-based API service layer (`services/api.js`)

**Backend**
- Python 3.13
- FastAPI
- Uvicorn (ASGI server)
- python-dotenv for environment configuration

**AI**
- Google Gemini API

---

## 🔄 How It Works

```
┌────────────┐   1. Fill details    ┌──────────────┐   2. API call    ┌──────────────┐
│   Home /   │ ───────────────────▶ │   React UI   │ ───────────────▶ │   FastAPI    │
│  Builder   │                      │ (api.js)     │                  │   Backend    │
└────────────┘                      └──────────────┘                  └──────┬───────┘
                                           ▲                                 │ 3. Prompt
                                           │ 5. Render + PDF                 ▼
                                    ┌──────┴───────┐   4. Generated   ┌──────────────┐
                                    │   Preview    │ ◀─────────────── │ Google Gemini│
                                    │ (Templates)  │      content     │     API      │
                                    └──────────────┘                  └──────────────┘
```

1. The user fills in personal details, education, skills, projects and experience on the **Builder** page.
2. The frontend sends the data to the FastAPI backend through `services/api.js`.
3. The backend builds a prompt and calls the **Gemini API**.
4. Gemini returns improved, structured resume content (or a cover letter).
5. The **Preview** page renders it in the chosen template, and the user downloads it as a PDF.

---

## 📁 Project Structure

```
AI-Resume-Builder/
├── backend/
│   ├── main.py               # FastAPI app entry point
│   ├── requirements.txt      # Python dependencies
│   ├── .env                  # API keys (create yourself, not tracked by Git)
│   └── routes/
│       ├── __init__.py
│       └── resume.py         # Resume & cover letter endpoints
│
├── frontend/
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── App.jsx           # Root component & routing
│       ├── index.css         # Global styles
│       ├── components/
│       │   └── Navbar.jsx
│       ├── pages/
│       │   ├── Home.jsx      # Landing page
│       │   ├── Builder.jsx   # Resume input form
│       │   └── Preview.jsx   # Template preview & PDF export
│       └── services/
│           └── api.js        # Backend API calls
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Python** 3.13 (3.10+ should also work)
- **Node.js** 18+ and **npm**
- A **Google Gemini API key** (free tier available) → [Get one here](https://aistudio.google.com/apikey)

### 1. Clone the repository

```bash
git clone https://github.com/codervishal207max/AI-Resume-Builder.git
cd AI-Resume-Builder
```

### 2. Backend setup

```bash
cd backend

# Create and activate a virtual environment
py -3.13 -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # macOS / Linux

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file inside the `backend/` folder (see [Environment Variables](#-environment-variables)), then start the server:

```bash
python -m uvicorn main:app --reload
```

The API runs at **http://127.0.0.1:8000**. Interactive API docs are available at **http://127.0.0.1:8000/docs**.

### 3. Frontend setup

Open a **new terminal**:

```bash
cd frontend
npm install
npm start
```

The app opens in your browser (usually at **http://localhost:3000**).

> 💡 Keep both the backend and frontend running at the same time.

---

## 🔐 Environment Variables

Create a file named `.env` inside the `backend/` directory:

```env
GEMINI_API_KEY=your_key_here
```

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | ✅ | API key from [Google AI Studio](https://aistudio.google.com/apikey) |

> ⚠️ **Never commit your `.env` file.** It is already excluded through `.gitignore`. Do not paste your API key in code, issues or screenshots.

---

## 💻 Usage

1. Open the app and click **Get Started** on the home page.
2. Fill in your details on the **Builder** page.
3. Let the AI generate and enhance your resume content.
4. Open the **Preview** page and pick one of the 5 templates.
5. Generate a **cover letter** if needed.
6. Click **Download PDF**.

---

## 🧰 Troubleshooting

| Problem | Fix |
|---|---|
| `GEMINI_API_KEY` not found / auth error | Check that `.env` is inside `backend/`, has no quotes or extra spaces, and restart Uvicorn. |
| `404 model not found` from Gemini | The model name in `routes/resume.py` may be outdated. Update it to a currently supported Gemini model from the [Gemini docs](https://ai.google.dev/gemini-api/docs/models). |
| `venv\Scripts\activate` is blocked on Windows | Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` in PowerShell, then retry. |
| Frontend cannot reach backend (CORS / network error) | Make sure the backend is running on port 8000 and the API base URL in `services/api.js` matches. |
| Port already in use | Stop the other process, or run Uvicorn with `--port 8001` and update `api.js`. |

---

## 🔮 Future Improvements

- [ ] User authentication and saved resumes
- [ ] ATS score and keyword-gap analysis against a job description
- [ ] More templates and custom colour themes
- [ ] Import existing resume (PDF / DOCX) for AI enhancement
- [ ] Portfolio website generation from resume data
- [ ] Deployment (Render / Vercel) with a live demo link

---

## 👤 Author

**Vishal Fulbandhe**
B.Tech CSE (AI & ML), SISTec-R, Bhopal

[![GitHub](https://img.shields.io/badge/GitHub-codervishal207max-181717?logo=github)](https://github.com/codervishal207max)

---

<div align="center">

⭐ If you found this project useful, consider giving it a star!

</div>
