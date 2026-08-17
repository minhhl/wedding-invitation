# Wedding Invitation - Features & Customization Guide

## 🎬 Animation Guide

All animations use **Framer Motion** and **GSAP** for smooth, elegant effects.

### Animation Types

#### 1. Fade In/Out
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>
  Content
</motion.div>
```

#### 2. Slide Up
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  Content
</motion.div>
```

#### 3. Scale In
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

#### 4. Hover Effects
```tsx
<motion.div
  whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
  transition={{ type: "spring", stiffness: 300 }}
>
  Hover me
</motion.div>
```

#### 5. Scroll Animations
```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
  Scroll to view
</motion.div>
```

### Customizing Animation Timing

Adjust animation duration and easing in component files:

```typescript
// Faster
transition={{ duration: 0.3 }}

// Slower
transition={{ duration: 1.2 }}

// Different easing
transition={{ duration: 0.8, ease: "easeInOut" }}

// Spring animation
transition={{ type: "spring", stiffness: 100 }}
```

## 🎨 Color Customization

### Wedding Color Palette
Located in `tailwind.config.ts`:

```typescript
colors: {
  wedding: {
    ivory: '#F8F5F0',      // Main background
    champagne: '#D4B483',  // Primary accent
    beige: '#E9DFD0',      // Secondary background
    brown: '#4A3B2A',      // Text/Dark elements
    white: '#FFFFFF',      // Highlights
  }
}
```

### Using Colors in Components
```tsx
// Using Tailwind classes
<div className="bg-wedding-ivory text-wedding-brown">

// Using CSS
<div style={{ backgroundColor: '#D4B483' }}>

// Using CSS variables
<div className="text-wedding-champagne">
```

### Creating a New Color Scheme

1. Edit `tailwind.config.ts` colors
2. Update CSS variables in `src/styles/globals.css`
3. Update color references in components

Example - Burgundy & Gold Theme:
```typescript
colors: {
  wedding: {
    ivory: '#F5E6D3',
    champagne: '#D4AF37',     // Gold
    beige: '#E8D4C4',
    brown: '#722F37',         // Burgundy
    white: '#FFFBF7',
  }
}
```

## 🎭 Component Features

### 1. Invitation Cover
- **Floating Particles**: Dust-like animation effect
- **Book Opening**: Smooth rotation animation
- **Custom Text**: Update couple names in `.env.local`
- **CTA Button**: Opens main website

**Customization:**
```typescript
// In page.tsx
const particles = Array.from({ length: 30 }, ...)  // Change particle count
animate={{ y: [0, -100, -200] }}  // Adjust particle movement
```

### 2. Hero Section with Countdown
- **Dynamic Countdown**: Real-time to wedding date
- **Gradient Background**: Animated decorative elements
- **Responsive Typography**: Scales on different screen sizes

**Customization:**
```typescript
// In HeroSection.tsx
const weddingDate = new Date('2024-12-15')  // Change date

// Adjust countdown display
{[
  { label: 'Ngày', value: countdown.days },
  // Add/remove countdown units
]}
```

### 3. Love Story Timeline
- **Vertical Timeline**: Alternating left-right layout
- **Animated Dots**: Pulsing milestone markers
- **Fade-up Animation**: On scroll reveal

**Customization:**
```typescript
// In LoveStoryTimeline.tsx
const timelineEvents: TimelineEvent[] = [
  {
    year: '2018',
    title: 'Lần Đầu Gặp Nhau',
    description: 'Your story here',
    icon: '💫',
  },
  // Add more events
]
```

### 4. Photo Gallery
- **Masonry Layout**: Responsive grid
- **Lightbox Modal**: Full-screen image viewer
- **Touch Navigation**: Swipe on mobile
- **Lazy Loading**: Optimized performance

**Customization:**
```typescript
// In PhotoGallery.tsx
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: 'https://your-cdn.com/image.jpg',
    alt: 'Photo',
    title: 'Custom Title',
  },
]

// Adjust grid columns
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

### 5. Wedding Events
- **Two-Column Layout**: Ceremony and Reception
- **Glassmorphism Effect**: Modern frosted glass look
- **Icon Indicators**: Visual symbols for each event
- **Google Maps Integration**: Ready for map embeds

**Customization:**
```typescript
// In WeddingEventsInfo.tsx
// Events use environment variables from .env.local
NEXT_PUBLIC_CEREMONY_VENUE=
NEXT_PUBLIC_RECEPTION_VENUE=

// Or edit directly in component
<EventCard
  title="Lễ Thành Hôn"
  icon="⛪"
/>
```

### 6. Dress Code Section
- **Color Palette Display**: Visual color swatches
- **Color Names & Descriptions**: Helpful text
- **Hex Code Display**: Technical details for designers

**Customization:**
```typescript
// In DressCode.tsx
const dressCodeColors: DressCodeColor[] = [
  {
    name: 'Champagne Gold',
    hex: '#D4B483',
    description: 'Sang trọng và lịch lãm',
  },
  // Add/modify colors
]
```

### 7. Gift Information
- **Banking Details**: Account information cards
- **Copy to Clipboard**: Easy account copying
- **Download QR**: Prepare QR code functionality
- **Flip Card Effect**: Interactive design

**Customization:**
```typescript
// In GiftInformation.tsx
// Update from .env.local
NEXT_PUBLIC_GROOM_ACCOUNT_NUMBER=
NEXT_PUBLIC_BRIDE_ACCOUNT_NUMBER=

// Or edit bank cards directly
const bankAccounts: BankInfo[] = [...]
```

### 8. RSVP Form
- **Real-time Validation**: Zod schema validation
- **Error Messages**: User-friendly feedback
- **Confetti Animation**: Celebration on submit
- **Success Message**: Thank you display

**Customization:**
```typescript
// In RSVPForm.tsx
// Add/remove form fields in rsvpSchema (lib/validations.ts)
{
  fullName: z.string().min(2),
  phoneNumber: z.string().min(10),
  numberOfGuests: z.number().min(1),
  // Add more fields
}

// Change API endpoint
const response = await fetch('/api/rsvp', {
```

### 9. Guest Book
- **Message Display**: Guest messages with timestamps
- **Heart Animation**: Animated heart icons
- **Time Formatting**: "Just now", "2 hours ago" format
- **Link to RSVP**: CTA to submit message

**Customization:**
```typescript
// In GuestBook.tsx
const sampleMessages: GuestMessage[] = [
  {
    name: 'Guest Name',
    message: 'Your message here',
    timestamp: new Date(),
  },
]
```

## 🌍 Multi-language Support

To add Vietnamese (already included) or other languages:

### 1. Create Translation File
`src/lib/translations.ts`:
```typescript
const translations = {
  vi: {
    openInvitation: 'Mở Thiệp',
    guestBook: 'Sổ Lưu Bút',
    rsvp: 'RSVP',
  },
  en: {
    openInvitation: 'Open Invitation',
    guestBook: 'Guest Book',
    rsvp: 'RSVP',
  },
}
```

### 2. Use in Components
```tsx
<button>{t('openInvitation')}</button>
```

## 📱 Mobile Optimization

Key responsive breakpoints:
```css
sm: 640px   /* Mobile */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large Desktop */
```

Example:
```tsx
<div className="text-2xl md:text-4xl lg:text-6xl">
  Responsive text
</div>
```

## ⚡ Performance Tips

### Image Optimization
```tsx
import Image from 'next/image'

<Image
  src="photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  loading="lazy"  // Lazy load
  quality={75}    // Compress
/>
```

### Code Splitting
Next.js automatically splits code at route boundaries.

### Animation Performance
```tsx
// Use transform instead of position changes
whileHover={{ y: -5 }}  // Good - uses GPU
whileHover={{ top: -5 }} // Bad - reflow/repaint
```

### Debouncing Events
```tsx
const debouncedFunction = debounce(function, 300)
```

## 🔌 Extending Features

### Adding a New Section

1. Create component: `src/components/NewSection.tsx`
2. Add to main page: `src/app/page.tsx`
3. Style with Tailwind CSS
4. Add animations with Framer Motion

### Creating Custom Hooks

`src/hooks/useCustom.ts`:
```typescript
export function useCustom() {
  const [state, setState] = useState()
  
  useEffect(() => {
    // Hook logic
  }, [])
  
  return { state }
}
```

### Adding API Routes

`src/app/api/route.ts`:
```typescript
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const data = await req.json()
  // Handle request
  return NextResponse.json({ success: true })
}
```

## 🧪 Testing Components

Test animation:
```tsx
// Use Framer Motion testing utilities
import { render, screen } from '@testing-library/react'

test('animation triggers', () => {
  render(<Component />)
  // Check animation state
})
```

## 💾 Saving Customizations

After customizing:

1. **Commit to Git**: Save changes
2. **Document Changes**: Update this file
3. **Back up Database**: Export Supabase data
4. **Test Thoroughly**: Check all features work

## 📚 Resources for Developers

- **Framer Motion**: https://www.framer.com/motion/
- **GSAP**: https://greensock.com/gsap/
- **Tailwind CSS**: https://tailwindcss.com/
- **React**: https://react.dev/
- **Next.js**: https://nextjs.org/

---

**Happy customizing! 🎨✨**
