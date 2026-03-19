# Strapi Setup Guide - Quick Reference

## 🚀 Quick Start

### 1. Install & Start Strapi
```bash
cd strapi-cms
npm install
npm run develop
```

Access: http://localhost:1337/admin

### 2. Create Admin User
- Email: admin@example.com
- Password: (your choice)

---

## 📦 Content Types Setup (Step-by-Step)

### Order of Creation
1. Service Item Component (used by Services)
2. Hero Component
3. Services Component (uses Service Item)
4. CTA Component
5. Page Collection Type (uses all components)

---

## 🔧 Component Configurations

### 1. Service Item Component
```
Category: blocks
Name: service-item
Icon: (any)

Fields:
├── title (Text)
│   └── Required: Yes
├── description (Text)
│   ├── Type: Long text
│   └── Required: Yes
└── image (Media)
    ├── Type: Single
    └── Allowed types: Images
```

### 2. Hero Component
```
Category: blocks
Name: hero
Icon: (any)

Fields:
├── heading (Text)
│   └── Required: Yes
├── subheading (Text)
│   └── Type: Long text
└── image (Media)
    ├── Type: Single
    └── Allowed types: Images
```

### 3. Services Component
```
Category: blocks
Name: services
Icon: (any)

Fields:
├── heading (Text)
│   └── Required: Yes
└── items (Component)
    ├── Type: Repeatable
    └── Component: blocks.service-item
```

### 4. CTA Component
```
Category: blocks
Name: cta
Icon: (any)

Fields:
├── text (Text)
│   └── Required: Yes
├── buttonLabel (Text)
│   └── Required: Yes
└── link (Text)
    └── Required: Yes
```

### 5. Page Collection Type
```
Display name: Page
Singular: page
Plural: pages

Fields:
├── title (Text)
│   └── Required: Yes
├── slug (UID)
│   ├── Required: Yes
│   └── Attached field: title
├── metaTitle (Text)
├── metaDescription (Text)
│   └── Type: Long text
└── layout (Dynamic Zone)
    ├── Required: Yes
    └── Components:
        ├── blocks.hero
        ├── blocks.services
        └── blocks.cta
```

---

## 🔐 Permissions Setup

### Public Role
Settings → Roles → Public → Permissions

**Page:**
- ✅ find
- ✅ findOne

**Upload:**
- ✅ find
- ✅ findOne

### Authenticated Role
Settings → Roles → Authenticated → Permissions

**Page:**
- ✅ find
- ✅ findOne
- ✅ create
- ✅ update
- ✅ delete

---

## 🔑 API Token Setup

### Generate Token
1. Settings → API Tokens
2. Click "Create new API Token"
3. Name: `Next.js Frontend`
4. Token type: `Full access`
5. Token duration: `Unlimited`
6. Click "Save"
7. **Copy the token immediately** (shown only once)

### Add to Environment
Create/update `.env.local` in Next.js root:
```env
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-token-here
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

---

## 📝 Create Test Page

### Example: Home Page
1. Content Manager → Page → Create new entry

**Basic Info:**
- Title: `Home`
- Slug: `home` (auto-generated)
- Meta Title: `Welcome to Our Dental Clinic`
- Meta Description: `Professional dental care services for the whole family`

**Layout:**

**Block 1: Hero**
- Heading: `Welcome to Our Dental Clinic`
- Subheading: `Professional care for your smile with state-of-the-art technology`
- Image: (upload hero image)

**Block 2: Services**
- Heading: `Our Services`
- Items:
  - Item 1:
    - Title: `Dental Implants`
    - Description: `Permanent solution for missing teeth`
    - Image: (upload)
  - Item 2:
    - Title: `Teeth Whitening`
    - Description: `Brighten your smile safely`
    - Image: (upload)
  - Item 3:
    - Title: `Orthodontics`
    - Description: `Straighten teeth with modern braces`
    - Image: (upload)

**Block 3: CTA**
- Text: `Ready to Transform Your Smile?`
- Button Label: `Book Appointment`
- Link: `/contact`

2. Click "Save"
3. Click "Publish"

---

## 🧪 Test API

### Test Endpoints

**Get all pages:**
```bash
curl http://localhost:1337/api/pages?populate=deep
```

**Get page by slug:**
```bash
curl http://localhost:1337/api/pages?filters[slug][$eq]=home&populate=deep
```

**With authentication:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:1337/api/pages?populate=deep
```

---

## 🐛 Troubleshooting

### Strapi won't start
```bash
cd strapi-cms
rm -rf node_modules package-lock.json
npm install
npm run develop
```

### Database connection error
Check `strapi-cms/.env`:
```env
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=dental_cms_strapi
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
```

### Components not showing in Dynamic Zone
1. Make sure components are saved
2. Refresh browser
3. Clear Strapi cache: `npm run strapi build --clean`

### API returns empty data
1. Check permissions (Public role)
2. Make sure content is published
3. Use `populate=deep` in query

---

## ✅ Verification

After setup, verify:
1. ✅ Strapi admin accessible at http://localhost:1337/admin
2. ✅ All 4 components created
3. ✅ Page collection type created
4. ✅ Public permissions enabled
5. ✅ Test page created and published
6. ✅ API token generated
7. ✅ API returns data: http://localhost:1337/api/pages?populate=deep

---

## 📚 Next Steps

Once Strapi is fully configured:
1. Update `src/lib/strapi/queries.ts` with real implementations
2. Test Next.js frontend: `npm run dev`
3. Visit http://localhost:3000
4. Verify pages load from Strapi

See `STEP_2_COMPLETE.md` for detailed next steps.
