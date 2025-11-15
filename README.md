<div align="center">

# 🎓 CBT Practice Platform

### *Your Ultimate UTME Exam Preparation Companion*

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Screenshots](#-screenshots) • [Support](#-support)

---

### 🌟 Practice with Real UTME Questions • 15 Subjects • Timed Tests • Track Progress

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Subjects Available](#-subjects-available)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [API Integration](#-api-integration)
- [Configuration](#-configuration)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🎯 Overview

**CBT Practice Platform** is a modern, clean, and efficient Computer-Based Testing application designed specifically for Nigerian students preparing for the Unified Tertiary Matriculation Examination (UTME). 

Built with cutting-edge technologies and integrated with the **ALOC API**, this platform provides access to thousands of authentic UTME past questions across all major subjects.

### ✨ Why Choose CBT Practice?

- 🎯 **Authentic Questions** - Real UTME past questions from ALOC database
- 📚 **15 Subjects** - Complete coverage across Science, Arts, and Social Science
- ⏱️ **Realistic Simulation** - Timed tests that mirror actual exam conditions
- 📊 **Performance Tracking** - Detailed analytics to monitor your progress
- 🎨 **Clean Interface** - Distraction-free design focused on learning
- 🔄 **Automatic Fallback** - Works even without internet connection
- 📱 **Responsive Design** - Practice on desktop, tablet, or mobile

---

## 🚀 Features

<table>
<tr>
<td width="50%">

### 🎓 For Students

- ✅ **Practice Mode** - Study at your own pace
- ✅ **Mock Exams** - Full UTME simulation with timer
- ✅ **Question Navigation** - Jump to any question easily
- ✅ **Flag Questions** - Mark questions for review
- ✅ **Instant Results** - See your score immediately
- ✅ **Progress Tracking** - Monitor improvement over time

</td>
<td width="50%">

### 🛠️ Technical Features

- ✅ **ALOC API Integration** - Real UTME questions
- ✅ **User Authentication** - Secure login/registration
- ✅ **Automatic Fallback** - Local questions when offline
- ✅ **Responsive Design** - Works on all devices
- ✅ **Fast Performance** - Optimized for speed
- ✅ **Clean Code** - Well-structured and maintainable

</td>
</tr>
</table>

---

## 📚 Subjects Available

<div align="center">

### 🔬 Science (4 Subjects)

| Subject | Icon | Status |
|---------|------|--------|
| Mathematics | 🔢 | ✅ Available |
| Physics | ⚛️ | ✅ Available |
| Chemistry | 🧪 | ✅ Available |
| Biology | 🧬 | ✅ Available |

### 📖 Arts (4 Subjects)

| Subject | Icon | Status |
|---------|------|--------|
| English Language | 📝 | ✅ Available |
| Literature in English | 📚 | ✅ Available |
| Christian Religious Knowledge | ✝️ | ✅ Available |
| History | 📜 | ✅ Available |

### 🌍 Social Science (7 Subjects)

| Subject | Icon | Status |
|---------|------|--------|
| Economics | 💰 | ✅ Available |
| Commerce | 🏪 | ✅ Available |
| Accounting | 📊 | ✅ Available |
| Government | 🏛️ | ✅ Available |
| Geography | 🗺️ | ✅ Available |
| Civics Education | 🎓 | ✅ Available |
| Insurance | 🛡️ | ✅ Available |

**Total: 15 UTME Subjects** 🎉

</div>

---

## ⚡ Quick Start

### Prerequisites

Before you begin, ensure you have **Node.js** installed on your system.

```bash
# Check if Node.js is installed
node --version

# Should show v18.x.x or higher
```

> 💡 **Don't have Node.js?** Download it from [nodejs.org](https://nodejs.org/) (Click the green "LTS" button)

### 🚀 Installation in 3 Steps

#### **Step 1: Clone the Repository**

```bash
git clone https://github.com/yourusername/cbt-practice.git
cd cbt-practice
```

#### **Step 2: Install Dependencies**

**Option A: Using Batch File (Windows - Easiest)**
```bash
# Just double-click this file:
install-dependencies.bat
```

**Option B: Using Command Line**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

#### **Step 3: Start the Application**

**Option A: Using Batch Files (Windows - Easiest)**
```bash
# Double-click these files in order:
1. start-backend.bat
2. start-frontend.bat
```

**Option B: Using Command Line**

Open **two terminal windows**:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 🎉 You're Ready!

Open your browser to **http://localhost:3000** and start practicing!

---

## 📦 Installation

### Detailed Installation Guide

<details>
<summary><b>🪟 Windows Installation</b></summary>

1. **Install Node.js**
   - Visit [nodejs.org](https://nodejs.org/)
   - Download the LTS version (green button)
   - Run the installer
   - Restart your computer

2. **Install Dependencies**
   ```bash
   cd backend
   npm install
   
   cd ../frontend
   npm install
   ```

3. **Configure Environment**
   - Copy `backend/.env.example` to `backend/.env`
   - Copy `frontend/.env.example` to `frontend/.env`
   - Add your ALOC API token (optional)

4. **Start the Application**
   - Run `start-backend.bat`
   - Run `start-frontend.bat`
   - Browser opens automatically

📖 **Need more help?** See [WINDOWS_SETUP_GUIDE.md](WINDOWS_SETUP_GUIDE.md)

</details>

<details>
<summary><b>🍎 macOS Installation</b></summary>

1. **Install Node.js**
   ```bash
   # Using Homebrew
   brew install node
   
   # Or download from nodejs.org
   ```

2. **Install Dependencies**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Configure Environment**
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

4. **Start the Application**
   ```bash
   # Terminal 1
   cd backend && npm start
   
   # Terminal 2
   cd frontend && npm start
   ```

</details>

<details>
<summary><b>🐧 Linux Installation</b></summary>

1. **Install Node.js**
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Or use your package manager
   ```

2. **Install Dependencies**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Configure Environment**
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

4. **Start the Application**
   ```bash
   # Terminal 1
   cd backend && npm start
   
   # Terminal 2
   cd frontend && npm start
   ```

</details>

---

## 💻 Usage

### 1️⃣ Register an Account

<div align="center">

```
📧 Email → 🔐 Password → ✅ Create Account
```

</div>

### 2️⃣ Select Practice Mode

<div align="center">

```
📚 Choose Subject → 🔢 Select Questions (10-50) → ▶️ Start Practice
```

</div>

### 3️⃣ Take the Test

<div align="center">

```
📝 Answer Questions → ⏱️ Watch Timer → 🚩 Flag for Review → ✅ Submit
```

</div>

### 4️⃣ View Results

<div align="center">

```
📊 See Score → 📈 Track Progress → 🔄 Practice Again
```

</div>

---

## 📸 Screenshots

<div align="center">

### 🏠 Home Page
*Clean, modern landing page with clear call-to-action*

```
┌─────────────────────────────────────────────────────────┐
│  🎓 CBT Practice                                        │
│                                                         │
│         UTME CBT Practice                               │
│    Practice for your UTME exams with our               │
│    simple and effective CBT platform                    │
│                                                         │
│         [▶️ Start Practice]                             │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ 📚 Practice│  │ ⏱️ Timed │  │ 📊 Track │            │
│  │ Questions │  │  Tests   │  │ Progress │            │
│  └──────────┘  └──────────┘  └──────────┘            │
└─────────────────────────────────────────────────────────┘
```

### 📊 Dashboard
*Quick access to all features and statistics*

```
┌─────────────────────────────────────────────────────────┐
│  Welcome back, Student! 👋                              │
│  Ready to continue your UTME preparation?               │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ ▶️ Start │  │ 📝 Mock  │  │ 📊 View  │            │
│  │ Practice │  │  Exam    │  │ Results  │            │
│  └──────────┘  └──────────┘  └──────────┘            │
│                                                         │
│  📈 Statistics:                                         │
│  • 15 Subjects Available                               │
│  • 0 Tests Taken                                       │
│  • 0% Average Score                                    │
└─────────────────────────────────────────────────────────┘
```

### 📝 Exam Interface
*Clean, distraction-free testing environment*

```
┌─────────────────────────────────────────────────────────┐
│  ⏱️ 29:45    Question 1/20    Answered: 5/20          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  What is 2 + 2?                                    🚩   │
│                                                         │
│  ○ A. 2                                                │
│  ● B. 4  ← Selected                                    │
│  ○ C. 6                                                │
│  ○ D. 8                                                │
│                                                         │
│  [← Previous]              [Next →]                    │
│                                                         │
│  Question Navigator:                                    │
│  [1][2][3][4][5][6][7][8][9][10]...                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 🎯 Results Page
*Detailed performance breakdown*

```
┌─────────────────────────────────────────────────────────┐
│                  Exam Results                           │
│                                                         │
│                    ✅ 85%                               │
│              You scored 17 out of 20                    │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │    17    │  │    3     │  │    20    │            │
│  │ Correct  │  │  Wrong   │  │  Total   │            │
│  └──────────┘  └──────────┘  └──────────┘            │
│                                                         │
│  [🔄 Practice Again]  [🏠 Dashboard]                   │
└─────────────────────────────────────────────────────────┘
```

</div>

---

## 🛠️ Technology Stack

<div align="center">

### Frontend

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-6.8-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Axios](https://img.shields.io/badge/Axios-1.6-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)

### Backend

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3.x-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![JWT](https://img.shields.io/badge/JWT-9.0-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)

### Tools & Services

[![ALOC API](https://img.shields.io/badge/ALOC_API-Integrated-FF6B6B?style=for-the-badge)](https://questions.aloc.com.ng/)
[![Git](https://img.shields.io/badge/Git-Version_Control-F05032?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/)
[![VS Code](https://img.shields.io/badge/VS_Code-Editor-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com/)

</div>

---

## 📁 Project Structure

```
cbt-practice/
│
├── 📂 backend/                 # Node.js/Express API
│   ├── 📂 src/
│   │   ├── 📂 controllers/     # Request handlers
│   │   ├── 📂 models/          # Database models
│   │   ├── 📂 routes/          # API routes
│   │   ├── 📂 services/        # Business logic
│   │   │   └── 📄 alocService.js    # ALOC API integration
│   │   ├── 📂 middleware/      # Custom middleware
│   │   ├── 📂 utils/           # Utility functions
│   │   └── 📄 app.js           # Express app setup
│   ├── 📄 .env                 # Environment variables
│   └── 📄 package.json         # Dependencies
│
├── 📂 frontend/                # React application
│   ├── 📂 src/
│   │   ├── 📂 components/      # Reusable components
│   │   │   ├── 📂 Auth/        # Login, Register
│   │   │   ├── 📂 Exam/        # Exam interface
│   │   │   └── 📂 Layout/      # Layout components
│   │   ├── 📂 pages/           # Main pages
│   │   │   ├── 📄 Home.jsx     # Landing page
│   │   │   ├── 📄 Dashboard.jsx # User dashboard
│   │   │   ├── 📄 Practice.jsx  # Practice setup
│   │   │   └── 📄 Results.jsx   # Results display
│   │   ├── 📂 context/         # React Context
│   │   ├── 📂 services/        # API services
│   │   ├── 📂 styles/          # CSS files
│   │   └── 📄 App.jsx          # Main app component
│   ├── 📄 .env                 # Environment variables
│   └── 📄 package.json         # Dependencies
│
├── 📂 docs/                    # Documentation
│   ├── 📄 COMPLETE_GUIDE.md
│   ├── 📄 ALOC_API_SETUP.md
│   ├── 📄 WINDOWS_SETUP_GUIDE.md
│   └── 📄 QUICK_REFERENCE.md
│
├── 📄 README.md                # This file
├── 📄 LICENSE                  # MIT License
├── 📄 .gitignore              # Git ignore rules
│
└── 🪟 Windows Batch Files
    ├── 📄 install-dependencies.bat
    ├── 📄 start-backend.bat
    └── 📄 start-frontend.bat
```

---

## 🔌 API Integration

### ALOC API

This platform integrates with the **ALOC (African Learning and Opportunity Center)** API to fetch authentic UTME past questions.

#### 🔑 Getting Your API Token

1. Visit [questions.aloc.com.ng](https://questions.aloc.com.ng)
2. Register for an account
3. Navigate to the API section
4. Generate your access token
5. Add it to `backend/.env`:

```env
ALOC_API_URL=https://questions.aloc.com.ng/api/v2
ALOC_ACCESS_TOKEN=your_token_here
```

#### 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/questions` | GET | Fetch questions by subject |
| `/api/questions/subjects` | GET | Get all available subjects |
| `/api/questions/subject/:subject` | GET | Get questions for specific subject |

#### 🔄 Automatic Fallback

Don't have an ALOC token? No problem! The app automatically uses local fallback questions, so you can still practice even without API access.

📖 **Learn more:** [ALOC_API_SETUP.md](ALOC_API_SETUP.md)

---

## ⚙️ Configuration

### Backend Configuration

Create `backend/.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# ALOC API (Optional - uses fallback if not provided)
ALOC_API_URL=https://questions.aloc.com.ng/api/v2
ALOC_ACCESS_TOKEN=your_aloc_token_here
```

### Frontend Configuration

Create `frontend/.env` file:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# App Configuration
REACT_APP_APP_NAME=CBT Practice Platform
```

---

## 📚 Documentation

<div align="center">

| Document | Description | Link |
|----------|-------------|------|
| 🚀 **Quick Start** | Get up and running in 5 minutes | [START_HERE.md](START_HERE.md) |
| 📖 **Complete Guide** | Comprehensive user manual | [COMPLETE_GUIDE.md](COMPLETE_GUIDE.md) |
| 🪟 **Windows Setup** | Detailed Windows installation | [WINDOWS_SETUP_GUIDE.md](WINDOWS_SETUP_GUIDE.md) |
| 🔌 **ALOC API Setup** | API integration guide | [ALOC_API_SETUP.md](ALOC_API_SETUP.md) |
| 📝 **Quick Reference** | Handy reference card | [QUICK_REFERENCE.md](QUICK_REFERENCE.md) |
| 🛠️ **Implementation** | Technical details | [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) |
| 📋 **Documentation Index** | All documentation files | [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) |

</div>

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

- 🐛 **Report Bugs** - Found a bug? [Open an issue](https://github.com/yourusername/cbt-practice/issues)
- 💡 **Suggest Features** - Have an idea? We'd love to hear it!
- 📝 **Improve Documentation** - Help make our docs better
- 🔧 **Submit Pull Requests** - Fix bugs or add features

### Development Setup

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Follow existing code patterns
- Write clean, readable code
- Add comments for complex logic
- Test your changes thoroughly

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 CBT Practice Platform

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 💬 Support

### Need Help?

<div align="center">

| Resource | Link |
|----------|------|
| 📖 **Documentation** | [Read the Docs](DOCUMENTATION_INDEX.md) |
| 🐛 **Bug Reports** | [GitHub Issues](https://github.com/yourusername/cbt-practice/issues) |
| 💡 **Feature Requests** | [GitHub Discussions](https://github.com/yourusername/cbt-practice/discussions) |
| 📧 **Email Support** | support@cbtpractice.com |

</div>

### Frequently Asked Questions

<details>
<summary><b>Q: Do I need an ALOC API token?</b></summary>

No, it's optional! The app works with fallback questions if you don't have a token. However, having a token gives you access to thousands of real UTME questions.

</details>

<details>
<summary><b>Q: Can I use this offline?</b></summary>

Yes! Once you've loaded questions, you can practice offline. The app also has built-in fallback questions that work without internet.

</details>

<details>
<summary><b>Q: Is this free to use?</b></summary>

Yes! This is an open-source project. You can use, modify, and distribute it freely under the MIT License.

</details>

<details>
<summary><b>Q: Which browsers are supported?</b></summary>

The app works best on modern browsers: Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience.

</details>

<details>
<summary><b>Q: Can I add more subjects?</b></summary>

Yes! The platform is designed to be extensible. Check the [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) for technical details on adding subjects.

</details>

---

## 🌟 Acknowledgments

### Built With Love Using

- [React](https://reactjs.org/) - UI Framework
- [Node.js](https://nodejs.org/) - Backend Runtime
- [Express](https://expressjs.com/) - Web Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [ALOC API](https://questions.aloc.com.ng/) - Question Database

### Special Thanks

- 🙏 **ALOC** for providing the comprehensive UTME question database
- 🎓 **Nigerian Students** for feedback and feature requests
- 💻 **Open Source Community** for amazing tools and libraries
- 🌍 **Contributors** who help make this project better

---

## 🎯 Roadmap

### Current Version (v1.0)
- ✅ 15 UTME subjects
- ✅ ALOC API integration
- ✅ Timed practice tests
- ✅ Results tracking
- ✅ User authentication

### Coming Soon (v1.1)
- 🔜 Question explanations
- 🔜 Performance analytics
- 🔜 Study streaks
- 🔜 Leaderboards
- 🔜 Mobile app

### Future Plans (v2.0)
- 📅 Video lessons
- 📅 Study groups
- 📅 AI-powered recommendations
- 📅 Offline mode improvements
- 📅 Multi-language support

---

## 📊 Statistics

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/yourusername/cbt-practice?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/cbt-practice?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/yourusername/cbt-practice?style=social)

![GitHub issues](https://img.shields.io/github/issues/yourusername/cbt-practice)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/cbt-practice)
![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/cbt-practice)

</div>

---

## 🔗 Quick Links

<div align="center">

[![Website](https://img.shields.io/badge/Website-Visit-blue?style=for-the-badge)](http://localhost:3000)
[![Documentation](https://img.shields.io/badge/Docs-Read-green?style=for-the-badge)](DOCUMENTATION_INDEX.md)
[![API](https://img.shields.io/badge/API-ALOC-red?style=for-the-badge)](https://questions.aloc.com.ng)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

---

<div align="center">

## 🎓 Ready to Ace Your UTME?

### [🚀 Get Started Now](START_HERE.md) • [📖 Read the Docs](DOCUMENTATION_INDEX.md) • [💬 Get Support](#-support)

---

### Made with ❤️ for Nigerian Students

**Star ⭐ this repo if you find it helpful!**

---

*Practice makes perfect. Start your UTME preparation journey today!* 🎯

</div>

---

<div align="center">
<sub>Built with React, Node.js, and dedication to education</sub>
</div>
