# Quick Reference Card

## 🚀 Start the App

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend  
cd frontend
npm start
```

Open: http://localhost:3000

## 📚 All 15 UTME Subjects

### Science (4)
- Mathematics
- Physics
- Chemistry
- Biology

### Arts (4)
- English
- Literature
- CRK
- History

### Social Science (7)
- Economics
- Commerce
- Accounting
- Government
- Geography
- Civics
- Insurance

## 🔑 ALOC API Setup

1. Get token: https://questions.aloc.com.ng
2. Add to `backend/.env`:
```
ALOC_ACCESS_TOKEN=your_token_here
```
3. Restart backend

## 📁 Key Files

| File | Purpose |
|------|---------|
| `backend/src/services/alocService.js` | ALOC API integration |
| `backend/src/controllers/questionController.js` | Question endpoints |
| `frontend/src/pages/Practice.jsx` | Subject selection |
| `frontend/src/components/Exam/ExamInterface.jsx` | Exam interface |
| `backend/.env` | Backend config |
| `frontend/.env` | Frontend config |

## 🔗 API Endpoints

```
GET /api/questions?subject=Mathematics&limit=20
GET /api/questions/subjects
GET /api/questions/subject/:subject
```

## ⚙️ Configuration

### Backend (.env)
```
PORT=5000
JWT_SECRET=your_secret
ALOC_API_URL=https://questions.aloc.com.ng/api/v2
ALOC_ACCESS_TOKEN=your_token
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🎯 User Flow

1. Register/Login
2. Dashboard → Start Practice
3. Select Subject (15 options)
4. Choose Questions (10-50)
5. Take Test (30 min timer)
6. Submit & View Results

## 🛠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| Questions not loading | Check backend running, verify ALOC token |
| No subjects showing | Check API URL in frontend .env |
| Fallback questions | Normal if no ALOC token set |
| Port in use | Change PORT in backend .env |

## 📖 Documentation

- **COMPLETE_GUIDE.md** - Full user guide
- **ALOC_API_SETUP.md** - API setup details
- **IMPLEMENTATION_SUMMARY.md** - Technical details
- **README.md** - Project overview
- **RUN_PROJECT.md** - Setup instructions

## 💡 Quick Tips

- **Without ALOC token**: App uses fallback questions
- **Question count**: Adjustable 10-50 via slider
- **Timer**: 30 minutes (1800 seconds)
- **Navigation**: Click question numbers to jump
- **Flag**: Mark questions for review
- **Auto-submit**: When timer reaches 0

## 🔍 Testing

### Test with ALOC API
1. Add valid token to backend/.env
2. Start app
3. Select any subject
4. Should fetch real questions

### Test without ALOC API
1. Leave token empty
2. Start app
3. Select any subject
4. Should use fallback questions

## 📊 Features

✅ 15 UTME subjects
✅ Real questions from ALOC
✅ Automatic fallback
✅ Timed exams
✅ Question navigation
✅ Flag questions
✅ Results tracking
✅ Clean interface

## 🎨 Customization

### Change timer (ExamInterface.jsx)
```javascript
const [timeLeft, setTimeLeft] = useState(1800); // 30 min
```

### Change question range (Practice.jsx)
```javascript
<input type="range" min="10" max="50" />
```

### Add subject (alocService.js)
```javascript
const subjectMapping = {
  'NewSubject': 'aloc_code'
};
```

## 🚨 Common Errors

**"Failed to load questions"**
→ Check ALOC token, internet, backend logs

**"No questions available"**
→ Subject might not have questions, try another

**Blank screen**
→ Check both servers running, browser console

**Login not working**
→ Check backend running, JWT_SECRET set

## 📞 Support

- Check browser console (F12)
- Check backend terminal logs
- Review documentation files
- Test with fallback questions first

## 🎓 For Students

1. Sign up
2. Choose your subject
3. Practice regularly
4. Review results
5. Improve scores!

## 👨‍💻 For Developers

1. Clone repo
2. Install dependencies
3. Configure .env files
4. Get ALOC token
5. Start servers
6. Customize as needed

## 📦 Dependencies

### Backend
- express
- axios
- cors
- dotenv
- jsonwebtoken
- bcryptjs

### Frontend
- react
- react-router-dom
- axios
- lucide-react
- tailwindcss

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API**: http://localhost:5000/api
- **ALOC**: https://questions.aloc.com.ng

---

**Quick Start**: Get ALOC token → Add to .env → Start servers → Practice!
