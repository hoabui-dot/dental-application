# Production Deployment Checklist

## 🚀 PRE-DEPLOYMENT CHECKLIST

### 1. CODE REVIEW ✅
- [x] All code reviewed and approved
- [x] TypeScript errors resolved
- [x] No console.log statements (only console.error/warn/info)
- [x] No hardcoded secrets
- [x] No deprecated APIs used
- [x] Code follows best practices

### 2. TESTING ✅
- [x] Manual testing completed (90% pass rate)
- [x] Draft system tested
- [x] Preview system tested
- [x] Publish flow tested
- [x] Webhook revalidation tested
- [x] Cache strategy tested
- [x] Security tested
- [ ] Automated tests (recommended)
- [ ] Load testing (recommended)

### 3. SECURITY ✅
- [x] Secrets validated in all API routes
- [x] No public access to internal endpoints
- [x] HTTPS enforced (production)
- [ ] Rate limiting configured (recommended)
- [ ] IP whitelisting configured (optional)
- [x] Error messages don't expose sensitive data
- [x] Logging doesn't expose secrets

### 4. PERFORMANCE ✅
- [x] Caching optimized
- [x] On-demand revalidation implemented
- [x] No unnecessary API calls
- [x] Static generation for published pages
- [x] Webhook response time < 100ms
- [x] Page load time optimized

### 5. MONITORING 📊
- [ ] Error tracking configured (Sentry, etc.)
- [ ] Performance monitoring configured
- [ ] Webhook success rate monitoring
- [ ] Cache hit rate monitoring
- [ ] Alerts configured for failures

### 6. DOCUMENTATION ✅
- [x] Setup guides created
- [x] Testing guides created
- [x] Troubleshooting guides created
- [x] Architecture documented
- [x] API documentation complete
- [x] Team trained on system

---

## 🔧 ENVIRONMENT CONFIGURATION

### Next.js Environment Variables

**Production (.env.production):**
```bash
# Frontend Server
NEXT_PUBLIC_SERVER_URL=https://your-domain.com

# Strapi API
STRAPI_URL=https://cms.your-domain.com
STRAPI_API_TOKEN=<PRODUCTION_API_TOKEN>

# Preview Mode
NEXT_PREVIEW_SECRET=<STRONG_RANDOM_SECRET_32_CHARS>

# Webhook Revalidation
STRAPI_WEBHOOK_SECRET=<STRONG_RANDOM_SECRET_32_CHARS>
```

**Generate Strong Secrets:**
```bash
# Generate preview secret
openssl rand -base64 32

# Generate webhook secret
openssl rand -base64 32
```

**Checklist:**
- [ ] All environment variables set
- [ ] Secrets are strong (32+ characters)
- [ ] Secrets are different from development
- [ ] Secrets stored securely (not in git)
- [ ] STRAPI_URL points to production
- [ ] NEXT_PUBLIC_SERVER_URL is correct

---

## 🔗 STRAPI WEBHOOK CONFIGURATION

### Production Webhook Setup

1. **Open Strapi Admin:**
   ```
   https://cms.your-domain.com/admin
   ```

2. **Navigate to Webhooks:**
   ```
   Settings → Webhooks → Create new webhook
   ```

3. **Configure Webhook:**

   **Name:** `Next.js Production Revalidation`

   **URL:**
   ```
   https://your-domain.com/api/revalidate
   ```

   **Headers:**
   ```
   x-strapi-secret: <PRODUCTION_WEBHOOK_SECRET>
   ```

   **Events:** Select all:
   - ✅ Entry create
   - ✅ Entry update
   - ✅ Entry delete
   - ✅ Entry publish
   - ✅ Entry unpublish

   **Content Types:** Select all relevant:
   - ✅ Page
   - ✅ Article (if applicable)
   - ✅ Other content types

4. **Test Webhook:**
   - Click "Trigger" button
   - Check status: Should be 200 OK
   - Check response time: Should be < 100ms

**Checklist:**
- [ ] Webhook created in production Strapi
- [ ] URL points to production domain (HTTPS)
- [ ] Secret matches STRAPI_WEBHOOK_SECRET
- [ ] All events selected
- [ ] All content types selected
- [ ] Webhook tested successfully
- [ ] Response time < 100ms

---

## 🌐 DNS & SSL CONFIGURATION

### Domain Setup
- [ ] Domain configured (your-domain.com)
- [ ] CMS subdomain configured (cms.your-domain.com)
- [ ] SSL certificates installed
- [ ] HTTPS enforced
- [ ] HTTP redirects to HTTPS
- [ ] DNS propagated

### SSL/TLS
- [ ] Valid SSL certificate
- [ ] Certificate auto-renewal configured
- [ ] TLS 1.2+ enforced
- [ ] HSTS header configured

---

## 📦 DEPLOYMENT STEPS

### Step 1: Deploy Strapi (CMS)

```bash
# 1. Build Strapi
cd strapi-cms
npm run build

# 2. Set environment variables
export NODE_ENV=production
export DATABASE_URL=<production-database-url>
export STRAPI_ADMIN_JWT_SECRET=<secret>
export STRAPI_API_TOKEN_SALT=<secret>
export STRAPI_TRANSFER_TOKEN_SALT=<secret>

# 3. Start Strapi
npm run start
```

**Checklist:**
- [ ] Strapi deployed
- [ ] Database connected
- [ ] Admin accessible
- [ ] API accessible
- [ ] Webhooks configured

---

### Step 2: Deploy Next.js (Frontend)

```bash
# 1. Build Next.js
cd dental-frontend
npm run build

# 2. Set environment variables (see above)

# 3. Start Next.js
npm run start
```

**Checklist:**
- [ ] Next.js deployed
- [ ] Environment variables set
- [ ] Build successful
- [ ] Server running
- [ ] Health check passing

---

### Step 3: Verify Deployment

**Test Checklist:**
- [ ] Homepage loads
- [ ] Published pages load
- [ ] Preview mode works
- [ ] Webhook triggers successfully
- [ ] Cache invalidation works
- [ ] Content updates appear immediately
- [ ] No errors in logs

---

## 🧪 POST-DEPLOYMENT TESTING

### Critical Path Testing

1. **Test Published Content:**
   ```
   Visit: https://your-domain.com/your-page
   Expected: Page loads, content visible
   ```

2. **Test Preview Mode:**
   ```
   Visit: https://your-domain.com/api/preview?slug=your-page&secret=<secret>
   Expected: Redirects, preview banner, draft content visible
   ```

3. **Test Content Update:**
   ```
   1. Update content in Strapi
   2. Publish
   3. Wait 1 second
   4. Refresh page
   Expected: Updated content visible immediately
   ```

4. **Test Webhook:**
   ```
   1. Check Strapi webhook logs
   2. Verify 200 OK status
   3. Check Next.js logs
   4. Verify revalidation completed
   ```

**Checklist:**
- [ ] Published content accessible
- [ ] Preview mode working
- [ ] Content updates immediate
- [ ] Webhook functioning
- [ ] No errors in logs

---

## 📊 MONITORING SETUP

### Metrics to Monitor

**Application Metrics:**
- [ ] Response time (< 200ms)
- [ ] Error rate (< 1%)
- [ ] Uptime (> 99.9%)
- [ ] Cache hit rate (> 80%)

**Webhook Metrics:**
- [ ] Webhook success rate (> 99%)
- [ ] Webhook response time (< 100ms)
- [ ] Failed webhooks count
- [ ] Revalidation time

**Business Metrics:**
- [ ] Content update frequency
- [ ] Preview usage
- [ ] Page views
- [ ] User engagement

### Alerts to Configure

**Critical Alerts:**
- [ ] Server down
- [ ] High error rate (> 5%)
- [ ] Webhook failures (> 10%)
- [ ] Database connection lost

**Warning Alerts:**
- [ ] Slow response time (> 500ms)
- [ ] High memory usage (> 80%)
- [ ] High CPU usage (> 80%)
- [ ] Cache hit rate low (< 50%)

---

## 🔄 ROLLBACK PLAN

### If Deployment Fails

1. **Immediate Actions:**
   - [ ] Stop new deployment
   - [ ] Check error logs
   - [ ] Identify issue

2. **Rollback Steps:**
   ```bash
   # Rollback to previous version
   git revert <commit-hash>
   npm run build
   npm run start
   ```

3. **Verify Rollback:**
   - [ ] Previous version running
   - [ ] Site accessible
   - [ ] No errors

4. **Post-Rollback:**
   - [ ] Document issue
   - [ ] Fix in development
   - [ ] Test thoroughly
   - [ ] Redeploy

---

## 📝 POST-DEPLOYMENT CHECKLIST

### Immediate (Within 1 Hour)
- [ ] All critical paths tested
- [ ] No errors in logs
- [ ] Monitoring active
- [ ] Team notified

### Short-term (Within 24 Hours)
- [ ] Performance metrics reviewed
- [ ] Webhook success rate checked
- [ ] Cache hit rate verified
- [ ] User feedback collected

### Long-term (Within 1 Week)
- [ ] Full system audit
- [ ] Performance optimization
- [ ] Documentation updated
- [ ] Team retrospective

---

## 🎯 SUCCESS CRITERIA

### Technical Criteria
- ✅ All tests passing
- ✅ No critical errors
- ✅ Response time < 200ms
- ✅ Uptime > 99.9%
- ✅ Webhook success rate > 99%

### Business Criteria
- ✅ Content updates immediate (< 1s)
- ✅ Editors can preview drafts
- ✅ Published content accessible
- ✅ No downtime during deployment

### User Experience
- ✅ Fast page loads
- ✅ No stale content
- ✅ Smooth preview experience
- ✅ No errors visible to users

---

## 🚨 EMERGENCY CONTACTS

### Team Contacts
- **DevOps Lead**: [Contact]
- **Backend Lead**: [Contact]
- **Frontend Lead**: [Contact]
- **On-Call Engineer**: [Contact]

### Service Providers
- **Hosting Provider**: [Contact]
- **DNS Provider**: [Contact]
- **SSL Provider**: [Contact]

---

## ✅ FINAL SIGN-OFF

### Deployment Approval

**Approved By:**
- [ ] Technical Lead
- [ ] Product Manager
- [ ] DevOps Lead
- [ ] QA Lead

**Deployment Date**: _______________  
**Deployment Time**: _______________  
**Deployed By**: _______________

**Status**: ⬜ PENDING / ✅ APPROVED / ❌ REJECTED

---

## 📚 RELATED DOCUMENTATION

- `CONTENT_LIFECYCLE_AUDIT.md` - Complete audit report
- `CONTENT_LIFECYCLE_TESTING_GUIDE.md` - Testing procedures
- `ON_DEMAND_REVALIDATION_GUIDE.md` - Revalidation guide
- `WEBHOOK_QUICK_SETUP.md` - Quick setup guide

---

**DEPLOYMENT STATUS**: ⬜ READY FOR PRODUCTION

**Next Steps**: Complete checklist and deploy!
