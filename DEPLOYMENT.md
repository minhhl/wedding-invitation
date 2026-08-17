# Wedding Invitation Website - Setup & Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ 
- npm or yarn
- Supabase account

### 1. Project Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd wedding-invitation

# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local
```

### 2. Configure Environment Variables

Edit `.env.local` with your actual values:

```env
# Supabase (Get from https://supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Wedding Details
NEXT_PUBLIC_GROOM_NAME=Hoàng Minh
NEXT_PUBLIC_BRIDE_NAME=Minh Ngọc
NEXT_PUBLIC_WEDDING_DATE=2024-12-15
NEXT_PUBLIC_CEREMONY_TIME=10:00
NEXT_PUBLIC_RECEPTION_TIME=17:00

# Venue Information
NEXT_PUBLIC_CEREMONY_VENUE=Nhà Thờ Trung Tâm
NEXT_PUBLIC_CEREMONY_ADDRESS=123 Đường Chính, Thành Phố
NEXT_PUBLIC_RECEPTION_VENUE=Nhà Hàng Sang Trọng
NEXT_PUBLIC_RECEPTION_ADDRESS=456 Đại Lộ, Thành Phố

# Banking Details
NEXT_PUBLIC_GROOM_BANK_NAME=Vietcombank
NEXT_PUBLIC_GROOM_ACCOUNT_NUMBER=1234567890
NEXT_PUBLIC_GROOM_ACCOUNT_HOLDER=Hoàng Minh
NEXT_PUBLIC_BRIDE_BANK_NAME=Vietcombank
NEXT_PUBLIC_BRIDE_ACCOUNT_NUMBER=0987654321
NEXT_PUBLIC_BRIDE_ACCOUNT_HOLDER=Minh Ngọc

# Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Wedding of Hoàng Minh & Minh Ngọc
```

### 3. Setup Supabase Database

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key
3. Create the following tables:

#### RSVP Responses Table
```sql
CREATE TABLE rsvp_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  number_of_guests INTEGER NOT NULL,
  attendance VARCHAR(10) NOT NULL CHECK (attendance IN ('yes', 'no')),
  wishes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better query performance
CREATE INDEX idx_rsvp_created_at ON rsvp_responses(created_at DESC);
```

#### Guest Book Table
```sql
CREATE TABLE guest_book (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better query performance
CREATE INDEX idx_guestbook_created_at ON guest_book(created_at DESC);
CREATE INDEX idx_guestbook_approved ON guest_book(approved);
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🎨 Customization Guide

### Change Wedding Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  wedding: {
    ivory: '#F8F5F0',      // Main background
    champagne: '#D4B483',  // Accent color
    beige: '#E9DFD0',      // Secondary background
    brown: '#4A3B2A',      // Text color
    white: '#FFFFFF',      // Highlights
  },
}
```

### Update Couple Information
1. Edit `.env.local` with couple names
2. Edit timeline events in `src/components/LoveStoryTimeline.tsx`
3. Update gallery images in `src/components/PhotoGallery.tsx`
4. Modify dress code colors in `src/components/DressCode.tsx`

### Change Fonts
Edit `src/styles/globals.css`:
```css
/* Change heading font */
.heading-1 {
  font-family: 'Your Font Here', serif;
}

/* Change body font */
body {
  font-family: 'Your Font Here', sans-serif;
}

/* Change accent font */
.accent-text {
  font-family: 'Your Font Here', cursive;
}
```

### Add Wedding Photos
Replace sample images in `src/components/PhotoGallery.tsx`:
```typescript
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: 'https://your-cdn.com/photo1.jpg',
    alt: 'Photo 1',
    title: 'Beautiful Moment',
  },
  // Add more images...
]
```

## 📦 Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repo to [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Vercel will auto-deploy on every push

### Option 2: Netlify
1. Connect your GitHub repo to [netlify.com](https://netlify.com)
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Option 3: Docker
```bash
# Build Docker image
docker build -t wedding-invitation .

# Run container
docker run -p 3000:3000 wedding-invitation
```

### Option 4: Traditional Server (Ubuntu/Debian)
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone <your-repo-url>
cd wedding-invitation
npm install
npm run build

# Use PM2 for process management
npm install -g pm2
pm2 start npm --name "wedding" -- start
pm2 startup
pm2 save
```

## 🔍 SEO Optimization

The site includes:
- Meta tags for social media sharing
- Open Graph integration
- Structured data (JSON-LD)
- Mobile-optimized viewport
- Dynamic meta tags based on environment variables

Edit `src/app/layout.tsx` to customize SEO meta tags.

## 🧪 Testing

### Manual Testing Checklist
- [ ] Test on desktop (Chrome, Firefox, Safari)
- [ ] Test on tablet (iPad)
- [ ] Test on mobile (iPhone, Android)
- [ ] Test all animations and interactions
- [ ] Test RSVP form submission
- [ ] Test guest book submission
- [ ] Check all links work
- [ ] Verify load time < 3 seconds on mobile

### Lighthouse Testing
```bash
# Build and analyze
npm run build

# Use Chrome DevTools or online tool:
# https://pagespeed.web.dev/
```

## 📊 Analytics Integration

To add Google Analytics:

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID
3. Add to environment variables:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

4. Create `src/lib/gtag.ts`:
```typescript
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export const pageview = (url: string) => {
  if (!GA_ID) return
  
  window.gtag?.('config', GA_ID, {
    page_path: url,
  })
}
```

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear build cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### Supabase Connection Issues
1. Verify environment variables are correct
2. Check Supabase project is active
3. Ensure tables exist in database
4. Check row-level security (RLS) policies if needed

### Images Not Loading
1. Verify image URLs are accessible
2. Check Supabase storage permissions
3. Ensure CORS is configured if using external CDN

## 📱 Performance Tips

1. **Optimize Images**: Use WebP format, compress before uploading
2. **Enable Caching**: Configure CDN headers
3. **Lazy Load**: Images use Next.js Image component with lazy loading
4. **Code Splitting**: Automatic with Next.js App Router
5. **Minimize Animations**: Reduce frame rate on low-end devices

## 🔐 Security

- Never commit `.env.local` to repository
- Keep Supabase keys secret
- Use RLS policies for database tables
- Enable HTTPS in production
- Regular security audits

## 📄 Project Structure

```
wedding-invitation/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/           # React components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities & configs
│   ├── styles/              # Global styles
│   └── types/               # TypeScript types
├── public/                  # Static assets
├── .env.local              # Environment variables (local)
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS config
├── tsconfig.json           # TypeScript config
└── package.json            # Dependencies
```

## 💡 Tips & Best Practices

1. **Use Environment Variables**: Keep sensitive data in `.env.local`
2. **Test on Real Devices**: Emulators don't catch all issues
3. **Monitor Performance**: Use Lighthouse and Web Vitals
4. **Backup Database**: Regular Supabase backups
5. **Version Control**: Commit frequently with clear messages
6. **Documentation**: Keep README updated

## 📞 Support Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Hook Form Documentation](https://react-hook-form.com/)

## 🎉 Launch Checklist

Before going live:
- [ ] All content updated (names, dates, venue)
- [ ] Images optimized and uploaded
- [ ] Environment variables configured
- [ ] Database tables created
- [ ] RSVP form tested
- [ ] Guest book tested
- [ ] Mobile responsive verified
- [ ] SEO meta tags updated
- [ ] Analytics configured
- [ ] Security checked
- [ ] Performance optimized
- [ ] Domain configured
- [ ] SSL certificate installed
- [ ] Backup strategy in place

## 📝 License

MIT License - Feel free to use this template for your wedding!

---

**Built with ❤️ for celebrating love**
