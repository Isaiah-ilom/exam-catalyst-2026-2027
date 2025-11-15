# Quick Start Guide

## Installation

1. Install all dependencies:
```bash
npm run install-all
```

## Running the Application

### Option 1: Run Both Servers Separately

Terminal 1 - Backend:
```bash
cd backend
npm start
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

### Option 2: Use npm scripts from root

Terminal 1:
```bash
npm run dev:backend
```

Terminal 2:
```bash
npm run dev:frontend
```

## Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## First Time Setup

1. Open http://localhost:3000
2. Click "Sign Up" to create an account
3. Fill in your details and register
4. Login with your credentials
5. Start practicing!

## Features

- **Dashboard**: Overview of your progress
- **Practice**: Choose subject and question count
- **Exam**: Take timed mock exams
- **Results**: View your performance
- **Profile**: Manage your account

## Troubleshooting

### Port Already in Use

If port 3000 or 5000 is already in use:

Backend: Change PORT in `backend/.env`
Frontend: It will prompt you to use a different port

### Dependencies Issues

```bash
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

## Default Test Questions

The app includes sample questions for testing. In production, these would be replaced with real UTME questions from a database or API.
