# 🚀 Ceyora Holidays - Deployment Guide

## 🌟 **Live Website URLs**

### **Production URL (Latest)**

```
https://ceyora-sri-lanka-travel-main-demj5ceze-relast129s-projects.vercel.app
```

### **Vercel Dashboard**

```
https://vercel.com/relast129s-projects/ceyora-sri-lanka-travel-main
```

---

## 📋 **Quick Deployment Steps**

### **1. Make Changes Locally**

```bash
# Navigate to project directory
cd c:\Users\ramzy\Downloads\ceyora-sri-lanka-travel-main

# Test build locally
npm run build

# Start development server to test
npm run dev
```

### **2. Deploy to Production**

```bash
# Deploy to Vercel production
vercel deploy --prod

# Or use the shorter command
vercel --prod
```

### **3. Check Deployment Status**

```bash
# List all deployments
vercel ls

# Get specific deployment logs
vercel logs [deployment-url]
```

---

## 🛠️ **Development Workflow**

### **Local Development**

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Opens at http://localhost:3000

# Build for production
npm run build

# Start production server locally
npm start
```

### **Environment Commands**

- **Development**: `npm run dev` - Hot reload, debugging
- **Build**: `npm run build` - Create production build
- **Start**: `npm start` - Serve production build locally
- **Lint**: `npm run lint` - Check code quality

---

## 🌐 **Custom Domain Setup (Optional)**

### **1. Purchase Domain**

- Recommended: `ceyoraholidays.com` or `ceyora.lk`

### **2. Configure in Vercel Dashboard**

1. Go to [Vercel Dashboard](https://vercel.com/relast129s-projects/ceyora-sri-lanka-travel-main)
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### **3. DNS Configuration Example**

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

---

## 📱 **For Client Viewing**

### **Share These URLs with Clients:**

**🏠 Homepage**

```
https://ceyora-sri-lanka-travel-main-demj5ceze-relast129s-projects.vercel.app
```

**ℹ️ About Page**

```
https://ceyora-sri-lanka-travel-main-demj5ceze-relast129s-projects.vercel.app/about
```

**📦 Packages Page**

```
https://ceyora-sri-lanka-travel-main-demj5ceze-relast129s-projects.vercel.app/packages
```

**🛎️ Services Page**

```
https://ceyora-sri-lanka-travel-main-demj5ceze-relast129s-projects.vercel.app/services
```

**📞 Contact Page**

```
https://ceyora-sri-lanka-travel-main-demj5ceze-relast129s-projects.vercel.app/contact
```

---

## 🔧 **Troubleshooting**

### **Common Issues & Solutions:**

**❌ Build Errors**

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

**❌ Deployment Fails**

```bash
# Check build locally first
npm run build

# If successful, try deploying again
vercel deploy --prod
```

**❌ Images Not Loading**

- Check if image URLs are accessible
- Verify `next.config.js` image domains configuration

**❌ Page Not Found**

- Ensure page files are in correct `src/app/` directory structure
- Check file naming convention (page.tsx for routes)

---

## 📈 **Future Development**

### **Recommended Next Steps:**

1. **Custom Domain**: Set up `ceyoraholidays.com`
2. **Analytics**: Add Google Analytics tracking
3. **Contact Form**: Implement functional contact form
4. **CMS Integration**: Add Sanity/Strapi for content management
5. **Booking System**: Integrate payment gateway
6. **SEO**: Optimize meta tags and add sitemap
7. **Performance**: Optimize images and loading speeds

---

## 📞 **Support**

**Deployment Issues:**

- Check [Vercel Documentation](https://vercel.com/docs)
- Vercel Support: support@vercel.com

**Development Issues:**

- Next.js Documentation: https://nextjs.org/docs
- GitHub Issues: Create issues in your repository

---

_Last Updated: $(date)_
_Project: Ceyora Holidays Sri Lanka Travel Website_
_Framework: Next.js 14 + TypeScript + Tailwind CSS_
