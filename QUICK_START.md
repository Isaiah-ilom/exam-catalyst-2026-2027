# Quick Start Guide - Exam Catalyst 2026

## Local Development

### 1. Install Dependencies
```bash
npm run install-all
```

### 2. Configure Environment

#### Backend (.env in backend folder):
```env
MONGODB_URI=mongodb://localhost:27017/exam_catalyst_2026
JWT_SECRET=your_secure_jwt_secret_here
NODE_ENV=development
PORT=5000
```

#### Frontend (.env in frontend folder):
```env
PORT=3000
REACT_APP_API_URL=/api
```

### 3. Start Development

#### Option A: Run Both Servers Separately
```bash
npm run dev:backend
npm run dev:frontend
```

#### Option B: Production Mode (Recommended for Replit)
```bash
npm run build
npm start
```

## Deployment

### Quick Deploy
```bash
./build.sh
npm start
```

### Platform-Specific

#### Heroku
```bash
git push heroku main
```

#### Render
- Push to GitHub
- Connect repository on Render
- Auto-deploys from `render.yaml`

#### Railway
- Push to GitHub
- Connect repository on Railway
- Auto-deploys from `railway.json`

#### Vercel/Netlify (Frontend Only)
```bash
cd frontend && npm run build
```

See `DEPLOYMENT.md` for detailed platform instructions.

## Features

- UTME CBT Practice Platform
- 4 Core Subjects (Math, English, Physics, Chemistry)
- Real-time Progress Tracking
- Advanced Analytics Dashboard
- Dark/Light Theme Support
- Mobile Responsive Design
- Exam Simulation Mode
- Built-in Calculator

## Tech Stack

- **Frontend**: React 18, Tailwind CSS, Chart.js
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT
- **Deployment**: Multi-platform support

## Common Commands

```bash
npm run build           # Build frontend
npm start              # Start production server
npm run dev:backend    # Start backend in dev mode
npm run dev:frontend   # Start frontend in dev mode
npm run install-all    # Install all dependencies
```

## Environment Variables

### Required:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT tokens

### Optional:
- `ALOC_API_KEY` - Question database API key
- `EMAIL_SERVICE_KEY` - Email service credentials

## Health Check

```bash
curl http://localhost:5000/health
```

## Support

For issues or questions, check:
- `README.md` - Full documentation
- `DEPLOYMENT.md` - Deployment guides
- `docs/` - API and feature documentation
