# Dental CMS - Strapi Backend

This is the Strapi CMS backend for the dental landing pages application.

## Setup

### 1. Install Dependencies
```bash
cd strapi-cms
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and update:
- Database credentials
- Generate secure keys for APP_KEYS, API_TOKEN_SALT, etc.

### 3. Create Database
```bash
# Using Docker PostgreSQL (from parent directory)
docker-compose exec postgres psql -U postgres -c "CREATE DATABASE dental_cms_strapi;"
```

### 4. Start Strapi
```bash
# Development mode
npm run develop

# Production mode
npm run build
npm run start
```

## Access

- **Admin Panel**: http://localhost:1337/admin
- **API**: http://localhost:1337/api

## First Time Setup

1. Start Strapi: `npm run develop`
2. Open http://localhost:1337/admin
3. Create your first admin user
4. Configure content types (see MIGRATION_PLAN.md)

## API Endpoints

Once content types are created:

- **Pages**: `GET /api/pages`
- **Pages by slug**: `GET /api/pages?filters[slug][$eq]=home`
- **Media**: `GET /api/upload/files`

## Environment Variables

Required variables in `.env`:

```env
# Server
HOST=0.0.0.0
PORT=1337

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=dental_cms_strapi
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres

# Secrets (generate secure values)
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your-salt
ADMIN_JWT_SECRET=your-secret
TRANSFER_TOKEN_SALT=your-salt
JWT_SECRET=your-secret
```

## Generate Secure Keys

```bash
# Generate random keys
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Docker Integration

Add to parent `docker-compose.yml`:

```yaml
strapi:
  build: ./strapi-cms
  ports:
    - "1337:1337"
  environment:
    - DATABASE_HOST=postgres
    - DATABASE_PORT=5432
  depends_on:
    - postgres
```

## Next Steps

After Strapi is running:
1. Create content types (Step 2)
2. Configure permissions (Step 4)
3. Update Next.js to use Strapi API (Step 5)
