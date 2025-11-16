#!/bin/bash

###############################################################################
# SkillSwap India - Automated Database Backup Script
# As per Enhancement Roadmap Section 1.5
#
# Schedule: Daily at 2 AM via cron
# Retention: Daily (7 days), Weekly (4 weeks), Monthly (12 months)
###############################################################################

set -e  # Exit on error

# Configuration
BACKUP_DIR="/var/backups/skillswap/daily"
WEEKLY_BACKUP_DIR="/var/backups/skillswap/weekly"
MONTHLY_BACKUP_DIR="/var/backups/skillswap/monthly"
S3_BUCKET="${S3_BACKUP_BUCKET:-skillswap-backups}"
DATE=$(date +%Y%m%d_%H%M%S)
DAY_OF_WEEK=$(date +%u)  # 1-7 (Monday-Sunday)
DAY_OF_MONTH=$(date +%d)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Ensure backup directories exist
mkdir -p "$BACKUP_DIR"
mkdir -p "$WEEKLY_BACKUP_DIR"
mkdir -p "$MONTHLY_BACKUP_DIR"

echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] Starting database backup...${NC}"

# Create backup filename
BACKUP_FILE="skillswap_backup_${DATE}.sql.gz"
BACKUP_PATH="${BACKUP_DIR}/${BACKUP_FILE}"

# Perform database backup
echo -e "${YELLOW}Creating backup: ${BACKUP_FILE}${NC}"

if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}ERROR: DATABASE_URL not set${NC}"
    exit 1
fi

# Export database
pg_dump "$DATABASE_URL" | gzip > "$BACKUP_PATH"

if [ $? -eq 0 ]; then
    BACKUP_SIZE=$(du -h "$BACKUP_PATH" | cut -f1)
    echo -e "${GREEN}✓ Backup created successfully (Size: ${BACKUP_SIZE})${NC}"
else
    echo -e "${RED}✗ Backup failed${NC}"
    exit 1
fi

# Upload to S3 (if AWS CLI is configured)
if command -v aws &> /dev/null; then
    echo -e "${YELLOW}Uploading to S3...${NC}"

    aws s3 cp "$BACKUP_PATH" "s3://${S3_BUCKET}/daily/${BACKUP_FILE}" \
        --storage-class STANDARD_IA \
        --metadata "created=$(date -Iseconds),retention=7days"

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Uploaded to S3: s3://${S3_BUCKET}/daily/${BACKUP_FILE}${NC}"
    else
        echo -e "${RED}✗ S3 upload failed${NC}"
    fi
else
    echo -e "${YELLOW}AWS CLI not found. Skipping S3 upload.${NC}"
fi

# Weekly backup (every Monday)
if [ "$DAY_OF_WEEK" -eq 1 ]; then
    echo -e "${YELLOW}Creating weekly backup...${NC}"
    WEEKLY_FILE="skillswap_weekly_${DATE}.sql.gz"
    cp "$BACKUP_PATH" "${WEEKLY_BACKUP_DIR}/${WEEKLY_FILE}"

    if command -v aws &> /dev/null; then
        aws s3 cp "${WEEKLY_BACKUP_DIR}/${WEEKLY_FILE}" \
            "s3://${S3_BUCKET}/weekly/${WEEKLY_FILE}" \
            --storage-class STANDARD_IA \
            --metadata "created=$(date -Iseconds),retention=4weeks"
    fi

    echo -e "${GREEN}✓ Weekly backup created${NC}"
fi

# Monthly backup (first day of month)
if [ "$DAY_OF_MONTH" -eq "01" ]; then
    echo -e "${YELLOW}Creating monthly backup...${NC}"
    MONTHLY_FILE="skillswap_monthly_${DATE}.sql.gz"
    cp "$BACKUP_PATH" "${MONTHLY_BACKUP_DIR}/${MONTHLY_FILE}"

    if command -v aws &> /dev/null; then
        aws s3 cp "${MONTHLY_BACKUP_DIR}/${MONTHLY_FILE}" \
            "s3://${S3_BUCKET}/monthly/${MONTHLY_FILE}" \
            --storage-class GLACIER \
            --metadata "created=$(date -Iseconds),retention=12months"
    fi

    echo -e "${GREEN}✓ Monthly backup created${NC}"
fi

# Cleanup old backups
echo -e "${YELLOW}Cleaning up old backups...${NC}"

# Delete daily backups older than 7 days
find "$BACKUP_DIR" -name "skillswap_backup_*.sql.gz" -mtime +7 -delete
echo -e "${GREEN}✓ Deleted daily backups older than 7 days${NC}"

# Delete weekly backups older than 28 days (4 weeks)
find "$WEEKLY_BACKUP_DIR" -name "skillswap_weekly_*.sql.gz" -mtime +28 -delete
echo -e "${GREEN}✓ Deleted weekly backups older than 4 weeks${NC}"

# Delete monthly backups older than 365 days (12 months)
find "$MONTHLY_BACKUP_DIR" -name "skillswap_monthly_*.sql.gz" -mtime +365 -delete
echo -e "${GREEN}✓ Deleted monthly backups older than 12 months${NC}"

# Cleanup old S3 backups (if AWS CLI is available)
if command -v aws &> /dev/null; then
    echo -e "${YELLOW}Cleaning up S3 backups...${NC}"

    # This would typically be handled by S3 lifecycle policies
    # But we can also do it manually here if needed

    SEVEN_DAYS_AGO=$(date -d '7 days ago' +%Y%m%d)
    aws s3 ls "s3://${S3_BUCKET}/daily/" | while read -r line; do
        FILE_DATE=$(echo "$line" | awk '{print $4}' | grep -oP '\d{8}' | head -1)
        if [ ! -z "$FILE_DATE" ] && [ "$FILE_DATE" -lt "$SEVEN_DAYS_AGO" ]; then
            FILE_NAME=$(echo "$line" | awk '{print $4}')
            aws s3 rm "s3://${S3_BUCKET}/daily/${FILE_NAME}"
            echo -e "${GREEN}✓ Deleted old S3 backup: ${FILE_NAME}${NC}"
        fi
    done
fi

# Send notification on success
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}Backup completed successfully!${NC}"
echo -e "${GREEN}Backup file: ${BACKUP_FILE}${NC}"
echo -e "${GREEN}Local path: ${BACKUP_PATH}${NC}"
echo -e "${GREEN}Size: ${BACKUP_SIZE}${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"

# Optional: Send email/Slack notification
# if [ ! -z "$SLACK_WEBHOOK_URL" ]; then
#     curl -X POST "$SLACK_WEBHOOK_URL" \
#         -H 'Content-Type: application/json' \
#         -d "{\"text\":\"✅ SkillSwap database backup completed: ${BACKUP_FILE} (${BACKUP_SIZE})\"}"
# fi

exit 0
