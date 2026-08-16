# ⚡ Arthur Moses | Neumorphic Full-Stack Portfolio & Nodemailer API

A mobile-first single-page portfolio website for **Arthur Moses (Backend Developer & Computer Science Engineer at UMaT)**, styled after a clean **Neumorphic (Soft UI)** design system and powered by a Node.js / Express backend with Nodemailer contact form integration.

---

## 🌟 Features & Highlights

- 🎨 **Neumorphic Soft UI Aesthetics**: Handcrafted dual box-shadow extruded cards, inset input fields, Royal Purple accents (`#6C5CE7`), and Warm Amber CTA highlights (`#FFB703`).
- 📱 **Mobile-First & Fully Responsive**: Seamless UI drawer navigation, fluid typography, and touch-optimized components across all screen sizes (from 320px ultra-small devices to 4K desktop screens).
- 🚀 **Projects Showcase**: Highlights 3 production-grade backend projects with live GitHub links & custom visuals:
  1. [Tech for Resilient Communities](https://github.com/Moses-Arthu/Tech-for-Resilient-Communities1) *(Best Innovation Project Award Winner - Build with Gemma 4 @ TTU)*
  2. [Deepfake Guardian 2026](https://github.com/Moses-Arthu/Deepfake-Guardian-2026) *(AI Media Forensics Engine)*
  3. [Pulse-Check API](https://github.com/Moses-Arthu/Pulse-Check-API) *(Watchdog Sentinel & Dead Man's Switch API)*
- 🏆 **Honors & Certifications**: Showcases competition wins (1st Place Build with AI Competition, Best Innovation Project at TTU, 2nd Place SentryLink at UMaT) and integrated viewer for official Web Development Certificate (ID: `COD6WD0492`).
- ✉️ **Interactive Contact Form & Nodemailer API**: Express route (`POST /api/contact`) with string sanitization, email validation, and HTML email dispatching. Includes console fallback logging for local development.

---

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js, Nodemailer, CORS, Dotenv
- **Frontend**: HTML5, Vanilla CSS3 (Custom Neumorphic Tokens), JavaScript (ES6+)
- **Documents & Assets**: Embedded PDF Viewer & Downloader for Certificate & CV

---

## 📁 Repository Structure

```
Portfolio web/
├── .env.example            # Environment configuration template
├── .gitignore              # Ignores .env, node_modules, and logs
├── package.json            # Node.js dependencies & scripts
├── server.js               # Express server & /api/contact Nodemailer endpoint
├── README.md               # Documentation
└── public/
    ├── index.html          # Semantic HTML5 single-page application
    ├── css/
    │   └── style.css       # Complete Neumorphic CSS design system
    ├── js/
    │   └── main.js         # Navigation drawer, smooth scroll, AJAX form handler
    ├── docs/               # Official Certificate & CV PDF files
    │   ├── Arthur_Moses_Certificate.pdf
    │   └── Moses_Arthur_CV.pdf
    └── images/             # Profile photos & project visuals
        ├── arthur_avatar.png
        ├── project_resilient.png
        ├── project_deepfake.png
        └── project_pulse_check.png
```

---

## ⚙️ Quick Start & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### 1. Clone & Install
```bash
git clone https://github.com/Moses-Arthu/arthur-moses-portfolio.git
cd arthur-moses-portfolio
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your SMTP credentials:
```bash
cp .env.example .env
```
Example `.env`:
```env
PORT=3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
RECIPIENT_EMAIL=mosesarthur799@gmail.com
```

### 3. Run the Development Server
```bash
npm start
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📬 Contact Form API Endpoint

```http
POST /api/contact
Content-Type: application/json

{
  "name": "Recruiter Name",
  "email": "recruiter@company.com",
  "subject": "Backend Engineer Inquiry",
  "message": "Hello Moses, we loved your portfolio!"
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Message sent successfully! I will get back to you soon."
}
```

---

## 👨‍💻 Author

**Moses Arthur**
- Computer Science and Engineering @ University of Mines and Technology (UMaT)
- Email: [mosesarthur799@gmail.com](mailto:mosesarthur799@gmail.com)
- LinkedIn: [linkedin.com/in/moses-arthur-78a009285](https://www.linkedin.com/in/moses-arthur-78a009285)
- GitHub: [github.com/Moses-Arthu](https://github.com/Moses-Arthu)
