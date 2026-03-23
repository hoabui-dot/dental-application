# Add Video Hero Section

## ✅ Cleanup Complete

- ✅ Spline dependencies removed (@splinetool/react-spline, @splinetool/runtime)
- ✅ Video Hero component created in Strapi
- ✅ Frontend component ready (VideoHero.tsx)
- ✅ Query updated to use homepage.video-hero
- ✅ Types updated

## 🚀 Add to Homepage (2 minutes)

### 1. Open Strapi Admin
http://localhost:1337/admin

### 2. Edit Homepage
- Click "Content Manager" (left sidebar)
- Click "Homepage" under "Single Types"
- Click "Edit" button

### 3. Add Video Hero Component
- Scroll to "Layout" section
- Click "Add a component to layout"
- Select **"Video Hero Section"**

### 4. Fill in Fields
- **Title**: `Công nghệ nha khoa chuẩn quốc tế`
- **Subtitle**: `Trải nghiệm điều trị hiện đại với công nghệ tiên tiến nhất. Chúng tôi mang đến giải pháp nha khoa toàn diện với thiết bị 3D scanning, in 3D và hệ thống CAD/CAM tiên tiến.`
- **CTA Text**: `Đặt lịch ngay`
- **CTA Link**: `/booking`
- **Video URL**: `https://assets.mixkit.co/videos/preview/mixkit-dentist-examining-a-patient-4235-large.mp4`
- **Overlay Opacity**: `0.4`
- **Is Active**: ✅ Check this

### 5. Move to Top
- Drag the Video Hero section to the **first position** (top of layout)
- The existing Hero section will be pushed down to second position

### 6. Save & Publish
- Click "Save" (top right)
- Click "Publish"

### 7. View Result
Open: http://localhost:3000

You should see the fullscreen video hero!

## 🎨 Customize

### Change Video
Replace the Video URL with your own dental clinic video (MP4, < 10MB)

### Adjust Overlay
- `0.3` = Lighter (brighter video)
- `0.4` = Balanced (recommended)
- `0.5` = Darker (better text contrast)

### Add Poster Image
Upload a fallback image that shows while video loads

---

## ✅ Implementation Complete

### What Was Done:
1. ✅ Removed Spline dependencies
2. ✅ Created video-hero component in Strapi
3. ✅ Created VideoHero.tsx frontend component
4. ✅ Updated queries to use homepage.video-hero
5. ✅ Updated TypeScript types
6. ✅ Updated BlockRenderer mapping
7. ✅ Cleaned up old AnimatedHero3D files

### Architecture:
- **Layer 1**: Fullscreen background video
- **Layer 2**: Dark overlay (controlled opacity)
- **Layer 3**: Content (left-aligned, white text)

### Design:
- Premium 2026 aesthetic (Apple/Stripe style)
- Sky Blue (#38BDF8) branding
- Clean, medical-grade design
- Mobile responsive
- Optimized performance
