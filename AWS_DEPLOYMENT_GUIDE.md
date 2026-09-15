# AWS Deployment & Cost Optimization Guide

This guide details the deployment architecture for running **both Frontend and Backend** on AWS, migrating your database from Supabase to standard PostgreSQL, eliminating recurring cloud and SaaS costs, and managing authentication cookies reliably.

---

## 1. Architectural Overview & Cost Comparison

### Traditional (Expensive) AWS Setup vs. Our Cost-Optimized Setup

| Component | Traditional AWS Setup | Our Cost-Optimized Setup | Monthly Savings |
| :--- | :--- | :--- | :--- |
| **Database** | AWS RDS (db.t4g.small) + backups (~$25–$35/mo) | Docker PostgreSQL on persistent EBS / Lightsail ($0 extra) | **~$30/mo** |
| **VPC Networking** | AWS NAT Gateway ($32.40/mo + data transfer) | Direct EC2 / Lightsail egress ($0) | **~$32/mo** |
| **Load Balancer** | AWS Application Load Balancer ($16.20/mo + LCUs) | Containerized Nginx Gateway with SSL ($0) | **~$16/mo** |
| **Media Storage** | Cloudinary paid plan ($89/mo when limit exceeded) | Persistent EBS local disk / S3 ($0 to $1/mo) | **~$89/mo** |
| **Total Monthly** | **~$160 – $200+ / month** | **~$3.50 – $10 / month flat** | **Save ~$1,800+/yr** |

---

## 2. Cookie Management on AWS: Why It Fails & How We Solved It

### The Problem with Cookies Across Cloud Deployments
When developers deploy a frontend (e.g., Vercel, S3 bucket, or different port) and a backend on AWS:
1. **Third-Party Cookie Blocking:** Modern browsers (Safari ITP, Google Chrome Privacy Sandbox, Firefox ETP) classify the backend cookie as a *third-party cookie* and block it by default.
2. **Missing Credentials:** Standard `fetch` and Axios ignore cookies unless explicitly configured with `withCredentials: true`.
3. **Public Suffix Restriction:** Browsers prohibit setting wildcard cookies on cloud domains like `*.compute.amazonaws.com` or `*.elasticbeanstalk.com`.

### Our Solution: Dual-Mode Architecture + Same-Origin Routing

#### A. Same-Origin Gateway (Nginx)
The included `docker-compose.yml` and `nginx.conf` route both frontend and backend under the **exact same host and port**:
- `https://your-domain.com/` → React Vite Frontend
- `https://your-domain.com/api/` → Express Backend
- `https://your-domain.com/uploads/` → Media & Uploads

> [!NOTE]
> Because requests are made to the **same origin**, browsers consider all cookies strictly **First-Party**. Third-party blocking is completely bypassed, and zero CORS headers are required.

#### B. Dual-Mode Defense-in-Depth Authentication
We implemented dual-mode authentication on both client and server:
1. **HttpOnly Cookie (`et_token`):** Automatically set upon login/register with `HttpOnly`, `SameSite=Lax`, and `Secure` flags. This prevents malicious scripts from stealing the token via XSS.
2. **Bearer Token Fallback:** The backend continues to return the JWT token in JSON, and accepts `Authorization: Bearer <token>`. The frontend stores it in `localStorage` as a fallback.
3. **Automatic Server-Side Logout:** `logoutUser()` triggers `POST /api/auth/logout`, which instructs the browser to clear the `HttpOnly` cookie via `res.clearCookie('et_token')`.

---

## 3. Database Migration: Supabase to PostgreSQL

The codebase uses pure PostgreSQL queries via the `pg` pool. There are no proprietary Supabase SDK dependencies.

### Method 1: Automated Script (Recommended)

1. Obtain your **Supabase Database Connection String**:
   - Go to **Supabase Dashboard** → **Project Settings** → **Database** → **Connection string** (URI).
   - Example: `postgresql://postgres:YOUR_PASSWORD@db.xxxxxx.supabase.co:5432/postgres`

2. Run the migration script in `backend`:
   ```bash
   cd backend
   node scripts/migrateSupabaseToPostgres.js "<SUPABASE_DATABASE_URL>" "<TARGET_DATABASE_URL>"
   ```
   *If `<TARGET_DATABASE_URL>` is omitted, it defaults to the `DATABASE_URL` in your `.env`.*

The script automatically:
- Connects to both databases with secure SSL.
- Applies the full table schema to the target database.
- Migrates all 8 tables (`demo_tags`, `admin_users`, `demos`, `blogs`, `testimonials`, `jobs`, `career_applications`, `contact_leads`).
- Re-aligns PostgreSQL auto-increment sequences (`SERIAL id`).

### Method 2: Native PostgreSQL `pg_dump` and `psql`

```bash
# 1. Dump data from Supabase
pg_dump "postgresql://postgres:PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres" \
  --data-only --schema=public --exclude-table-data='spatial_ref_sys' > supabase_dump.sql

# 2. Restore into target PostgreSQL
psql "postgresql://postgres:PASSWORD@TARGET_HOST:5432/elevate_trust" -f backend/sql/schema.sql
psql "postgresql://postgres:PASSWORD@TARGET_HOST:5432/elevate_trust" -f supabase_dump.sql
```

---

## 4. Step-by-Step AWS Deployment (Option 1: Lightsail / EC2 with Docker)

### Step 1: Launch an AWS Instance
- **AWS Lightsail (Easiest & Cheapest):**
  - Choose OS: **Ubuntu 24.04 LTS**.
  - Plan: **$3.50 or $5/month** (includes compute, memory, SSD, and bandwidth).
  - Attach a Static IP (free in Lightsail).
- **AWS EC2 (Alternative):**
  - Instance type: `t4g.small` or `t3.micro` (Ubuntu 24.04 LTS).
  - Storage: 20–30 GB gp3 root volume.
  - Security Group: Allow ports **22 (SSH)**, **80 (HTTP)**, **443 (HTTPS)**.

### Step 2: Install Docker on the Server
SSH into your instance and run:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose-v2 git
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
# Log out and log back in to apply docker group
exit
```

### Step 3: Clone Repository and Configure `.env`
```bash
git clone <YOUR_REPOSITORY_URL> et-app
cd et-app

# Copy backend environment template
cp backend/.env.example backend/.env
nano backend/.env
```

Set the following production values in `backend/.env`:
```env
NODE_ENV=production
DATABASE_URL=postgresql://postgres:StrongDbPassword@postgres:5432/elevate_trust
JWT_SECRET=use-a-secure-random-64-character-string
ALLOW_LOCAL_STORAGE=true
STORAGE_DRIVER=local
COOKIE_SECURE=true
COOKIE_SAMESITE=lax
SEED_ON_START=true
SEED_ADMIN_1_EMAIL=admin@elevatetrust.ai
SEED_ADMIN_1_PASSWORD=SecureAdminPassword123!
```

Update `POSTGRES_PASSWORD` in `docker-compose.yml` to match:
```yaml
POSTGRES_PASSWORD: StrongDbPassword
```

### Step 4: Build and Start the Application
```bash
docker compose up -d --build
```
Verify all containers are running:
```bash
docker compose ps
docker compose logs -f backend
```

### Step 5: Configure Free SSL with Certbot (Let's Encrypt)
To obtain an official free SSL certificate for your domain:
```bash
sudo apt install -y certbot python3-certbot-nginx
```
Update `nginx.conf` with your domain name (replace `_` with `yourdomain.com www.yourdomain.com`), then run:
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 5. Automated Database Backups ($0 Cost)

To ensure zero data loss without paying for AWS managed backup services:
Create a backup script `/home/ubuntu/backup_db.sh`:
```bash
#!/bin/bash
BACKUP_DIR="/home/ubuntu/backups"
mkdir -p "$BACKUP_DIR"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
docker exec et_postgres pg_dump -U postgres elevate_trust | gzip > "$BACKUP_DIR/db_$TIMESTAMP.sql.gz"
# Retain backups for 14 days
find "$BACKUP_DIR" -type f -name "*.sql.gz" -mtime +14 -delete
```
Make it executable and add to crontab:
```bash
chmod +x /home/ubuntu/backup_db.sh
crontab -e
# Add line to backup every day at 2:00 AM:
0 2 * * * /home/ubuntu/backup_db.sh
```

---

## 6. Verification & Health Monitoring

The backend includes a health endpoint that inspects both the Node server and the PostgreSQL database pool:
```bash
curl http://localhost/api/health
```

Expected output:
```json
{
  "status": "ok",
  "service": "elevate-revamp-backend",
  "database": "connected",
  "dbLatencyMs": 4,
  "port": 5000,
  "uptimeSeconds": 1420,
  "timestamp": "2026-09-16T01:30:00.000Z"
}
```
If the database ever loses connection, `status` switches to `"degraded"` and returns HTTP `503`, allowing AWS healthcheck probes or Docker restart policies to act immediately.
