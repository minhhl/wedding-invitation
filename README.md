# 🎊 Wedding Invitation Website

A luxurious, modern, and fully responsive wedding invitation website built with Next.js, Framer Motion, GSAP, and TailwindCSS.

## ✨ Features

- **Interactive Invitation Cover**: Beautiful book-opening animation with floating particles
- **Countdown Timer**: Real-time countdown to the wedding day
- **Love Story Timeline**: Interactive timeline showcasing your love story
- **Photo Gallery**: Masonry gallery with lightbox functionality
- **Wedding Events Info**: Ceremony and reception details with Google Maps integration
- **Dress Code**: Beautiful color palette suggestions
- **Gift Registry**: Banking information with easy copy-to-clipboard
- **RSVP Form**: Elegant form with validation and confetti celebration
- **Guest Book**: Guestbook section for messages and wishes
- **Fully Responsive**: Mobile-first design optimized for all devices
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **High Performance**: Lazy loading, optimized images, and smooth animations

## 🚀 Technologies

- **Next.js 15** (App Router)
- **TypeScript**
- **React 18**
- **Framer Motion** (Animations)
- **GSAP** (Advanced animations)
- **TailwindCSS** (Styling)
- **React Hook Form** (Form handling)
- **Zod** (Schema validation)
- **Supabase** (Database)

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd wedding-invitation
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Update `.env.local` with your:
   - Supabase credentials
   - Wedding details
   - Venue information
   - Banking details
   - Google Maps API key

## 🎨 Configuration

### Wedding Details
Edit `.env.local` to customize:
- Couple names
- Wedding date and times
- Venue details
- Banking information
- Color scheme (in `tailwind.config.ts`)

### Color Scheme
The default luxury color scheme includes:
- **Champagne Gold**: #D4B483
- **Ivory**: #F8F5F0
- **Beige**: #E9DFD0
- **Deep Brown**: #4A3B2A
- **Soft White**: #FFFFFF

Modify colors in `tailwind.config.ts` under the `wedding` theme colors.

### Fonts
- **Headings**: Playfair Display
- **Body**: Montserrat
- **Accent**: Great Vibes

## 🗄️ Database Setup (Supabase)

The whole backend — guests, RSVP requests, and admin login — lives in
Supabase. The browser talks to it directly (via `NEXT_PUBLIC_SUPABASE_URL` /
`NEXT_PUBLIC_SUPABASE_ANON_KEY`), so `/guest-management` and RSVP work the
same whether the app runs as a server (`npm run dev` / `npm start`) or as the
static GitHub Pages export. The anon key is public by design — what it can
read/write is enforced by Postgres row-level security (RLS), not by keeping
the key secret.

Admin login is by plain username/password. Supabase Auth itself requires an
email, so each account gets a hidden synthetic one
(`<username>@wedding.local`) that's never shown in the UI — see
`src/lib/supabaseAuth.ts`.

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run [`supabase/schema.sql`](supabase/schema.sql) in the SQL Editor
   (Project → SQL Editor → New query) — creates `profiles`, `guests`, and
   `rsvp_requests` with their RLS policies.
3. Create your admin/viewer accounts: copy `.env.local.example` to
   `.env.local`, add `SUPABASE_SECRET_KEY` (Project Settings → API — keep
   this out of version control), fill in the accounts in
   `scripts/seed-supabase-users.mjs`, then run:
   ```bash
   node --env-file=.env.local scripts/seed-supabase-users.mjs
   ```
   Remove `SUPABASE_SECRET_KEY` from `.env.local` afterwards — nothing else
   in the app needs it.
4. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project
   Settings → API) as repository secrets, and pass them to the GitHub Pages
   build in `.github/workflows/deploy.yml`.

## 💻 Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Building for Production

```bash
npm run build
npm start
```

## 🚀 Deployment

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

# Or with Docker Compose
docker-compose up
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

### Deployment Security Checklist
- [ ] Never commit `.env.local` to the repository
- [ ] Environment variables configured on the hosting platform
- [ ] Supabase keys kept secret, RLS policies enabled where needed
- [ ] HTTPS/SSL certificate enabled
- [ ] Custom domain configured
- [ ] Final testing on desktop and mobile before going live

### Troubleshooting Deployment

**Build errors**
```bash
rm -rf .next
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Supabase connection issues**
1. Verify environment variables are correct
2. Check the Supabase project is active
3. Ensure tables exist in the database
4. Check row-level security (RLS) policies if needed

## 📱 Features Breakdown

### Invitation Cover
- Floating particle effects
- Book-opening animation
- Smooth transition to main content

### Hero Section
- Full-screen presentation
- Real-time countdown timer
- Elegant typography

### Love Story Timeline
- Interactive vertical timeline
- Fade-up animations on scroll
- Custom milestone icons

### Photo Gallery
- Responsive masonry layout
- Lightbox fullscreen viewer
- Swipe navigation on mobile
- Lazy loading images

### Wedding Events
- Ceremony and reception cards
- Location details with maps integration
- Glassmorphism design

### RSVP Form
- Form validation with Zod
- Real-time error messages
- Confetti celebration on submission
- Responsive design

### Guest Book
- Display guest messages
- Timestamp formatting
- Heart animations

## 🎬 Animation Libraries

- **Framer Motion**: Page transitions, component animations, and interactive elements
- **GSAP**: Advanced scroll animations and complex sequences

## 📊 Performance

- **Lighthouse Score Target**: 90+
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic with Next.js App Router

## 🔐 Environment Variables

Required variables:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_GROOM_NAME=
NEXT_PUBLIC_BRIDE_NAME=
NEXT_PUBLIC_WEDDING_DATE=
NEXT_PUBLIC_CEREMONY_TIME=
NEXT_PUBLIC_RECEPTION_TIME=
NEXT_PUBLIC_CEREMONY_VENUE=
NEXT_PUBLIC_CEREMONY_ADDRESS=
NEXT_PUBLIC_RECEPTION_VENUE=
NEXT_PUBLIC_RECEPTION_ADDRESS=
NEXT_PUBLIC_GROOM_BANK_NAME=
NEXT_PUBLIC_GROOM_ACCOUNT_NUMBER=
NEXT_PUBLIC_GROOM_ACCOUNT_HOLDER=
NEXT_PUBLIC_BRIDE_BANK_NAME=
NEXT_PUBLIC_BRIDE_ACCOUNT_NUMBER=
NEXT_PUBLIC_BRIDE_ACCOUNT_HOLDER=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SITE_NAME=
```

## 🎯 Customization Guide

### Changing Colors
Edit `src/styles/globals.css` and `tailwind.config.ts`

### Updating Fonts
Modify font imports in `src/styles/globals.css`

### Adding Gallery Images
Replace the sample images in `src/components/PhotoGallery.tsx`

### Customizing Timeline Events
Edit the `timelineEvents` array in `src/components/LoveStoryTimeline.tsx`

### Modifying Dress Code Colors
Update the `dressCodeColors` array in `src/components/DressCode.tsx`

## 📝 License

MIT License - Feel free to use this template for your wedding!

## 🙏 Credits

Built with love for celebrating love. ✨

---

**Happy Wedding! 💍**
