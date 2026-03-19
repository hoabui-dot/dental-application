# Component Creation Guide - Visual Walkthrough

This guide shows exactly what to click and fill in Strapi admin panel.

---

## 🎯 Overview

You need to create 4 components and 1 collection type in this order:

1. Service Item Component (used by Services)
2. Hero Component
3. Services Component (uses Service Item)
4. CTA Component
5. Page Collection Type (uses all components)

---

## 📦 Component 1: Service Item

### Step 1: Start Creating Component
- Click **"Content-Type Builder"** in left sidebar
- Click **"Create new component"** button

### Step 2: Component Info
- **Display name:** `service-item`
- **Category:** Select "Create new category" → Type `blocks`
- **Icon:** Choose any icon you like
- Click **"Continue"**

### Step 3: Add Fields

#### Field 1: Title
- Click **"Add another field"**
- Select **"Text"**
- **Name:** `title`
- Click **"Advanced Settings"** tab
- Check ✅ **"Required field"**
- Click **"Finish"**

#### Field 2: Description
- Click **"Add another field"**
- Select **"Text"**
- **Name:** `description`
- Click **"Advanced Settings"** tab
- Select **"Long text"** (textarea)
- Check ✅ **"Required field"**
- Click **"Finish"**

#### Field 3: Image
- Click **"Add another field"**
- Select **"Media"**
- **Name:** `image`
- **Type:** Single (select "Single media")
- **Allowed types:** Images only
- Click **"Finish"**

### Step 4: Save
- Click **"Save"** button (top right)
- Wait for server to restart (progress bar)
- ✅ Component created!

---

## 📦 Component 2: Hero

### Step 1: Start Creating Component
- Click **"Create new component"** button

### Step 2: Component Info
- **Display name:** `hero`
- **Category:** Select existing `blocks` category
- **Icon:** Choose any icon
- Click **"Continue"**

### Step 3: Add Fields

#### Field 1: Heading
- Click **"Add another field"**
- Select **"Text"**
- **Name:** `heading`
- Click **"Advanced Settings"** tab
- Check ✅ **"Required field"**
- Click **"Finish"**

#### Field 2: Subheading
- Click **"Add another field"**
- Select **"Text"**
- **Name:** `subheading`
- Click **"Advanced Settings"** tab
- Select **"Long text"** (textarea)
- Leave "Required field" unchecked
- Click **"Finish"**

#### Field 3: Image
- Click **"Add another field"**
- Select **"Media"**
- **Name:** `image`
- **Type:** Single
- **Allowed types:** Images only
- Leave "Required field" unchecked
- Click **"Finish"**

### Step 4: Save
- Click **"Save"** button
- Wait for restart
- ✅ Component created!

---

## 📦 Component 3: Services

### Step 1: Start Creating Component
- Click **"Create new component"** button

### Step 2: Component Info
- **Display name:** `services`
- **Category:** Select existing `blocks` category
- **Icon:** Choose any icon
- Click **"Continue"**

### Step 3: Add Fields

#### Field 1: Heading
- Click **"Add another field"**
- Select **"Text"**
- **Name:** `heading`
- Click **"Advanced Settings"** tab
- Check ✅ **"Required field"**
- Click **"Finish"**

#### Field 2: Items
- Click **"Add another field"**
- Select **"Component"**
- **Name:** `items`
- **Type:** Select **"Repeatable component"**
- **Select a component:** Choose `blocks.service-item`
- Click **"Finish"**

### Step 4: Save
- Click **"Save"** button
- Wait for restart
- ✅ Component created!

---

## 📦 Component 4: CTA

### Step 1: Start Creating Component
- Click **"Create new component"** button

### Step 2: Component Info
- **Display name:** `cta`
- **Category:** Select existing `blocks` category
- **Icon:** Choose any icon
- Click **"Continue"**

### Step 3: Add Fields

#### Field 1: Text
- Click **"Add another field"**
- Select **"Text"**
- **Name:** `text`
- Click **"Advanced Settings"** tab
- Check ✅ **"Required field"**
- Click **"Finish"**

#### Field 2: Button Label
- Click **"Add another field"**
- Select **"Text"**
- **Name:** `buttonLabel`
- Click **"Advanced Settings"** tab
- Check ✅ **"Required field"**
- Click **"Finish"**

#### Field 3: Link
- Click **"Add another field"**
- Select **"Text"**
- **Name:** `link`
- Click **"Advanced Settings"** tab
- Check ✅ **"Required field"**
- Click **"Finish"**

### Step 4: Save
- Click **"Save"** button
- Wait for restart
- ✅ Component created!

---

## 📄 Collection Type: Page

### Step 1: Start Creating Collection
- Click **"Create new collection type"** button

### Step 2: Collection Info
- **Display name:** `Page`
- **API ID (singular):** `page` (auto-filled)
- **API ID (plural):** `pages` (auto-filled)
- Click **"Continue"**

### Step 3: Add Fields

#### Field 1: Title
- Click **"Add another field"**
- Select **"Text"**
- **Name:** `title`
- Click **"Advanced Settings"** tab
- Check ✅ **"Required field"**
- Click **"Finish"**

#### Field 2: Slug
- Click **"Add another field"**
- Select **"UID"**
- **Name:** `slug`
- **Attached field:** Select `title`
- Click **"Advanced Settings"** tab
- Check ✅ **"Required field"**
- Click **"Finish"**

#### Field 3: Meta Title
- Click **"Add another field"**
- Select **"Text"**
- **Name:** `metaTitle`
- Leave "Required field" unchecked
- Click **"Finish"**

#### Field 4: Meta Description
- Click **"Add another field"**
- Select **"Text"**
- **Name:** `metaDescription`
- Click **"Advanced Settings"** tab
- Select **"Long text"** (textarea)
- Leave "Required field" unchecked
- Click **"Finish"**

#### Field 5: Layout (Dynamic Zone)
- Click **"Add another field"**
- Select **"Dynamic Zone"**
- **Name:** `layout`
- Click **"Add components to the zone"**
- Select all 3 components:
  - ✅ `blocks.hero`
  - ✅ `blocks.services`
  - ✅ `blocks.cta`
- Click **"Finish"**
- Click **"Advanced Settings"** tab
- Check ✅ **"Required field"**
- Click **"Finish"**

### Step 4: Save
- Click **"Save"** button
- Wait for restart
- ✅ Collection type created!

---

## 🔐 Configure Permissions

### Step 1: Go to Settings
- Click **"Settings"** in left sidebar (bottom)
- Click **"Roles"** under "USERS & PERMISSIONS PLUGIN"
- Click **"Public"** role

### Step 2: Enable Page Permissions
- Scroll down to **"Page"** section
- Check these boxes:
  - ✅ `find`
  - ✅ `findOne`
- Click **"Save"** button (top right)
- ✅ Permissions configured!

---

## 🔑 Generate API Token

### Step 1: Go to API Tokens
- Click **"Settings"** in left sidebar
- Click **"API Tokens"** under "GLOBAL SETTINGS"
- Click **"Create new API Token"** button

### Step 2: Configure Token
- **Name:** `Next.js Frontend`
- **Description:** (optional) `Token for Next.js application`
- **Token duration:** `Unlimited`
- **Token type:** `Full access`
- Click **"Save"** button

### Step 3: Copy Token
- **IMPORTANT:** Copy the token immediately (shown only once)
- Token looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0`

### Step 4: Add to .env.local
Open `.env.local` in your Next.js root directory and add:

```env
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=paste-your-token-here
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

✅ API token configured!

---

## ✅ Verification

After completing all steps, verify:

### 1. Check Components
- Go to **"Content-Type Builder"**
- Under **"COMPONENTS"** → **"blocks"**
- You should see:
  - ✅ cta
  - ✅ hero
  - ✅ service-item
  - ✅ services

### 2. Check Collection Type
- Under **"COLLECTION TYPES"**
- You should see:
  - ✅ Page

### 3. Test API
Open in browser or use curl:
```
http://localhost:1337/api/pages
```

Should return:
```json
{
  "data": [],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 0,
      "total": 0
    }
  }
}
```

✅ Everything is working!

---

## 🎉 Next Steps

Now you can:
1. Create your first page (see next section)
2. Implement query functions in Next.js
3. Test the full integration

See `STEP_3_IMPLEMENTATION.md` for next steps.
