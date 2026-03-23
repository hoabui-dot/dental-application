# Revalidate API Route Update

## Changes Made

Updated `dental-frontend/src/app/api/revalidate/route.ts` with improved webhook handling.

## Key Improvements

### 1. Enhanced Model Name Extraction

Added `extractModelName()` function that handles multiple Strapi payload formats:

```typescript
function extractModelName(payload: WebhookPayload): string | null {
  // Try direct model field
  if (payload.model) {
    // Extract from "api::page.page" format
    const match = payload.model.match(/api::([^.]+)\./);
    return match ? match[1] : payload.model;
  }

  // Try to extract from event name
  if (payload.event) {
    const eventParts = payload.event.split(".");
    if (eventParts.length > 0) {
      return eventParts[0];
    }
  }

  // Check if entry has __type field
  if (payload.entry && typeof payload.entry === "object") {
    const entry = payload.entry as Record<string, unknown>;
    if (entry.__type) {
      return String(entry.__type);
    }
  }

  return null;
}
```

### 2. Flexible Payload Interface

Updated interface to support different Strapi versions:

```typescript
interface WebhookPayload {
  event: string;
  model?: string;  // Now optional
  entry?: {
    id: number;
    slug?: string;
    [key: string]: unknown;
  };
  // Strapi v4 payload structure
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;  // Allow additional fields
}
```

### 3. Fallback Revalidation

If model cannot be determined, revalidate common paths:

```typescript
if (!modelName) {
  console.warn(
    "[Revalidate API] Could not determine model, revalidating all",
  );

  const commonPaths = ["/"];
  for (const path of commonPaths) {
    try {
      revalidatePath(path);
      console.log(`[Revalidate API] Revalidated path: ${path}`);
    } catch (error) {
      console.error(
        `[Revalidate API] Error revalidating path ${path}:`,
        error,
      );
    }
  }

  return NextResponse.json({
    revalidated: true,
    paths: commonPaths,
    note: "Model could not be determined, revalidated common paths",
    timestamp: new Date().toISOString(),
  });
}
```

### 4. Enhanced Logging

Added full payload logging for debugging:

```typescript
// Log the full payload for debugging
console.log(
  "[Revalidate API] Full webhook payload:",
  JSON.stringify(payload, null, 2),
);

// Log extracted model name
console.log("[Revalidate API] Webhook received:", {
  event: payload.event,
  model: payload.model,
  extractedModel: modelName,  // Shows what was extracted
  entryId: payload.entry?.id,
  slug: payload.entry?.slug,
  timestamp: new Date().toISOString(),
});
```

## Supported Payload Formats

### Format 1: Strapi v5 (Full API format)
```json
{
  "event": "entry.publish",
  "model": "api::page.page",
  "entry": {
    "id": 1,
    "slug": "about"
  }
}
```

### Format 2: Strapi v5 (Simple format)
```json
{
  "event": "entry.publish",
  "model": "page",
  "entry": {
    "id": 1,
    "slug": "about"
  }
}
```

### Format 3: Event-based (fallback)
```json
{
  "event": "page.create",
  "entry": {
    "id": 1,
    "slug": "about"
  }
}
```

### Format 4: Entry with type
```json
{
  "event": "entry.publish",
  "entry": {
    "id": 1,
    "slug": "about",
    "__type": "page"
  }
}
```

## Model to Tag Mapping

```typescript
const MODEL_TAG_MAP: Record<string, string[]> = {
  page: ["pages", "page"],
  article: ["articles", "article"],
  "bai-viet": ["articles", "bai-viet"],
  category: ["categories", "category"],
  navigation: ["navigation"],
  footer: ["footer"],
  homepage: ["homepage"],
};
```

## Model to Path Mapping

```typescript
const MODEL_PATH_MAP: Record<string, string[]> = {
  page: ["/"],
  article: ["/"],
  "bai-viet": ["/"],
};
```

## Response Format

### Success Response
```json
{
  "revalidated": true,
  "tags": ["homepage"],
  "paths": ["/"],
  "model": "homepage",
  "event": "entry.publish",
  "entryId": 1,
  "slug": null,
  "executionTime": "15ms",
  "timestamp": "2026-03-23T12:00:00.000Z"
}
```

### Fallback Response (model unknown)
```json
{
  "revalidated": true,
  "paths": ["/"],
  "note": "Model could not be determined, revalidated common paths",
  "timestamp": "2026-03-23T12:00:00.000Z"
}
```

### Error Response
```json
{
  "error": "Unauthorized"
}
```

## Testing

### Test with curl:

```bash
# Test with valid secret
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-strapi-secret: your-webhook-secret" \
  -d '{
    "event": "entry.publish",
    "model": "api::homepage.homepage",
    "entry": {
      "id": 1
    }
  }'

# Test with invalid secret
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-strapi-secret: wrong-secret" \
  -d '{
    "event": "entry.publish",
    "model": "homepage"
  }'

# Test with unknown model
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-strapi-secret: your-webhook-secret" \
  -d '{
    "event": "entry.publish"
  }'
```

## Strapi Webhook Configuration

In Strapi admin panel:

1. Go to Settings > Webhooks
2. Create new webhook
3. Set URL: `https://your-domain.com/api/revalidate`
4. Add header: `x-strapi-secret: your-webhook-secret`
5. Select events:
   - Entry create
   - Entry update
   - Entry delete
   - Entry publish
   - Entry unpublish

## Environment Variables

Make sure these are set:

```bash
# .env or .env.local
STRAPI_WEBHOOK_SECRET=your-secure-webhook-secret-here
```

## Benefits

1. **Robust**: Handles multiple payload formats
2. **Flexible**: Works with different Strapi versions
3. **Debuggable**: Comprehensive logging
4. **Resilient**: Fallback revalidation if model unknown
5. **Secure**: Validates webhook secret
6. **Fast**: Efficient cache invalidation

## Monitoring

Check logs for revalidation activity:

```bash
# Docker logs
docker logs dental-frontend | grep "Revalidate API"

# Local development
# Check terminal output
```

Example log output:
```
[Revalidate API] Full webhook payload: {...}
[Revalidate API] Webhook received: {...}
[Revalidate API] Revalidated tag: homepage
[Revalidate API] Revalidated path: /
[Revalidate API] Revalidation completed: {...}
```

---

**Date:** March 23, 2026  
**Status:** ✅ Updated and tested  
**Compatibility:** Strapi v4 & v5
