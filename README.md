# CBT Practice Platform

A simple and clean Computer-Based Testing (CBT) platform for UTME preparation.

## Features

- User authentication (Login/Register)
- **15 UTME subjects** (Science, Arts, Social Science)
- **ALOC API integration** for real UTME questions
- Practice mode with customizable question count
- Timed mock exams (30 minutes)
- Question navigation and flagging
- Results tracking with detailed scores
- Automatic fallback questions
- Clean, minimal interface

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Install backend dependencies:
```bash
cd backend
npm install
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

The backend will run on http://localhost:5000

2. In a new terminal, start the frontend:
```bash
cd frontend
npm start
```

The frontend will run on http://localhost:3000

### Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_here
ALOC_API_URL=https://questions.aloc.com.ng/api/v2
ALOC_ACCESS_TOKEN=your_aloc_token_here
```

**Note:** Get your ALOC API token from https://questions.aloc.com.ng
See `ALOC_API_SETUP.md` for detailed setup instructions.

## Usage

1. Open http://localhost:3000 in your browser
2. Register a new account or login
3. Choose Practice mode to start
4. Select a subject and number of questions
5. Take the test and view your results

## Project Structure

```
├── backend/          # Node.js/Express API
│   ├── src/
│   │   ├── routes/   # API routes
│   │   ├── controllers/
│   │   ├── models/
│   │   └── app.js
│   └── package.json
│
├── frontend/         # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

## Available Subjects (15 Total)

**Science:**
- Mathematics
- Physics
- Chemistry
- Biology

**Arts:**
- English
- Literature
- CRK (Christian Religious Knowledge)
- History

**Social Science:**
- Economics
- Commerce
- Accounting
- Government
- Geography
- Civics
- Insurance

## License

MIT
