#!/bin/bash
# Overnight Discovery Script for DentistNearMeNow
# Runs continuous batches until all locations are processed
#
# Usage:
#   ./scripts/discovery/overnight-discovery.sh
#   nohup ./scripts/discovery/overnight-discovery.sh > logs/overnight.log 2>&1 &

set -e

# Configuration
BATCH_SIZE=100
DELAY_BETWEEN_BATCHES=60  # seconds
MAX_BATCHES=50            # safety limit (50 * 100 = 5000 locations max)
LOG_DIR="logs"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Create log directory
mkdir -p "$PROJECT_DIR/$LOG_DIR"

# Log file with timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="$PROJECT_DIR/$LOG_DIR/overnight_$TIMESTAMP.log"

# Function to log messages
log() {
    local msg="[$(date '+%Y-%m-%d %H:%M:%S')] $1"
    echo -e "$msg" | tee -a "$LOG_FILE"
}

# Function to get current stats
get_stats() {
    node -e "
    const fs = require('fs');
    const progress = JSON.parse(fs.readFileSync('$PROJECT_DIR/data/discovery/progress.json', 'utf8'));
    console.log(JSON.stringify({
        total: progress.total_locations,
        completed: progress.completed,
        pending: progress.pending,
        dentists: progress.total_dentists_found
    }));
    " 2>/dev/null
}

# Header
log "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
log "${BLUE}🦷 Overnight Discovery Script - DentistNearMeNow${NC}"
log "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
log ""
log "Configuration:"
log "  Batch size: $BATCH_SIZE"
log "  Delay between batches: ${DELAY_BETWEEN_BATCHES}s"
log "  Max batches: $MAX_BATCHES"
log "  Log file: $LOG_FILE"
log ""

# Change to project directory
cd "$PROJECT_DIR"

# Get initial stats
INITIAL_STATS=$(get_stats)
INITIAL_DENTISTS=$(echo $INITIAL_STATS | node -e "console.log(JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')).dentists)")
INITIAL_PENDING=$(echo $INITIAL_STATS | node -e "console.log(JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')).pending)")

log "📊 Initial Status:"
log "  Pending locations: $INITIAL_PENDING"
log "  Total dentists: $INITIAL_DENTISTS"
log ""

# Run batches
BATCH_NUM=0
TOTAL_NEW_DENTISTS=0

while [ $BATCH_NUM -lt $MAX_BATCHES ]; do
    BATCH_NUM=$((BATCH_NUM + 1))

    # Check remaining locations
    STATS=$(get_stats)
    PENDING=$(echo $STATS | node -e "console.log(JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')).pending)")

    if [ "$PENDING" -eq 0 ]; then
        log "${GREEN}✅ All locations processed! No more pending.${NC}"
        break
    fi

    log "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    log "${YELLOW}🚀 Starting Batch $BATCH_NUM (Pending: $PENDING)${NC}"
    log "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

    # Get dentist count before batch
    BEFORE_DENTISTS=$(echo $STATS | node -e "console.log(JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')).dentists)")

    # Run the discovery script
    START_TIME=$(date +%s)

    if npx tsx scripts/discovery/discover-dentists.ts --batch $BATCH_SIZE 2>&1 | tee -a "$LOG_FILE"; then
        END_TIME=$(date +%s)
        DURATION=$((END_TIME - START_TIME))

        # Get stats after batch
        AFTER_STATS=$(get_stats)
        AFTER_DENTISTS=$(echo $AFTER_STATS | node -e "console.log(JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')).dentists)")
        NEW_IN_BATCH=$((AFTER_DENTISTS - BEFORE_DENTISTS))
        TOTAL_NEW_DENTISTS=$((TOTAL_NEW_DENTISTS + NEW_IN_BATCH))

        log ""
        log "${GREEN}✅ Batch $BATCH_NUM completed in ${DURATION}s${NC}"
        log "   New dentists this batch: +$NEW_IN_BATCH"
        log "   Total new tonight: +$TOTAL_NEW_DENTISTS"
        log "   Grand total: $AFTER_DENTISTS"
        log ""
    else
        log "${RED}❌ Batch $BATCH_NUM failed!${NC}"
        log "   Waiting 5 minutes before retry..."
        sleep 300
        continue
    fi

    # Check if we should continue
    NEW_PENDING=$(echo $AFTER_STATS | node -e "console.log(JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')).pending)")
    if [ "$NEW_PENDING" -eq 0 ]; then
        log "${GREEN}✅ All locations processed!${NC}"
        break
    fi

    # Delay before next batch
    log "⏳ Waiting ${DELAY_BETWEEN_BATCHES}s before next batch..."
    sleep $DELAY_BETWEEN_BATCHES
done

# Final summary
log ""
log "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
log "${BLUE}📊 Overnight Discovery Complete!${NC}"
log "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

FINAL_STATS=$(get_stats)
FINAL_DENTISTS=$(echo $FINAL_STATS | node -e "console.log(JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')).dentists)")
FINAL_PENDING=$(echo $FINAL_STATS | node -e "console.log(JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')).pending)")

log ""
log "Results:"
log "  Batches run: $BATCH_NUM"
log "  New dentists found: +$TOTAL_NEW_DENTISTS"
log "  Total dentists now: $FINAL_DENTISTS"
log "  Remaining locations: $FINAL_PENDING"
log ""
log "Log saved to: $LOG_FILE"
