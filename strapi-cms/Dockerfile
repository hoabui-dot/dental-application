# ============================================
# Multi-Stage Dockerfile for Strapi CMS
# ============================================
#
# Optimized for production deployment.
# Uses multi-stage builds for minimal image size.
#
# Stages:
# - deps: Install dependencies
# - builder: Build Strapi admin panel
# - runner: Production runtime
# ============================================

# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:22-alpine AS deps

# Install build dependencies
RUN apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install ALL dependencies (including dev) for building
RUN npm ci && \
    npm cache clean --force

# ============================================
# Stage 2: Production Dependencies
# ============================================
FROM node:22-alpine AS prod-deps

# Install build dependencies
RUN apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install only production dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# ============================================
# Stage 3: Builder
# ============================================
FROM node:22-alpine AS builder

# Install build dependencies
RUN apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++

WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Set build environment
ENV NODE_ENV=production

# Convert TypeScript config files to JavaScript for production (skip database.ts as we have database.js)
RUN for file in config/*.ts; do \
      if [ -f "$file" ] && [ "$(basename "$file")" != "database.ts" ]; then \
        base=$(basename "$file" .ts); \
        sed 's/export default/module.exports =/g' "$file" | \
        sed 's/: string//g' | \
        sed 's/: number//g' | \
        sed 's/: boolean//g' > "config/$base.js"; \
      fi; \
    done && \
    rm -f config/*.ts

# Build Strapi admin panel (this will compile TS files and generate dist folder)
RUN npm run build

# ============================================
# Stage 4: Runner (Production)
# ============================================
FROM node:22-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 strapi && \
    adduser --system --uid 1001 strapi

# Create directories first with proper ownership
RUN mkdir -p /app/public/uploads /app/.cache /app/database/migrations && \
    chown -R strapi:strapi /app

# Copy necessary files from builder
COPY --from=builder --chown=strapi:strapi /app/dist ./dist
COPY --from=deps --chown=strapi:strapi /app/node_modules ./node_modules
COPY --from=builder --chown=strapi:strapi /app/package.json ./package.json
COPY --from=builder --chown=strapi:strapi /app/tsconfig.json ./tsconfig.json
COPY --from=builder --chown=strapi:strapi /app/config ./config
COPY --from=builder --chown=strapi:strapi /app/public ./public
COPY --from=builder --chown=strapi:strapi /app/src ./src

# Expose port
EXPOSE 1337

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD node -e "require('http').get('http://localhost:1337/_health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Switch to non-root user
USER strapi

# Start Strapi
CMD ["npm", "start"]
