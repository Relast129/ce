# Ceyora Holidays - Quick Deploy Script for Windows
# Usage: .\deploy.ps1

Write-Host "🚀 Deploying Ceyora Holidays to Vercel..." -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Build the project locally to check for errors
Write-Host "🔨 Building project locally..." -ForegroundColor Yellow
npm run build

# Check if build was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Local build successful!" -ForegroundColor Green
    
    # Deploy to Vercel
    Write-Host "🌍 Deploying to Vercel production..." -ForegroundColor Yellow
    vercel deploy --prod
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "🎉 Deployment successful!" -ForegroundColor Green
        Write-Host "📋 Check deployment status:" -ForegroundColor Cyan
        Write-Host "   vercel ls" -ForegroundColor Gray
        Write-Host ""
        Write-Host "🌐 Your site should be live at:" -ForegroundColor Cyan
        Write-Host "   https://ceyora-sri-lanka-travel-main-[hash].vercel.app" -ForegroundColor Gray
        Write-Host ""
        
        # List recent deployments
        Write-Host "📊 Recent deployments:" -ForegroundColor Cyan
        vercel ls
    } else {
        Write-Host "❌ Deployment failed!" -ForegroundColor Red
        Write-Host "💡 Try debugging with: vercel logs [deployment-url]" -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "❌ Local build failed!" -ForegroundColor Red
    Write-Host "💡 Fix the build errors above before deploying." -ForegroundColor Yellow
    exit 1
}