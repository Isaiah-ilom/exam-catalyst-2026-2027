# Exam Catalyst 2026 - Advanced CBT UTME Platform

A comprehensive Computer-Based Testing (CBT) platform designed specifically for UTME preparation in Nigeria. Built with modern technologies to provide a superior learning experience that surpasses existing solutions like TestDriller.

## 🌟 Features

### 🎯 Core Functionality
- **Complete UTME Simulation** - Full exam experience with 4 subjects (Mathematics, English, Physics, Chemistry)
- **Advanced Practice Modes** - Subject-wise, topic-based, timed, and challenge modes
- **Real-time Analytics** - Detailed performance tracking and insights
- **Question Banking** - Integration with ALOC API for comprehensive question database
- **Intelligent Timer** - Auto-submit, warnings, and pause functionality
- **Built-in Calculator** - Scientific calculator for mathematics and physics

### 🎨 Modern User Experience
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Dark/Light Themes** - Automatic system detection with manual override
- **Professional UI** - Clean, intuitive interface with smooth animations
- **Accessibility** - Screen reader support and keyboard navigation
- **Progressive Web App** - Installable on mobile devices

### 📊 Advanced Analytics
- **Performance Charts** - Interactive visualizations using Chart.js
- **Subject Breakdown** - Detailed analysis per subject and topic
- **Time Management** - Speed analysis and optimization recommendations
- **Progress Tracking** - Historical performance trends
- **Leaderboards** - Competitive rankings and achievements

### 🔐 Security & Integrity
- **Exam Monitoring** - Tab switching and violation detection
- **Secure Authentication** - JWT tokens with refresh mechanism
- **Account Protection** - Login attempt limiting and session management
- **Data Encryption** - Secure password hashing and sensitive data protection

## 🚀 Technology Stack

### Frontend
- **React 18** - Modern hooks-based architecture
- **Tailwind CSS** - Utility-first styling with custom design system
- **Chart.js** - Interactive charts and visualizations
- **Context API** - State management for auth, exam, and theme
- **React Router** - Client-side routing with protected routes
- **Framer Motion** - Smooth animations and transitions

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing and validation
- **Nodemailer** - Email service integration

### External Services
- **ALOC API** - Comprehensive UTME question database
- **MongoDB Atlas** - Cloud database hosting
- **SendGrid/SMTP** - Email notifications and verification
- **Cloudinary** - Image storage and optimization

## 📁 Project Structure

```
exam-catalyst-2026/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── context/        # React Context providers
│   │   ├── services/       # API service layers
│   │   ├── utils/          # Utility functions
│   │   └── styles/         # Global styles and themes
│   └── public/             # Static assets
├── backend/                 # Node.js API server
│   └── src/
│       ├── controllers/    # Request handlers
│       ├── models/         # Database models
│       ├── routes/         # API route definitions
│       ├── middleware/     # Custom middleware
│       ├── services/       # Business logic
│       └── utils/          # Server utilities
└── docs/                   # Documentation
```

## 🛠 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB instance (local or Atlas)
- Git

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/exam-catalyst-2026.git
cd exam-catalyst-2026
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ALOC_API_KEY=your_aloc_api_key
SENDGRID_API_KEY=your_sendgrid_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

Start backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME=Exam Catalyst 2026
```

Start frontend development server:
```bash
npm start
```

### 4. Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## 🔧 Configuration

### ALOC API Integration
1. Register at [ALOC API](https://questions.aloc.com.ng)
2. Obtain API key
3. Add to backend `.env` file
4. Questions will be automatically fetched and cached

### Email Service Setup
**Option 1: SendGrid**
```env
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@yourdomain.com
```

**Option 2: SMTP**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### Database Configuration
**Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/exam_catalyst_2026
```

**MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/exam_catalyst_2026
```

## 🎯 Key Features Comparison

| Feature | TestDriller | Exam Catalyst 2026 |
|---------|-------------|-------------------|
| Modern UI/UX | ⚠️ Basic | ✅ Professional |
| Mobile Responsive | ⚠️ Limited | ✅ Fully Responsive |
| Dark Mode | ❌ | ✅ Auto + Manual |
| Real-time Analytics | ⚠️ Basic | ✅ Advanced Charts |
| Practice Modes | ⚠️ 2-3 modes | ✅ 6+ modes |
| Exam Security | ⚠️ Basic | ✅ Enterprise-grade |
| Performance | ⚠️ Good | ✅ Optimized |
| API Integration | ⚠️ Limited | ✅ ALOC + Custom |

## 🔐 Security Features

- **Account Security** - Multi-layer authentication with account lockout
- **Exam Integrity** - Real-time monitoring of user behavior
- **Data Protection** - Encrypted passwords and secure API endpoints
- **Session Management** - JWT tokens with automatic refresh
- **Rate Limiting** - Protection against brute force attacks

## 📊 Analytics Dashboard

- **Performance Metrics** - Score trends, time analysis, accuracy rates
- **Subject Insights** - Detailed breakdown by subject and topic
- **Progress Tracking** - Historical data with improvement suggestions
- **Comparative Analysis** - Ranking against other users
- **Study Recommendations** - AI-powered learning path suggestions

## 🎮 Gamification Elements

- **Achievement System** - Unlock badges for milestones
- **Leaderboards** - Compete with other students
- **Study Streaks** - Daily practice rewards
- **Progress Levels** - Advance through difficulty tiers
- **Challenge Modes** - Speed rounds and accuracy tests

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy build folder to your preferred platform
```

### Backend (Railway/Heroku)
```bash
# Set environment variables in platform dashboard
# Deploy directly from GitHub repository
```

### Docker Deployment
```bash
docker-compose up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- ALOC API for comprehensive question database
- Nigerian students for feedback and requirements
- Open source community for amazing tools and libraries

## 📞 Support

For support, email support@examcatalyst2026.com or join our Slack channel.

## 🔮 Roadmap

- [ ] AI-powered question generation
- [ ] Video lesson integration
- [ ] Multi-language support
- [ ] Advanced proctoring features
- [ ] Mobile app development
- [ ] Blockchain certificates

---

**Built with ❤️ for Nigerian students preparing for UTME 2026**