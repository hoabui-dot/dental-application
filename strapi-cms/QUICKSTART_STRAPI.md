# Strapi Quick Start Guide

**Goal:** Get Strapi running with content types in 15 minutes

---

## 🚀 Step 1: Install & Start (2 minutes)

```bash
cd strapi-cms
npm install
npm run develop
```

✅ Browser opens to http://localhost:1337/admin

---

## 👤 Step 2: Create Admin User (1 minute)

Fill in the form:
- Email: admin@example.com
- Password: (your choice)

✅ Logged into Strapi admin panel

---

## 📦 Step 3: Create Components (8 minutes)

### A. Service Item Component (2 min)
```
Content-Type Builder → Create new component
├── Category: blocks
├── Name: service-item
└── Fields:
    ├── title (Text, required)
    ├── description (Text, long text, required)
    └── image (Media, single image)
```
**Save** → Wait for restart

### B. Hero Component (2 min)
```
Create new component
├── Category: blocks
├── Name: hero
└── Fields:
    ├── heading (Text, required)
    ├── subheading (Text, long text)
    └── image (Media, single image)
```
**Save** → Wait for restart

### C. Services Component (2 min)
```
Create new component
├── Category: blocks
├── Name: services
└── Fields:
    ├── heading (Text, required)
    └── items (Component, repeatable, blocks.service-item)
```
**Save** → Wait for restart

### D. CTA Component (2 min)
```
Create new component
├── Category: blocks
├── Name: cta
└── Fields:
    ├── text (Text, required)
    ├── buttonLabel (Text, required)
    └── link (Text, required)
```
**Save** → Wait for restart

---

## 📄 Step 4: Create Page Collection (2 minutes)

```
Create new collection type
├── Display name: Page
└── Fields:
    ├── title (Text, required)
    ├── slug (UID, attached to title, required)
    ├── metaTitle (Text)
    ├── metaDescription (Text, long text)
    └── layout (Dynamic Zone, required)
        ├── blocks.hero
        ├── blocks.services
        └── blocks.cta
```
**Save** → Wait for restart

---

## 🔐 Step 5: Configure Permissions (1 minute)

```
Settings → Roles → Public
└── Page:
    ├── ✅ find
    └── ✅ findOne
```
**Save**

---

## 🔑 Step 6: Generate API Token (1 minute)

```
Settings → API Tokens → Create new API Token
├── Name: Next.js Frontend
├── Type: Full access
└── Duration: Unlimited
```
**Save** → **COPY TOKEN**

Add to `.env.local`:
```env
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=paste-token-here
```

---

## ✅ Done!

Test API:
```bash
curl http://localhost:1337/api/pages?populate=deep
```

---

## 📝 Optional: Create Test Page

```
Content Manager → Page → Create new entry
├── Title: Home
├── Slug: home
├── Meta Title: Welcome
├── Meta Description: Welcome to our site
└── Layout:
    ├── Hero:
    │   ├── Heading: Welcome
    │   └── Subheading: Professional care
    ├── Services:
    │   ├── Heading: Our Services
    │   └── Items:
    │       ├── Dental Implants
    │       ├── Teeth Whitening
    │       └── Orthodontics
    └── CTA:
        ├── Text: Ready to Transform Your Smile?
        ├── Button: Book Appointment
        └── Link: /contact
```
**Save** → **Publish**

---

## 🎉 Next Steps

1. Strapi is running ✅
2. Content types created ✅
3. API token configured ✅
4. Ready for Step 3: Implement query functions

See `STEP_2_COMPLETE.md` for next steps.
