#!/bin/bash

# Bangladesh Election Campaign Planner - Deployment Script
# Author: Naimul Haque (naimulhaque214)

set -e

echo "🚀 Starting deployment process..."

# Check if we're on the main branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
    echo "❌ Deployment should only be done from the main branch"
    exit 1
fi

# Check if working directory is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Working directory is not clean. Please commit or stash changes."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run linting
echo "🔍 Running linter..."
npm run lint

# Check formatting
echo "✨ Checking code formatting..."
npm run format:check

# Type checking
echo "🔧 Running type check..."
npm run type-check

# Build the application
echo "🏗️ Building application..."
npm run build

# Deploy to GitHub Pages (if configured)
if [ "$1" = "--deploy" ]; then
    echo "🌐 Deploying to GitHub Pages..."
    
    # Create gh-pages branch if it doesn't exist
    if ! git show-ref --verify --quiet refs/heads/gh-pages; then
        git checkout -b gh-pages
        git checkout main
    fi
    
    # Deploy to gh-pages
    git subtree push --prefix dist origin gh-pages
    
    echo "✅ Deployment completed successfully!"
else
    echo "✅ Build completed successfully!"
    echo "💡 Run './deploy.sh --deploy' to deploy to GitHub Pages"
fi

echo "🎉 Process completed!"