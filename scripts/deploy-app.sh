#!/bin/bash

# Nora's Law Application Deployment Script
# Deploys the Next.js application to Linode server

set -e

echo "🚀 Deploying Nora's Law application..."

# Check if we're in the project directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Build the application
echo "🔨 Building application..."
npm run build

# Create production environment file
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found. Creating template..."
    cat > .env.local << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# ChromaDB Configuration (Local)
CHROMA_URL=http://localhost:8000

# Gmail SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Google Analytics
NEXT_PUBLIC_GA_ID=your_ga_measurement_id

# NextAuth Configuration
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your_random_secret
EOF
    echo "📝 Created .env.local template. Please configure your environment variables."
    echo "After configuration, run this script again."
    exit 1
fi

# Stop existing PM2 process
echo "🛑 Stopping existing application..."
pm2 stop noras-law || true
pm2 delete noras-law || true

# Start application with PM2
echo "▶️  Starting application..."
pm2 start npm --name "noras-law" -- start

# Save PM2 configuration
pm2 save

# Configure Nginx
echo "🌐 Configuring Nginx..."
sudo tee /etc/nginx/sites-available/noras-law > /dev/null << 'EOF'
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # ChromaDB proxy (optional - for direct access)
    location /api/chroma/ {
        proxy_pass http://localhost:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/noras-law /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

echo "✅ Application deployed successfully!"
echo ""
echo "Next steps:"
echo "1. Update /etc/nginx/sites-available/noras-law with your actual domain"
echo "2. Run: sudo certbot --nginx -d yourdomain.com"
echo "3. Configure your .env.local file with actual values"
echo "4. Test the application at your domain"
