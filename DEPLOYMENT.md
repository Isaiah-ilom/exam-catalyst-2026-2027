# Deployment Guide - Exam Catalyst 2026

This guide provides instructions for deploying the CBT application to various platforms.

## Prerequisites

Before deploying, ensure you have:
- MongoDB database URL (MongoDB Atlas or other)
- JWT Secret (minimum 32 characters)
- Optional: ALOC API Key for questions
- Optional: Email service credentials

## Platform-Specific Deployment

### 1. Replit Deployment

The app is already configured for Replit. Simply:

1. Click the "Deploy" button in Replit
2. Configure environment variables in the deployment settings:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your secret key for JWT tokens
   - `NODE_ENV`: Set to "production"

The app will automatically build and deploy.

### 2. Render Deployment

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Use the following settings:
   - **Build Command**: `cd frontend && npm install && npm run build && cd ../backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment**: Node
4. Add environment variables in Render dashboard:
   - `NODE_ENV=production`
   - `MONGODB_URI=your_mongodb_uri`
   - `JWT_SECRET=your_jwt_secret`
   - `PORT=10000` (Render requires this)

Render will use the `render.yaml` configuration automatically.

### 3. Railway Deployment

1. Create a new project on Railway
2. Connect your GitHub repository
3. Railway will automatically detect `railway.json`
4. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`

Railway automatically handles the build and deploy process.

### 4. Heroku Deployment

#### Using Git:
```bash
heroku create exam-catalyst-2026
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set NODE_ENV=production
git push heroku main
```

#### Using Heroku CLI:
```bash
heroku login
heroku create
heroku buildpacks:set heroku/nodejs
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
git push heroku main
```

### 5. Koyeb Deployment

1. Create a new app on Koyeb
2. Connect your GitHub repository
3. Koyeb will use `koyeb.yaml` configuration
4. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`

### 6. Fly.io Deployment

```bash
flyctl auth login
flyctl launch
flyctl secrets set MONGODB_URI=your_mongodb_uri
flyctl secrets set JWT_SECRET=your_jwt_secret
flyctl deploy
```

The `fly.toml` configuration will be used automatically.

### 7. Cyclic Deployment

1. Import your GitHub repository on Cyclic
2. Cyclic will use `cyclic.yml` configuration
3. Add environment variables in Cyclic dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`

### 8. Docker Deployment

```bash
docker build -t exam-catalyst-2026 .
docker run -p 5000:5000 \
  -e MONGODB_URI=your_mongodb_uri \
  -e JWT_SECRET=your_jwt_secret \
  -e NODE_ENV=production \
  exam-catalyst-2026
```

Or use Docker Compose:
```bash
docker-compose up -d
```

### 9. DigitalOcean App Platform

1. Create a new app on DigitalOcean
2. Connect your GitHub repository
3. Configure build settings:
   - **Build Command**: `./build.sh`
   - **Run Command**: `cd backend && npm start`
4. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`

### 10. AWS (Elastic Beanstalk)

```bash
eb init -p node.js exam-catalyst-2026
eb create production
eb setenv MONGODB_URI=your_mongodb_uri JWT_SECRET=your_jwt_secret NODE_ENV=production
eb deploy
```

## Environment Variables

All deployments require these environment variables:

### Required:
- `NODE_ENV`: Set to "production"
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens (min 32 chars)
- `PORT`: Server port (platform-specific, usually auto-set)

### Optional:
- `ALOC_API_KEY`: For question database integration
- `EMAIL_SERVICE_KEY`: For email notifications
- `FRONTEND_URL`: Frontend URL (auto-detected in most cases)

## MongoDB Setup

### Using MongoDB Atlas (Recommended):

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user
3. Whitelist all IP addresses (0.0.0.0/0) for cloud deployments
4. Get your connection string
5. Replace `<username>`, `<password>`, and `<dbname>` in the connection string

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/exam_catalyst_2026?retryWrites=true&w=majority
```

## Build Process

The build process:
1. Installs frontend dependencies
2. Builds React frontend (creates optimized production bundle)
3. Installs backend dependencies
4. Backend serves the built frontend

## Health Check

All platforms can use the `/health` endpoint to monitor the application:
```
GET /health
```

Response:
```json
{
  "status": "OK",
  "timestamp": "2025-10-10T22:47:05.789Z",
  "uptime": 123.45,
  "environment": "production",
  "mongodb": "connected"
}
```

## Troubleshooting

### Build Fails
- Ensure Node.js version is 18 or higher
- Check that all dependencies are in package.json
- Verify build command has correct paths

### MongoDB Connection Issues
- Verify connection string format
- Check database user permissions
- Ensure IP whitelist includes 0.0.0.0/0 for cloud deployments

### Frontend Not Loading
- Check that frontend build completed successfully
- Verify NODE_ENV is set to "production"
- Ensure PORT is correctly configured

### API Errors
- Verify all required environment variables are set
- Check logs for specific error messages
- Ensure JWT_SECRET is at least 32 characters

## Post-Deployment

After successful deployment:
1. Test the health endpoint
2. Verify database connection
3. Test user registration and login
4. Test exam functionality
5. Monitor logs for any errors

## Scaling

For production use:
- Consider upgrading to paid tiers for better performance
- Use MongoDB Atlas M10 or higher for production
- Enable auto-scaling on supported platforms
- Set up monitoring and alerts
- Configure CDN for static assets

## Security Notes

- Never commit .env files
- Use strong JWT secrets (64+ characters recommended)
- Keep MongoDB credentials secure
- Enable HTTPS on all platforms
- Regularly update dependencies
- Monitor for security vulnerabilities

## Support

For deployment issues:
- Check platform-specific documentation
- Review application logs
- Verify all environment variables
- Test locally first with production settings

## Quick Deploy Commands

```bash
./build.sh
cd backend && npm start
```

For platforms with CLI tools, refer to their specific sections above.
