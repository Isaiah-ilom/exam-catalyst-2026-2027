#!/bin/bash
set -e

echo "Building Exam Catalyst 2026..."

echo "Installing frontend dependencies..."
cd frontend
npm install --production=false

echo "Building frontend..."
npm run build

echo "Installing backend dependencies..."
cd ../backend
npm install --production

echo "Build completed successfully!"
echo "Frontend build available at: frontend/build"
echo "Ready to deploy!"
