# Migration Steps for Animated Hero 3D

## Issue Found
The migration failed because Strapi hasn't loaded the new component schema yet.

## Solution: Follow These Steps

### Step 1: Restart Strapi (REQUIRED)
```bash
cd strapi-cms
# Stop Strapi (Ctrl+C if running)
npm run develop
```

**Why?** Strapi needs to restart to load the new component schema file:
- `strapi-cms/src/components/homepage/animated-hero-3d.json`

**Wait for:** Strapi to fully start and show "Server started"

---

### Step 2: Run Migration
```bash
# In a new terminal, from project root
export STRAPI_API_TOKEN=458d01687d26926037df2eb652aa1f70423a61d196e584c495074024acfe66ebfea18695ba6d9ce4c728c2a59be3c2db3987e7c01900072559dea22b1a1ace283f3fce7e613d74ac33d67eea5b73dfc30e9d2b3e2a821d09984ff064d64f6a81b3b8daf69f578cbfac1e863774283be6d597e11f798beebf4d3cd2823de12377

node migration_scripts/003-add-animated-hero-3d.js
```

**Expected Output:**
```
🚀 Adding Animated Hero 3D Section to Homepage...
✓ Homepage found (ID: 14)
✓ Current layout blocks: 10
📝 Animated Hero 3D section not found. Adding it...
💾 Updating homepage...
✓ Homepage updated successfully!
🔍 Verifying update...
✓ Animated Hero 3D section verified in database
✅ MIGRATION COMPLETED SUCCESSFULLY
```

---

### Step 3: Verify Migration
```bash
node check-migration-status.js
```

**Should Show:**
```
1. homepage.animated-hero-3d  ← NEW
2. homepage.hero
3. homepage.trust
...
Animated Hero 3D: ✓ EXISTS
```

---

### Step 4: Publish in Strapi Admin
1. Go to: http://localhost:1337/admin
2. Navigate to: Content Manager → Homepage
3. You should see "Animated Hero 3D" as the first block
4. Click "Publish" button

---

### Step 5: Test Frontend
```bash
cd dental-frontend
npm run dev
```

Open: http://localhost:3001

**Should See:**
- 3D animated section FIRST
- Title: "Công nghệ nha khoa chuẩn quốc tế"
- Spline 3D scene
- Regular Hero section SECOND

---

## Quick Commands

```bash
# 1. Restart Strapi
cd strapi-cms && npm run develop

# 2. In new terminal - Run migration
export STRAPI_API_TOKEN=458d01687d26926037df2eb652aa1f70423a61d196e584c495074024acfe66ebfea18695ba6d9ce4c728c2a59be3c2db3987e7c01900072559dea22b1a1ace283f3fce7e613d74ac33d67eea5b73dfc30e9d2b3e2a821d09984ff064d64f6a81b3b8daf69f578cbfac1e863774283be6d597e11f798beebf4d3cd2823de12377
node migration_scripts/003-add-animated-hero-3d.js

# 3. Verify
node check-migration-status.js

# 4. Publish in admin
# Go to: http://localhost:1337/admin

# 5. Test frontend
cd dental-frontend && npm run dev
# Open: http://localhost:3001
```

---

## Troubleshooting

### Error: "components in layout are not related to the entity"
**Cause:** Strapi hasn't loaded the new component schema
**Solution:** Restart Strapi (Step 1)

### Error: "STRAPI_API_TOKEN not set"
**Solution:** 
```bash
export STRAPI_API_TOKEN=458d01687d26926037df2eb652aa1f70423a61d196e584c495074024acfe66ebfea18695ba6d9ce4c728c2a59be3c2db3987e7c01900072559dea22b1a1ace283f3fce7e613d74ac33d67eea5b73dfc30e9d2b3e2a821d09984ff064d64f6a81b3b8daf69f578cbfac1e863774283be6d597e11f798beebf4d3cd2823de12377
```

### Migration says "already exists"
**Good!** Migration is idempotent. Section already added.

### Frontend not showing section
1. Check migration ran: `node check-migration-status.js`
2. Check published in Strapi admin
3. Hard refresh browser: `Ctrl+Shift+R`
4. Check console for errors (F12)

---

**Current Status:** Waiting for Strapi restart
**Next Step:** Restart Strapi, then run migration
