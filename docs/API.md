# Exam Catalyst 2026 API Documentation

Base URL: `http://localhost:5000/api` (development) or `https://api.examcatalyst2026.com/api` (production)

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Response Format

All API responses follow this structure:
```json
{
  "success": true,
  "message": "Success message",
  "data": {},
  "errors": []
}
```

## Rate Limits

- **Development**: 1000 requests per 15 minutes
- **Production**: 100 requests per 15 minutes

## Authentication Endpoints

### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123!",
  "phone": "+2348012345678",
  "dateOfBirth": "2000-01-01"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "isEmailVerified": false
  }
}
```

### POST /auth/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123!",
  "rememberMe": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com"
  }
}
```

### POST /auth/logout
Logout user and invalidate token.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### GET /auth/me
Get current user information.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "stats": {
      "totalExams": 15,
      "averageScore": 82.5
    }
  }
}
```

### POST /auth/forgot-password
Request password reset email.

**Request Body:**
```json
{
  "email": "john.doe@example.com"
}
```

### POST /auth/reset-password
Reset password using token from email.

**Request Body:**
```json
{
  "token": "reset_token_from_email",
  "newPassword": "NewSecurePass123!"
}
```

## User Endpoints

### PUT /users/profile
Update user profile information.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "UTME candidate preparing for 2026",
  "school": "University of Lagos",
  "location": "Lagos, Nigeria"
}
```

### POST /users/avatar
Upload user avatar image.

**Headers:** 
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Request Body:** FormData with 'avatar' file field

### GET /users/stats
Get user statistics and analytics.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalExams": 24,
    "totalQuestions": 960,
    "correctAnswers": 792,
    "averageScore": 82.5,
    "bestScore": 95,
    "studyStreak": 7,
    "totalStudyTime": 480
  }
}
```

## Question Endpoints

### GET /questions
Get questions with filtering options.

**Query Parameters:**
- `subject` - Filter by subject name
- `topic` - Filter by topic
- `difficulty` - easy, medium, hard, mixed
- `count` - Number of questions (default: 20)
- `year` - Filter by exam year
- `page` - Page number for pagination
- `limit` - Items per page

**Response:**
```json
{
  "success": true,
  "questions": [
    {
      "id": "question_id",
      "questionText": "What is the square root of 144?",
      "subject": "Mathematics",
      "topic": "Surds and Indices",
      "difficulty": "easy",
      "options": [
        {"label": "A", "text": "10"},
        {"label": "B", "text": "12"},
        {"label": "C", "text": "14"},
        {"label": "D", "text": "16"}
      ],
      "correctAnswer": "B",
      "explanation": "√144 = 12 because 12² = 144"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

### GET /questions/subjects
Get list of available subjects.

**Response:**
```json
{
  "success": true,
  "subjects": [
    {
      "name": "Mathematics",
      "questionCount": 1250,
      "topics": ["Algebra", "Geometry", "Calculus"]
    },
    {
      "name": "English Language",
      "questionCount": 980,
      "topics": ["Grammar", "Comprehension", "Literature"]
    }
  ]
}
```

### GET /questions/topics/:subject
Get topics for a specific subject.

**Response:**
```json
{
  "success": true,
  "topics": [
    {
      "name": "Algebra",
      "questionCount": 145,
      "difficulty": "Medium"
    },
    {
      "name": "Geometry", 
      "questionCount": 132,
      "difficulty": "Hard"
    }
  ]
}
```

## Exam Endpoints

### POST /exams/create
Create a new exam session.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Mathematics Practice Test",
  "type": "practice",
  "subjects": ["Mathematics"],
  "questionsPerSubject": 40,
  "duration": 60,
  "difficulty": "mixed",
  "mode": "timed"
}
```

**Response:**
```json
{
  "success": true,
  "exam": {
    "id": "exam_id",
    "title": "Mathematics Practice Test",
    "questions": ["question_id_1", "question_id_2"],
    "startTime": "2024-01-15T10:00:00Z",
    "duration": 60
  }
}
```

### POST /exams/submit
Submit completed exam.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "examId": "exam_id",
  "answers": {
    "question_id_1": "A",
    "question_id_2": "B"
  },
  "timeSpent": 45,
  "flaggedQuestions": ["question_id_3"],
  "startTime": "2024-01-15T10:00:00Z",
  "endTime": "2024-01-15T10:45:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "id": "result_id",
    "score": {
      "overall": {
        "correct": 32,
        "total": 40,
        "percentage": 80
      },
      "bySubject": [
        {
          "subject": "Mathematics",
          "correct": 32,
          "total": 40,
          "percentage": 80
        }
      ]
    },
    "grade": {
      "letter": "B",
      "description": "Very Good"
    },
    "timeSpent": 45,
    "rank": 15
  }
}
```

## Results Endpoints

### GET /results
Get user's exam results.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page` - Page number
- `limit` - Results per page
- `subject` - Filter by subject
- `type` - Filter by exam type

**Response:**
```json
{
  "success": true,
  "results": [
    {
      "id": "result_id",
      "examTitle": "Mathematics Practice",
      "score": {
        "overall": {"percentage": 85}
      },
      "timeSpent": 45,
      "date": "2024-01-15T10:00:00Z",
      "grade": {"letter": "A", "description": "Excellent"}
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

### GET /results/:id
Get detailed result information.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "result": {
    "id": "result_id",
    "examTitle": "Mathematics Practice",
    "score": {
      "overall": {"correct": 34, "total": 40, "percentage": 85},
      "bySubject": [
        {
          "subject": "Mathematics",
          "correct": 34,
          "total": 40,
          "percentage": 85
        }
      ]
    },
    "answers": [
      {
        "questionId": "q1",
        "selectedAnswer": "A",
        "correctAnswer": "A",
        "isCorrect": true
      }
    ],
    "feedback": {
      "strengths": ["Strong performance in algebra"],
      "weaknesses": ["Need improvement in geometry"],
      "recommendations": ["Practice more geometry problems"]
    }
  }
}
```

## Analytics Endpoints

### GET /analytics/user
Get comprehensive user analytics.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "analytics": {
    "totalExams": 24,
    "averageScore": 82.5,
    "bestScore": 95,
    "subjectPerformance": [
      {
        "subject": "Mathematics",
        "averageScore": 78,
        "totalExams": 8,
        "improvement": "+5%"
      }
    ],
    "performanceHistory": [
      {"date": "2024-01-10", "score": 75},
      {"date": "2024-01-11", "score": 78}
    ],
    "timeAnalysis": {
      "averageTimePerQuestion": 90,
      "fastestExam": 35,
      "slowestExam": 65
    }
  }
}
```

### GET /analytics/leaderboard
Get leaderboard rankings.

**Query Parameters:**
- `type` - overall, subject-specific
- `timeframe` - weekly, monthly, all-time
- `limit` - Number of results

**Response:**
```json
{
  "success": true,
  "leaderboard": [
    {
      "rank": 1,
      "userId": "user_id",
      "name": "John Doe",
      "avatar": "avatar_url",
      "score": 95,
      "totalExams": 30
    }
  ]
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid request data |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 422 | Validation Error - Data validation failed |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

## Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

## Webhooks

### Exam Completion
Triggered when a user completes an exam.

**Endpoint:** Your configured webhook URL
**Method:** POST
**Payload:**
```json
{
  "event": "exam.completed",
  "data": {
    "userId": "user_id",
    "examId": "exam_id",
    "score": 85,
    "timeSpent": 45,
    "timestamp": "2024-01-15T10:45:00Z"
  }
}
```

## SDK Examples

### JavaScript/Node.js
```javascript
const ExamCatalystAPI = require('exam-catalyst-sdk');

const api = new ExamCatalystAPI({
  baseURL: 'https://api.examcatalyst2026.com/api',
  apiKey: 'your_api_key'
});

// Get questions
const questions = await api.questions.get({
  subject: 'Mathematics',
  difficulty: 'medium',
  count: 20
});

// Submit exam
const result = await api.exams.submit({
  examId: 'exam_123',
  answers: { 'q1': 'A', 'q2': 'B' }
});
```

### Python
```python
from exam_catalyst import ExamCatalystAPI

api = ExamCatalystAPI(
    base_url='https://api.examcatalyst2026.com/api',
    api_key='your_api_key'
)

# Get user analytics
analytics = api.analytics.get_user_analytics()
print(f"Average Score: {analytics['averageScore']}%")
```

## Testing

### Authentication Test
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Protected Endpoint Test
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Best Practices

### API Usage
1. **Rate Limiting** - Implement exponential backoff for rate-limited requests
2. **Error Handling** - Always check the `success` field in responses
3. **Token Refresh** - Handle 401 errors by refreshing tokens
4. **Caching** - Cache frequently accessed data like subjects and topics
5. **Pagination** - Use pagination for large result sets

### Security
1. **HTTPS Only** - Always use HTTPS in production
2. **Token Storage** - Store JWT tokens securely (not in localStorage)
3. **Input Validation** - Validate all input data on client side
4. **CORS** - Configure CORS properly for your domain
5. **Rate Limiting** - Implement client-side rate limiting

### Performance
1. **Batch Requests** - Combine multiple operations when possible
2. **Compression** - Enable gzip compression
3. **CDN** - Use CDN for static assets
4. **Database Indexing** - Ensure proper database indexes
5. **Monitoring** - Monitor API performance and errors

## API Versioning

Current version: `v1`

Versioning strategy:
- **Major versions** (v1, v2) - Breaking changes
- **Minor versions** (v1.1, v1.2) - New features, backward compatible
- **Patch versions** (v1.1.1) - Bug fixes

## Changelog

### v1.0.0 (2024-01-15)
- Initial API release
- Authentication endpoints
- Question management
- Exam functionality
- Results and analytics

### v1.1.0 (2024-02-01)
- Added leaderboard endpoints
- Enhanced analytics
- Webhook support
- Performance improvements

### v1.1.1 (2024-02-15)
- Bug fixes in authentication
- Improved error messages
- Database optimization

## Support

For API support:
- **Email:** api-support@examcatalyst2026.com
- **Documentation:** https://docs.examcatalyst2026.com
- **Status Page:** https://status.examcatalyst2026.com
- **Community:** https://community.examcatalyst2026.com

## Terms of Service

By using this API, you agree to our [Terms of Service](https://examcatalyst2026.com/terms) and [Privacy Policy](https://examcatalyst2026.com/privacy).

## Rate Limit Headers

All API responses include rate limit information:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642678800
```