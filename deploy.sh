#!/bin/bash

# Ceyora Holidays - Quick Deploy Script
# Usage: ./deploy.sh

echo "🚀 Deploying Ceyora Holidays to Vercel..."
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the project locally to check for errors
echo "🔨 Building project locally..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Local build successful!"
    
    # Deploy to Vercel
    echo "🌍 Deploying to Vercel production..."
    vercel deploy --prod
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 Deployment successful!"
        echo "📋 Check deployment status:"
        echo "   vercel ls"
        echo ""
        echo "🌐 Your site should be live at:"
        echo "   https://ceyora-sri-lanka-travel-main-[hash].vercel.app"
        echo ""
        
        # List recent deployments
        echo "📊 Recent deployments:"
        vercel ls | head -5
    else
        echo "❌ Deployment failed!"
        echo "💡 Try debugging with: vercel logs [deployment-url]"
        exit 1
    fi
else
    echo "❌ Local build failed!"
    echo "💡 Fix the build errors above before deploying."
    exit 1
fi