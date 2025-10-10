# Exam Catalyst 2026 - CBT UTME Platform

## Project Overview

Exam Catalyst 2026 is a comprehensive Computer-Based Testing (CBT) platform designed specifically for UTME preparation in Nigeria. It provides a superior learning experience with modern technologies and an intuitive interface.

**Last Updated:** October 10, 2025

## Project Architecture

### Tech Stack

**Frontend:**
- React 18 with hooks-based architecture
- Tailwind CSS for styling
- Chart.js for analytics visualizations  
- React Router for navigation
- Context API for state management
- Framer Motion for animations

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT authentication
- bcryptjs for password hashing
- Express rate limiting for security

### Project Structure

```
exam-catalyst-2026/
├── frontend/                 # React application (Port 5000)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── context/        # React Context providers
│   │   ├── services/       # API service layers
│   │   ├── utils/          # Utility functions
│   │   └── styles/         # Global styles
│   └── public/             # Static assets
└── backend/                # Node.js API server (Port 3001)
    └── src/
        ├── controllers/    # Request handlers
        ├── models/         # Database models
        ├── routes/         # API route definitions
        ├── middleware/     # Custom middleware
        ├── services/       # Business logic
        └── utils/          # Server utilities
```

## Current State

### What's Working
- ✅ Frontend React application running on port 5000
- ✅ Backend Express API server running on port 3001
- ✅ Both services configured for Replit environment
- ✅ CORS configured to allow cross-origin requests
- ✅ Basic route structure and controllers implemented
- ✅ Authentication system structure in place
- ✅ Responsive UI with Tailwind CSS

### Database Status
⚠️ **MongoDB Connection**: The MongoDB Atlas connection requires valid credentials. Current connection string has authentication issues. To fix:
1. Update `backend/.env` with valid MongoDB URI
2. Ensure password is URL-encoded if it contains special characters
3. Verify network access is configured in MongoDB Atlas

### Known Issues & TODO
- [ ] Fix MongoDB authentication (update connection credentials)
- [ ] Complete API integration for question fetching (ALOC API)
- [ ] Set up email service (SendGrid or SMTP)
- [ ] Add real question data to database
- [ ] Implement complete exam flow end-to-end
- [ ] Add proper error boundaries in React components
- [ ] Complete all analytics features

## Development Setup

### Environment Variables

**Backend (`backend/.env`):**
```env
NODE_ENV=development
PORT=3001
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5000
```

**Frontend (`frontend/.env`):**
```env
PORT=5000
HOST=0.0.0.0
DANGEROUSLY_DISABLE_HOST_CHECK=true
WDS_SOCKET_PORT=0
REACT_APP_API_URL=http://localhost:3001/api
```

### Running the Application

The application runs automatically via Replit workflows:
- **Backend API**: Runs on `http://localhost:3001`
- **Frontend**: Runs on `http://localhost:5000` and is accessible via Replit's webview

To manually restart:
1. Backend: `cd backend && npm start`
2. Frontend: `cd frontend && npm start`

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

#### Exams
- `GET /api/exams` - Get all exams
- `GET /api/exams/:id` - Get exam by ID
- `POST /api/exams` - Create new exam
- `POST /api/exams/:id/start` - Start an exam
- `POST /api/exams/:id/submit` - Submit exam

#### Questions
- `GET /api/questions` - Get questions
- `GET /api/questions/subject/:subject` - Get questions by subject
- `GET /api/questions/topic/:topic` - Get questions by topic

#### Results
- `GET /api/results` - Get user results
- `GET /api/results/:id` - Get specific result
- `GET /api/results/analytics` - Get analytics data

## Features

### Core Functionality
- Complete UTME simulation with 4 subjects
- Advanced practice modes (subject-wise, topic-based, timed)
- Real-time analytics and performance tracking
- Intelligent timer with auto-submit
- Built-in scientific calculator
- Question banking integration

### User Experience
- Responsive design (desktop, tablet, mobile)
- Dark/Light theme support
- Professional UI with smooth animations
- Accessibility features
- Progressive Web App capabilities

### Security Features
- JWT-based authentication
- Secure password hashing (bcryptjs)
- Rate limiting for API protection
- CORS configuration
- Session management

## Deployment

### Production Configuration

The app is configured for autoscale deployment:
- **Build**: Builds the React frontend
- **Run**: Serves the API backend
- Frontend static files are served from backend in production

### Required Environment Variables for Production
- `MONGODB_URI` - Production MongoDB connection string
- `JWT_SECRET` - Strong secret key for JWT tokens
- `NODE_ENV=production`
- Any external API keys (ALOC, email service, etc.)

## User Preferences

### Development Workflow
- Keep backend and frontend in separate directories
- Backend uses localhost:3001 for security
- Frontend uses 0.0.0.0:5000 for Replit compatibility
- Development mode allows all CORS origins for easier testing

### Code Conventions
- Use existing patterns for new features
- Follow React hooks patterns
- Use async/await for asynchronous operations
- Implement proper error handling
- Write clear, descriptive variable names

## Support & Troubleshooting

### Common Issues

**1. MongoDB Connection Failed**
- Verify MongoDB URI in `.env` file
- Check if password contains special characters (URL encode them)
- Ensure IP whitelist includes your Repl IP (or use 0.0.0.0/0 for development)

**2. Frontend Not Loading**
- Check if port 5000 is accessible
- Verify `HOST=0.0.0.0` in frontend `.env`
- Check browser console for errors
- Ensure React dev server is running

**3. API Calls Failing**
- Verify backend is running on port 3001
- Check `REACT_APP_API_URL` in frontend `.env`
- Inspect network tab in browser dev tools
- Check CORS configuration in backend

**4. Rate Limiting Errors**
- Trust proxy is configured in Express app
- Rate limits are relaxed in development mode
- Check X-Forwarded-For headers

### Health Check

Backend health endpoint: `http://localhost:3001/health`

Returns:
```json
{
  "status": "OK",
  "timestamp": "2025-10-10T...",
  "uptime": 123.45,
  "environment": "development",
  "mongodb": "connected|disconnected"
}
```

## Recent Changes

**October 10, 2025:**
- ✅ Configured project for Replit environment
- ✅ Set up backend on port 3001 (localhost)
- ✅ Set up frontend on port 5000 (0.0.0.0)
- ✅ Created missing route, controller, and middleware files
- ✅ Fixed frontend compilation errors (duplicate imports, missing files)
- ✅ Added Tailwind CSS plugins (@tailwindcss/forms, @tailwindcss/typography)
- ✅ Configured deployment settings for production
- ✅ Set up trust proxy for rate limiter
- ⚠️ MongoDB connection pending valid credentials

## Next Steps

1. **Database Setup**: Update MongoDB credentials and verify connection
2. **API Integration**: Connect to ALOC API for question data
3. **Testing**: Test all features end-to-end
4. **Data Seeding**: Add sample questions and exams
5. **Email Setup**: Configure SendGrid or SMTP for notifications
6. **Production Deploy**: Test deployment configuration
