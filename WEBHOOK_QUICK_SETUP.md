# Webhook Quick Setup Guide

## 🚀 5-Minute Setup

### Step 1: Add Environment Variable (1 min)

Add to `dental-frontend/.env.local`:

```bash
STRAPI_WEBHOOK_SECRET=my-super-secret-webhook-key-12345
```

### Step 2: Restart Next.js (1 min)

```bash
cd dental-frontend
npm run dev
```

### Step 3: Configure Strapi Webhook (3 min)

1. Open Strapi Admin: `http://localhost:1337/admin`

2. Go to: **Settings → Webhooks → Create new webhook**

3. Fill in:
   - **Name**: `Next.js Revalidation`
   - **URL**: `http://localhost:3000/api/revalidate`
   - **Headers**: 
     ```
     x-strapi-secret: my-super-secret-webhook-key-12345
     ```
   - **Events**: Check all:
     - Entry create
     - Entry update
     - Entry delete
     - Entry publish
     - Entry unpublish

4. Click **Save**

### Step 4: Test (1 min)

1. Edit any page in Strapi
2. Click Save or Publish
3. Check Next.js console:
   ```
   [Revalidate API] Webhook received
   [Revalidate API] Revalidation completed
   ```
4. Visit the page - should show updated content immediately!

---

## ✅ Done!

Content updates now reflect immediately in Next.js.

No more waiting 60 seconds!

---

## 🔍 Troubleshooting

**Webhook not working?**

1. Check secret matches in both places
2. Restart Next.js after adding env variable
3. Check Strapi webhook logs (Settings → Webhooks → Triggered tab)
4. Check Next.js console for errors

**Still not working?**

See full guide: `ON_DEMAND_REVALIDATION_GUIDE.md`
