# Exam Catalyst 2026 - Setup Guide

This guide will help you set up the Exam Catalyst 2026 CBT platform from scratch.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v8.0.0 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **MongoDB** (v5.0 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas)

### Verify Installation
```bash
node --version
npm --version
git --version
mongod --version  # If using local MongoDB
```

## 🚀 Quick Start

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

Create environment file:
```bash
cp .env.example .env
```

Edit `.env` with your configurations:
```env
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/exam_catalyst_2026

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_minimum_32_characters
JWT_EXPIRE=7d

# Email Configuration (Choose SMTP or SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@examcatalyst2026.com

# ALOC API
ALOC_API_KEY=your_aloc_api_key

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open new terminal:
```bash
cd frontend
npm install
```

Create environment file:
```bash
cp .env.example .env
```

Edit `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME=Exam Catalyst 2026
```

Start frontend development server:
```bash
npm start
```

### 4. Access Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **API Health Check:** http://localhost:5000/health

## 🗄️ Database Setup

### Option 1: Local MongoDB

1. **Install MongoDB Community Edition**
   - [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
   - [macOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
   - [Linux](https://docs.mongodb.com/manual/administration/install-on-linux/)

2. **Start MongoDB Service**
   ```bash
   # macOS/Linux
   sudo systemctl start mongod
   
   # Or manually
   mongod --dbpath /path/to/your/db
   ```

3. **Verify Connection**
   ```bash
   mongo
   # Should connect to MongoDB shell
   ```

### Option 2: MongoDB Atlas (Recommended)

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for free account

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region closest to you
   - Create cluster

3. **Configure Database Access**
   - Go to Database Access
   - Add new database user
   - Set username and password
   - Give user read/write permissions

4. **Configure Network Access**
   - Go to Network Access
   - Add IP address (0.0.0.0/0 for development)
   - For production, use specific IP addresses

5. **Get Connection String**
   - Go to Clusters → Connect
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your user password

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/exam_catalyst_2026?retryWrites=true&w=majority
```

## 📧 Email Service Setup

### Option 1: SendGrid (Recommended)

1. **Create SendGrid Account**
   - Go to [SendGrid](https://sendgrid.com/)
   - Sign up for free account

2. **Create API Key**
   - Go to Settings → API Keys
   - Create new API key
   - Give it "Full Access" or "Mail Send" permissions
   - Copy the API key

3. **Verify Sender Identity**
   - Go to Settings → Sender Authentication
   - Verify your domain or email address

4. **Update Environment Variables**
   ```env
   SENDGRID_API_KEY=your_sendgrid_api_key
   EMAIL_FROM=your_verified_email@domain.com
   EMAIL_FROM_NAME=Exam Catalyst 2026
   ```

### Option 2: SMTP (Gmail Example)

1. **Enable 2-Factor Authentication**
   - Go to your Google Account settings
   - Enable 2-factor authentication

2. **Generate App Password**
   - Go to Security → App passwords
   - Generate password for "Mail"
   - Copy the 16-character password

3. **Update Environment Variables**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_16_character_app_password
   ```

## 🔑 ALOC API Setup

1. **Register with ALOC**
   - Visit [ALOC API](https://questions.aloc.com.ng)
   - Create developer account
   - Verify your email

2. **Get API Key**
   - Go to Dashboard → API Keys
   - Create new API key
   - Copy the key

3. **Update Environment Variables**
   ```env
   ALOC_API_URL=https://questions.aloc.com.ng/api/v2
   ALOC_API_KEY=your_aloc_api_key
   ```

4. **Test API Connection**
   ```bash
   curl -H "Authorization: Bearer your_api_key" \
   https://questions.aloc.com.ng/api/v2/questions?subject=Mathematics&limit=5
   ```

## 🖼️ Cloudinary Setup (Optional)

For handling image uploads and optimization:

1. **Create Cloudinary Account**
   - Go to [Cloudinary](https://cloudinary.com/)
   - Sign up for free account

2. **Get Credentials**
   - Go to Dashboard
   - Copy Cloud Name, API Key, and API Secret

3. **Update Environment Variables**
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

## 🔧 Development Tools

### Recommended VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint
- Thunder Client (for API testing)
- MongoDB for VS Code

### Browser Extensions
- React Developer Tools
- Redux DevTools (if using Redux)
- JSON Viewer

## 🧪 Testing Setup

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### API Testing with Thunder Client/Postman
Import the provided collection:
```bash
# Copy postman_collection.json to your Postman workspace
```

Test endpoints:
1. POST `/api/auth/register` - Create test user
2. POST `/api/auth/login` - Login test user
3. GET `/api/auth/me` - Get current user
4. GET `/api/questions` - Fetch questions

## 📦 Production Deployment

### Frontend Deployment (Vercel)

1. **Build Project**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

3. **Environment Variables**
   - Set in Vercel dashboard
   - Update API URL to production backend

### Backend Deployment (Railway)

1. **Create Railway Account**
   - Go to [Railway](https://railway.app/)
   - Connect GitHub account

2. **Deploy from GitHub**
   - Create new project
   - Connect to your repository
   - Select backend folder

3. **Set Environment Variables**
   - Go to Variables tab
   - Add all production environment variables
   - Use production MongoDB Atlas connection string

### Database Migration
```bash
# Run any pending migrations
npm run migrate

# Seed database with initial data
npm run seed
```

## 🔒 Security Checklist

- [ ] Use strong JWT secret (minimum 32 characters)
- [ ] Enable HTTPS in production
- [ ] Set secure CORS origins
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Set up proper database indexes
- [ ] Configure proper error handling
- [ ] Enable security headers
- [ ] Set up monitoring and logging

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
```bash
# Check if MongoDB is running
mongod --version
sudo systemctl status mongod

# Check if port 5000 is in use
lsof -i :5000

# Clear npm cache
npm cache clean --force
```

**Frontend won't start:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check if port 3000 is in use
lsof -i :3000
```

**API requests failing:**
- Check CORS configuration
- Verify API URL in frontend .env
- Test API endpoints with curl/Postman
- Check network tab in browser dev tools

**Database connection issues:**
- Verify MongoDB is running
- Check connection string format
- Ensure network access is configured (Atlas)
- Check username/password are correct

### Logs and Debugging

**Backend logs:**
```bash
cd backend
npm run dev
# Check terminal for error messages
```

**Frontend logs:**
- Open browser developer tools
- Check Console tab for errors
- Check Network tab for failed requests

**Database logs:**
```bash
# MongoDB logs location varies by OS
# macOS: /usr/local/var/log/mongodb/
# Linux: /var/log/mongodb/
tail -f /path/to/mongodb/logs
```

## 📞 Getting Help

If you encounter issues:

1. **Check Documentation**
   - API.md for API reference
   - FEATURES.md for feature details

2. **Search Issues**
   - GitHub Issues tab
   - Stack Overflow

3. **Create Issue**
   - Provide error messages
   - Include environment details
   - Steps to reproduce

4. **Contact Support**
   - Email: support@examcatalyst2026.com
   - Discord: [Join our server]

## 🎯 Next Steps

After successful setup:

1. **Create Admin User**
   ```bash
   npm run create-admin
   ```

2. **Import Sample Questions**
   ```bash
   npm run import-questions
   ```

3. **Configure Email Templates**
   - Customize email templates in `/templates`

4. **Set Up Monitoring**
   - Configure error tracking (Sentry)
   - Set up performance monitoring

5. **Test All Features**
   - User registration/login
   - Exam creation and taking
   - Results and analytics
   - Email notifications

Congratulations! Your Exam Catalyst 2026 platform is now ready to use! 🎉