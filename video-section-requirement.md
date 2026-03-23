You are a senior fullstack engineer (Next.js + Strapi + PostgreSQL) and UI/UX designer.

Your task is to:

1. ADD a new **Video Hero Section** ABOVE the current Hero section
2. CLEAN UP and REMOVE the previously implemented **AnimatedHero3D section (Spline-based)**
3. REMOVE all unused dependencies related to 3D animation
4. Ensure everything follows **DATA-FIRST architecture**

---

# ⚠️ CRITICAL WORKFLOW (STRICT)

You MUST follow this order:

## STEP 1 — AUDIT CURRENT SYSTEM

* Check if AnimatedHero3D section exists in:

  * Strapi components
  * Homepage Dynamic Zone
  * Frontend components
* Identify:

  * splineUrl usage
  * Spline packages (e.g. @splinetool/react-spline)

---

## STEP 2 — CLEANUP (MANDATORY)

### REMOVE:

1. Strapi:

   * AnimatedHero3DSection component (or mark deprecated)

2. Homepage:

   * Remove this section from Dynamic Zone

3. Frontend:

   * Delete component:
     /components/homepage/animated-hero-3d/

4. Dependencies:

   * Remove:

     * @splinetool/react-spline
     * any 3D-related packages

---

## STEP 3 — CREATE NEW CMS COMPONENT

Create:

```id="component"
VideoHeroSection
```

---

## FIELDS:

* videoUrl (string, required)
* posterImage (media, optional)
* overlayOpacity (number, default: 0.4)
* title (string)
* subtitle (text)
* ctaText (string)
* ctaLink (string)
* isActive (boolean)

---

## STEP 4 — MIGRATION SCRIPT

Create script:

```id="script"
005-add-video-hero-section.ts
```

Location:

```id="folder"
migration_scripts/
```

---

## SCRIPT MUST:

* Be idempotent
* Remove AnimatedHero3D section from homepage
* Insert VideoHeroSection as FIRST block
* Preserve existing Hero section (push it down)
* Insert default data:

```id="data"
videoUrl: "https://your-video-url.mp4"
title: "Công nghệ nha khoa chuẩn quốc tế"
subtitle: "Giải pháp nha khoa hiện đại với công nghệ tiên tiến"
ctaText: "Đặt lịch ngay"
ctaLink: "/booking"
overlayOpacity: 0.4
isActive: true
```

---

## STEP 5 — RUN & VERIFY

You MUST:

* Run migration
* Verify in DB:

  * AnimatedHero3D removed
  * VideoHeroSection exists
  * Positioned FIRST

Then confirm:

```id="status"
STATUS: DONE
```

🚫 DO NOT proceed to frontend before DONE

---

# 🎨 DESIGN REQUIREMENTS (2026)

## STYLE:

* Premium dental / medical
* Clean, bright, high-end
* Inspired by Apple / Stripe

---

## COLOR:

* Primary: Sky Blue (#38BDF8)
* Text: white
* Accent: soft glow blue

---

# 🎬 VIDEO HERO DESIGN

## STRUCTURE:

```id="layout"
[ Fullscreen Video Background ]
[ Dark Overlay ]
[ Content Overlay (left/center) ]
```

---

## VIDEO:

* autoplay
* muted
* loop
* object-cover
* high quality but optimized

---

## OVERLAY:

* rgba(0,0,0, overlayOpacity)
* ensures readability

---

## CONTENT:

Title:

* text-5xl+
* bold
* white

Subtitle:

* text-white/80

CTA:

* sky blue button
* rounded-xl
* glow + hover scale

---

# ⚙️ FRONTEND IMPLEMENTATION (Next.js)

Create:

```id="path"
/components/homepage/video-hero/
```

---

## REQUIREMENTS:

* Fetch data from Strapi
* No hardcoded content
* Responsive
* Optimized rendering

---

## VIDEO CODE:

```tsx id="code"
<video
  autoPlay
  muted
  loop
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src={data.videoUrl} type="video/mp4" />
</video>
```

---

## OVERLAY:

```tsx id="overlay"
<div className="absolute inset-0 bg-black/40" />
```

---

# 🧩 DYNAMIC ZONE UPDATE

* Add mapping:

```id="mapping"
"video-hero-section" → VideoHero
```

* Ensure order:

  1. VideoHeroSection
  2. Existing HeroSection

---

# ⚡ PERFORMANCE

* Use compressed video
* Add poster fallback
* Lazy load if needed

---

# 🧪 OUTPUT REQUIREMENTS

You MUST provide:

1. Cleanup summary (what removed)
2. Strapi schema
3. Migration script (005)
4. Verification steps
5. Next.js component
6. Updated DynamicZoneRenderer

---

# 🚀 FINAL RESULT

* Clean, modern video hero section
* No 3D or unused code
* CMS-driven
* High conversion, premium look

---

# 🔥 IMPORTANT

* REMOVE all Spline traces completely
* DO NOT leave dead code
* DO NOT hardcode content
* Follow data-first strictly

---

Think like a system architect and product designer.
