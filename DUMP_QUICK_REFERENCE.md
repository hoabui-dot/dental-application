# Database Dump Quick Reference

## Quick Commands

### Dump Local Database
```bash
./dump-db-simple.sh
```
Creates `dump.sql` with full database backup.

### Dump Remote Database
```bash
./dump-remote-db.sh
```
Creates `dump-remote.sql` on remote server.

### Verify Dump
```bash
./verify-dump-integrity.sh
```
Validates dump file integrity and completeness.

### Complete Workflow
```bash
./dump-all.sh
```
Runs dump + verification + summary in one command.

## Current Status

### ✅ Local Database
- **File:** `dump.sql`
- **Size:** 570 KB
- **Tables:** 84 (all with data)
- **Status:** Complete and verified

### ⚠️ Remote Database
- **Status:** Empty (0 tables)
- **Action needed:** Wait for Strapi initialization or restore from local dump

## Restore Commands

### Restore to Local Database
```bash
docker exec -i strapi-postgres psql -U postgres -d dental_cms_strapi < dump.sql
```

### Restore to Remote Database
```bash
# 1. Copy dump to remote
scp dump.sql neurosus@100.68.50.41:dental-app/

# 2. SSH and restore
ssh neurosus@100.68.50.41
cd dental-app
docker-compose stop strapi
docker exec -i dental-postgres psql -U postgres -d dental_cms_strapi < dump.sql
docker-compose start strapi
```

## Database Info

### Local
- Container: `strapi-postgres`
- Database: `dental_cms_strapi`
- User: `postgres`

### Remote
- Host: `100.68.50.41`
- Container: `dental-postgres`
- Database: `dental_cms_strapi`
- User: `postgres`

## Troubleshooting

### Check if container is running
```bash
docker ps | grep postgres
```

### Check database tables
```bash
docker exec strapi-postgres psql -U postgres -d dental_cms_strapi -c "\dt"
```

### Check Strapi logs
```bash
docker logs dental-strapi
```

### Check database size
```bash
docker exec strapi-postgres psql -U postgres -d dental_cms_strapi -c "SELECT pg_size_pretty(pg_database_size('dental_cms_strapi'));"
```

## Files Created

| File | Purpose | Size |
|------|---------|------|
| `dump.sql` | Local database backup | 570 KB |
| `dump-remote.sql` | Remote database backup | 643 bytes |
| `dump-db-simple.sh` | Local dump script | - |
| `dump-remote-db.sh` | Remote dump script | - |
| `verify-dump-integrity.sh` | Verification script | - |
| `database-dump-summary.sh` | Summary script | - |
| `check-remote-db.sh` | Remote status checker | - |
| `dump-all.sh` | Complete workflow | - |
| `DATABASE_DUMP_REPORT.md` | Detailed report | - |

## What's Included in Dump

✅ All 84 tables with complete schema  
✅ All sequences and indexes  
✅ All foreign key constraints  
✅ All data (COPY statements for each table)  
✅ Admin users and roles  
✅ Homepage content  
✅ Navigation and footer  
✅ Media files metadata  
✅ Strapi configuration  

## Safety Notes

- ✅ Dump includes `--clean --if-exists` flags for safe restoration
- ✅ All foreign key constraints are preserved
- ✅ Sequences are properly reset
- ⚠️ Always stop Strapi before restoring to avoid conflicts
- ⚠️ Backup existing data before restoration

---

**Last Updated:** March 23, 2026, 16:25
