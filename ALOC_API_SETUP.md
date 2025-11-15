# ALOC API Integration Guide

## Overview

The CBT Practice Platform now integrates with the ALOC API to fetch real UTME questions. This guide explains how to set up and use the integration.

## What is ALOC API?

ALOC (African Learning and Opportunity Center) provides a comprehensive database of UTME past questions through their API at https://questions.aloc.com.ng

## Features

### Available Subjects (15 Total)

**Science Subjects:**
- Mathematics
- Physics
- Chemistry
- Biology

**Arts Subjects:**
- English
- Literature
- CRK (Christian Religious Knowledge)
- History

**Social Science Subjects:**
- Economics
- Commerce
- Accounting
- Government
- Geography
- Civics
- Insurance

## Setup Instructions

### Step 1: Get ALOC API Access Token

1. Visit https://questions.aloc.com.ng
2. Register for an account
3. Navigate to API section
4. Generate your access token
5. Copy the token

### Step 2: Configure Backend

1. Open `backend/.env` file
2. Add your ALOC access token:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
ALOC_API_URL=https://questions.aloc.com.ng/api/v2
ALOC_ACCESS_TOKEN=your_actual_token_here
```

Replace `your_actual_token_here` with your real ALOC API token.

### Step 3: Install Dependencies

Make sure axios is installed in the backend:

```bash
cd backend
npm install axios
```

### Step 4: Start the Application

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

## How It Works

### Question Fetching Flow

1. **User selects subject** in Practice Mode
2. **Frontend sends request** to backend API
3. **Backend calls ALOC API** with subject and limit
4. **ALOC returns questions** in JSON format
5. **Backend processes** and formats questions
6. **Frontend displays** questions in exam interface

### API Endpoints

#### Get Questions
```
GET /api/questions?subject=Mathematics&limit=20
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "subject": "Mathematics",
      "question": "Simplify: 3(2x - 5) - 2(3x + 4)",
      "options": ["-23", "-7", "23", "7"],
      "correctAnswer": "-23",
      "explanation": "Solution steps...",
      "year": 2023,
      "examType": "UTME"
    }
  ],
  "count": 20
}
```

#### Get Available Subjects
```
GET /api/questions/subjects
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "name": "Mathematics",
      "code": "mathematics",
      "category": "Science"
    }
  ]
}
```

## Fallback System

If ALOC API is unavailable or returns no questions, the system automatically uses fallback questions stored locally. This ensures the app always works even without internet or API access.

### Fallback Questions Include:
- Sample questions for each subject
- Basic difficulty level
- Covers core topics

## Testing Without ALOC Token

You can test the application without an ALOC token:

1. Leave `ALOC_ACCESS_TOKEN` empty in `.env`
2. The system will use fallback questions
3. All features will work normally
4. Questions will be limited to samples

## Question Format

### ALOC API Response Format
```javascript
{
  id: "unique_id",
  question: "Question text",
  option_a: "Option A",
  option_b: "Option B",
  option_c: "Option C",
  option_d: "Option D",
  answer: "A",
  solution: "Explanation",
  examtype: "UTME",
  year: 2023
}
```

### Our Format (After Processing)
```javascript
{
  id: 1,
  subject: "Mathematics",
  question: "Question text",
  options: ["Option A", "Option B", "Option C", "Option D"],
  correctAnswer: "Option A",
  explanation: "Explanation",
  year: 2023,
  examType: "UTME"
}
```

## Subject Mapping

The system maps user-friendly subject names to ALOC API codes:

| Display Name | ALOC Code |
|-------------|-----------|
| Mathematics | mathematics |
| English | english |
| Physics | physics |
| Chemistry | chemistry |
| Biology | biology |
| Economics | economics |
| Commerce | commerce |
| Accounting | accounting |
| Government | government |
| CRK | crk |
| Geography | geography |
| Literature | literature |
| History | history |
| Civics | civics |
| Insurance | insurance |

## Customization

### Change Question Limit

In `frontend/src/pages/Practice.jsx`:
```javascript
const [questionCount, setQuestionCount] = useState(20);
```

Change the slider range:
```javascript
<input
  type="range"
  min="10"
  max="100"  // Change this
  step="10"
  value={questionCount}
/>
```

### Add More Subjects

In `backend/src/services/alocService.js`:
```javascript
const subjectMapping = {
  'Mathematics': 'mathematics',
  'YourNewSubject': 'aloc_code',
  // Add more subjects
};
```

### Modify Timer Duration

In `frontend/src/components/Exam/ExamInterface.jsx`:
```javascript
const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
// Change to: 3600 for 60 minutes
```

## Troubleshooting

### Problem: "Failed to load questions"

**Solutions:**
1. Check ALOC_ACCESS_TOKEN in backend/.env
2. Verify internet connection
3. Check ALOC API status
4. Review backend console for errors
5. System will use fallback questions automatically

### Problem: "No questions available"

**Solutions:**
1. Subject might not have questions in ALOC
2. Check subject name spelling
3. Try different subject
4. Fallback questions will be used

### Problem: Questions not loading

**Solutions:**
1. Check backend is running (port 5000)
2. Check frontend API URL in .env
3. Open browser console (F12) for errors
4. Verify axios is installed in backend

### Problem: Wrong answer format

**Solutions:**
1. ALOC API might have changed format
2. Check alocService.js mapping
3. Update question processing logic
4. Report issue to ALOC support

## API Rate Limits

ALOC API may have rate limits:
- Check your plan limits
- Implement caching if needed
- Use fallback for exceeded limits

## Best Practices

1. **Cache Questions**: Store fetched questions temporarily
2. **Error Handling**: Always have fallback questions
3. **Loading States**: Show loading indicators
4. **Validation**: Validate API responses
5. **Logging**: Log API errors for debugging

## Security Notes

1. **Never expose** ALOC_ACCESS_TOKEN in frontend
2. **Keep token** in backend .env only
3. **Don't commit** .env to git
4. **Rotate tokens** periodically
5. **Use HTTPS** in production

## Production Deployment

### Environment Variables

Set these in your hosting platform:
```
ALOC_API_URL=https://questions.aloc.com.ng/api/v2
ALOC_ACCESS_TOKEN=your_production_token
```

### Recommended Hosting

- **Backend**: Railway, Heroku, Render
- **Frontend**: Vercel, Netlify
- **Database**: MongoDB Atlas (if needed)

## Support

### ALOC API Support
- Website: https://questions.aloc.com.ng
- Documentation: Check their API docs
- Contact: support@aloc.com.ng

### App Support
- Check COMPLETE_GUIDE.md
- Review error logs
- Test with fallback questions first

## Future Enhancements

Planned features:
1. Question caching system
2. Offline mode with stored questions
3. Question difficulty filtering
4. Topic-based filtering
5. Year-based filtering
6. Bookmark favorite questions
7. Report incorrect questions
8. Custom question sets

## Summary

The ALOC API integration provides:
- ✅ 15 UTME subjects
- ✅ Real past questions
- ✅ Automatic fallback system
- ✅ Easy configuration
- ✅ Flexible question limits
- ✅ Professional question format

Get your ALOC token and start practicing with real UTME questions!
