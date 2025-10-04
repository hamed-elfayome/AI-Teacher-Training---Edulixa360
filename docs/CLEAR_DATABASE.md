# Clear Database Records

Commands to empty visitor and submission records from the database.

⚠️ **WARNING**: These commands permanently delete data. Use with caution!

---

## 📋 Option 1: Using Prisma CLI (Recommended)

**On your server:**

```bash
# Navigate to project directory
cd /root/ai-teacher-training-nextjs

# Clear all visitors
docker-compose -f docker-compose.prod.yml exec app npx prisma db execute --stdin <<SQL
DELETE FROM "Visitor";
SQL

# Clear all submissions
docker-compose -f docker-compose.prod.yml exec app npx prisma db execute --stdin <<SQL
DELETE FROM "Submission";
SQL

# Clear both at once
docker-compose -f docker-compose.prod.yml exec app npx prisma db execute --stdin <<SQL
DELETE FROM "Visitor";
DELETE FROM "Submission";
SQL
```

---

## 📋 Option 2: Using PostgreSQL psql

**On your server:**

```bash
# Connect to database and clear
docker exec ai-teacher-postgres psql -U aiuser -d ai_teacher_training -c "DELETE FROM \"Visitor\"; DELETE FROM \"Submission\";"

# Or interactive mode:
docker exec -it ai-teacher-postgres psql -U aiuser -d ai_teacher_training

# Then run:
DELETE FROM "Visitor";
DELETE FROM "Submission";

# Exit psql:
\q
```

---

## 📋 Option 3: Create a Clear Script

**Create this script once:**

```bash
cat > clear-analytics.sh << 'SCRIPT'
#!/bin/bash
echo "⚠️  WARNING: This will delete ALL visitor and submission records!"
read -p "Are you sure? Type 'yes' to confirm: " confirm

if [ "$confirm" != "yes" ]; then
    echo "Aborted."
    exit 0
fi

echo "🗑️  Clearing visitor records..."
docker-compose -f docker-compose.prod.yml exec -T app npx prisma db execute --stdin <<SQL
DELETE FROM "Visitor";
SQL

echo "🗑️  Clearing submission records..."
docker-compose -f docker-compose.prod.yml exec -T app npx prisma db execute --stdin <<SQL
DELETE FROM "Submission";
SQL

echo "✅ Database cleared successfully!"
echo ""
echo "📊 Remaining records:"
docker exec ai-teacher-postgres psql -U aiuser -d ai_teacher_training -c "SELECT 'Visitors: ' || COUNT(*) FROM \"Visitor\" UNION ALL SELECT 'Submissions: ' || COUNT(*) FROM \"Submission\";"
SCRIPT

chmod +x clear-analytics.sh
```

**Then run:**
```bash
sudo ./clear-analytics.sh
```

---

## 📊 Option 4: Clear and Verify

**Complete command with verification:**

```bash
# Clear, count, and show status
docker exec ai-teacher-postgres psql -U aiuser -d ai_teacher_training << 'SQL'
-- Show counts before
SELECT 'Before - Visitors: ' || COUNT(*) FROM "Visitor";
SELECT 'Before - Submissions: ' || COUNT(*) FROM "Submission";

-- Delete all records
DELETE FROM "Visitor";
DELETE FROM "Submission";

-- Show counts after
SELECT 'After - Visitors: ' || COUNT(*) FROM "Visitor";
SELECT 'After - Submissions: ' || COUNT(*) FROM "Submission";
SQL
```

---

## 🔍 Check Current Counts (Before Clearing)

```bash
# Check how many records exist
docker exec ai-teacher-postgres psql -U aiuser -d ai_teacher_training -c "SELECT 'Visitors: ' || COUNT(*) as count FROM \"Visitor\" UNION ALL SELECT 'Submissions: ' || COUNT(*) FROM \"Submission\";"
```

---

## 💾 Backup Before Clearing (Optional)

**Create backup first:**

```bash
# Backup current data
docker exec ai-teacher-postgres pg_dump -U aiuser ai_teacher_training > backup_$(date +%Y%m%d_%H%M%S).sql

# Later, restore if needed:
# cat backup_20251004_120000.sql | docker exec -i ai-teacher-postgres psql -U aiuser -d ai_teacher_training
```

---

## 🎯 Quick One-Liner Commands

### Clear Everything (No Confirmation)
```bash
docker exec ai-teacher-postgres psql -U aiuser -d ai_teacher_training -c "DELETE FROM \"Visitor\"; DELETE FROM \"Submission\";"
```

### Clear Only Visitors
```bash
docker exec ai-teacher-postgres psql -U aiuser -d ai_teacher_training -c "DELETE FROM \"Visitor\";"
```

### Clear Only Submissions
```bash
docker exec ai-teacher-postgres psql -U aiuser -d ai_teacher_training -c "DELETE FROM \"Submission\";"
```

### Clear Old Records (Keep Recent)
```bash
# Keep only last 7 days
docker exec ai-teacher-postgres psql -U aiuser -d ai_teacher_training -c "DELETE FROM \"Visitor\" WHERE \"createdAt\" < NOW() - INTERVAL '7 days';"
docker exec ai-teacher-postgres psql -U aiuser -d ai_teacher_training -c "DELETE FROM \"Submission\" WHERE \"createdAt\" < NOW() - INTERVAL '7 days';"
```

---

## 🔄 Reset to Fresh State

**To completely reset analytics (keeps admin user):**

```bash
# Clear all analytics data
docker exec ai-teacher-postgres psql -U aiuser -d ai_teacher_training << 'SQL'
DELETE FROM "Visitor";
DELETE FROM "Submission";

-- Show final counts
SELECT 
    'Visitors: ' || COUNT(*) FROM "Visitor"
    UNION ALL
SELECT 
    'Submissions: ' || COUNT(*) FROM "Submission"
    UNION ALL
SELECT 
    'Users (Admin): ' || COUNT(*) FROM "User";
SQL
```

---

## 📈 After Clearing

The dashboard will show:
- ✅ Total Visitors: 0
- ✅ Total Submissions: 0
- ✅ Conversion Rate: 0%
- ✅ All charts empty
- ✅ No recent activity

New visitors and submissions will start counting from zero.

---

## 🛡️ Safety Tips

1. **Always backup first** if you might need the data later
2. **Test on staging** before running on production
3. **Use the confirmation script** to avoid accidents
4. **Keep the User table** - don't delete admin accounts
5. **Document when you clear** - note the date and reason

---

## 🔧 Troubleshooting

### Permission Denied
```bash
# Ensure you're running with proper permissions
sudo docker exec ai-teacher-postgres psql ...
```

### Container Not Found
```bash
# Check container name
docker ps | grep postgres
# Use the correct name in commands
```

### Database Connection Error
```bash
# Verify database is running
docker-compose -f docker-compose.prod.yml ps
# Restart if needed
docker-compose -f docker-compose.prod.yml restart postgres
```

---

**Created**: October 2025  
**Status**: ✅ Safe to use
