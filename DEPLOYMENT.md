# Production Deployment Guide

## Ceyora Holidays Website - Production Deployment

This guide covers deploying the Ceyora Holidays website to production environments.

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Production hosting environment (Vercel, Netlify, or custom server)

### Quick Deployment Steps

#### 1. Environment Setup

```bash
# Copy environment variables
cp .env.example .env.local

# Update with your production values
nano .env.local
```

#### 2. Build for Production

```bash
# Install dependencies
npm install

# Run production build
npm run build:production

# Test production build locally
npm start
```

#### 3. Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### 4. Deploy to Netlify

```bash
# Build static export
npm run export

# Deploy to Netlify (drag & drop the 'out' folder)
```

#### 5. Custom Server Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Performance Optimizations

The website includes several production optimizations:

- **Image Optimization**: WebP/AVIF formats with lazy loading
- **Code Splitting**: Automatic vendor chunk splitting
- **CSS Optimization**: Purged unused styles
- **Caching**: Optimized cache headers for static assets
- **Bundle Analysis**: Run `npm run analyze` to check bundle size

### SEO & Analytics

The website is production-ready with:

- ✅ Meta tags and Open Graph
- ✅ Structured data (JSON-LD)
- ✅ Sitemap generation
- ✅ Robots.txt
- ✅ Performance monitoring
- ✅ Mobile-first responsive design

### Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test mobile responsiveness
- [ ] Check social media links work
- [ ] Verify WhatsApp integration
- [ ] Test contact forms
- [ ] Validate image gallery functionality
- [ ] Check page load speeds
- [ ] Verify SSL certificate

### Environment Variables

Key environment variables for production:

```env
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_PHONE=+94768118780
NEXT_PUBLIC_EMAIL=ceyoraholidays@gmail.com
NEXT_PUBLIC_WHATSAPP_NUMBER=94768118780
```

### Support

For deployment issues or questions, contact the development team.

### Performance Metrics

Target performance metrics:

- First Contentful Paint: < 2s
- Largest Contentful Paint: < 3s
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 4s

The website is optimized to meet these performance standards on production deployment.
