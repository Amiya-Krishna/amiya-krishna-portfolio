# Amiya Krishna — Developer Portfolio

Personal portfolio website of **Amiya Krishna**, a B.Tech CSE student and full-stack developer, built to showcase full-stack engineering projects for Software Engineering internship opportunities.

🔗 **Live site:** _add your deployed portfolio URL here once hosted (e.g. Vercel/Netlify/GitHub Pages)_
📄 **Resume:** [`resume/Amiya_Krishna_Resume.pdf`](resume/Amiya_Krishna_Resume.pdf)

---

## 👋 About

I'm a B.Tech (CSE, 3rd year) student focused on full-stack web development — building scalable applications with clean database design, secure authentication, and REST APIs. This site is a single, fast-loading landing page that gives recruiters everything they need in a few seconds: who I am, what I've built, and how to reach me.

---

## ✨ Features

- **Project case studies, not just links** — each project card shows a live screenshot, a one-line Problem → Solution pitch, and tech tags at a glance. Clicking a card opens a full case study modal with the problem statement, solution, key features, tech stack, and screenshot/architecture proof.
- **Live vs. in-progress status badges** — clearly marks which projects are deployed and clickable right now, and which have a GitHub repo with the live demo still being deployed.
- **Dark / light theme toggle** with a persistent, fully themed design system (no hardcoded colors breaking on toggle).
- **Scroll-based reveal animations**, animated typing hero tag, and a terminal-style "whoami" panel.
- **One-click resume download** and **email copy-to-clipboard**.
- Fully responsive — works down to mobile widths.

---

## 🛠 Built With

Plain, dependency-free front end — no framework, no build step:

- **HTML5 / CSS3** — custom design system using CSS variables for theming
- **Vanilla JavaScript** — scroll reveal (IntersectionObserver), typing effect, project modal logic, theme toggle
- **Google Fonts** — Space Grotesk, Orbitron, JetBrains Mono

---

## 📁 Project Structure

```
My Portfolio/
├── index.html                 # All page sections (hero, about, projects, skills, contact)
├── style.css                  # Design system + component styles
├── script.js                  # Project data, modal logic, animations
├── assets/projects/           # Screenshots & diagrams used in project cards/modals
├── resume/
│   └── Amiya_Krishna_Resume.pdf
└── README.md
```

---

## 🚀 Running Locally

No build tools required — it's static HTML/CSS/JS.

```bash
git clone https://github.com/Amiya-Krishna/<this-repo>.git
cd "My Portfolio"

# open directly
open index.html         # macOS
start index.html         # Windows

# or serve it (recommended, avoids any local file restrictions)
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## 💼 Featured Projects

| Project | Description | Stack | Links |
|---|---|---|---|
| **College Discovery Platform** | Search, filter, compare and get an AI-assisted, rank-based college recommendation. Live in production. | Next.js · TypeScript · Prisma · PostgreSQL · JWT | [Live](https://college-discovery-1vud.vercel.app/) · [Code](https://github.com/Amiya-Krishna/college-discovery) |
| **Community Discussion Forum + Real-Time Chat** | Threaded discussions with real-time chat, notifications, and JWT auth via Socket.IO. | React · Node.js · Express · MongoDB · Socket.IO | [Code](https://github.com/Amiya-Krishna/Community-Discussion-Forum-with-Real-Time-Chat) |
| **Job Application Tracker Portal** | Centralized dashboard to track job applications through hiring stages. | React · Node.js · Express · MongoDB · JWT | [Code](https://github.com/Amiya-Krishna/Job-Application-Tracker-Portal) |

Full case studies (problem, solution, features, screenshots) are available on the [live site](#) under the Projects section.

---

## 📬 Contact

- **Email:** [amiyakrishna04@gmail.com](mailto:amiyakrishna04@gmail.com)
- **GitHub:** [github.com/Amiya-Krishna](https://github.com/Amiya-Krishna)
- **LinkedIn:** [linkedin.com/in/amiya-krishna](https://www.linkedin.com/in/amiya-krishna)
- **Location:** Lucknow, Uttar Pradesh, India — open to Remote / Hybrid / On-site internships

---

⭐ If you're a recruiter or hiring manager and this portfolio was useful, feel free to reach out — I'm actively looking for Software Engineering internship opportunities.
