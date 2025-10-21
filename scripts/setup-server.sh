#!/bin/bash

# Nora's Law - Linode Ubuntu 24 Server Setup Script
# This script sets up the server with Node.js, Nginx, SSL, and volume storage

set -e

echo "🚀 Setting up Nora's Law server on Ubuntu 24..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install essential packages
echo "📦 Installing essential packages..."
sudo apt install -y curl wget git htop ufw fail2ban

# Install Node.js 20.x
echo "📦 Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
echo "📦 Installing PM2..."
sudo npm install -g pm2

# Install Nginx
echo "📦 Installing Nginx..."
sudo apt install -y nginx

# Install Certbot for SSL
echo "📦 Installing Certbot for SSL..."
sudo apt install -y certbot python3-certbot-nginx

# Configure firewall
echo "🔥 Configuring firewall..."
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# Create application directory
echo "📁 Creating application directory..."
sudo mkdir -p /var/www/noras-law
sudo chown -R $USER:$USER /var/www/noras-law

# Mount volume storage (assuming /dev/sdb is the volume)
echo "💾 Setting up volume storage..."
if [ -b /dev/sdb ]; then
    echo "Volume found at /dev/sdb"
    sudo mkdir -p /mnt/volume
    sudo mount /dev/sdb /mnt/volume

    # Add to fstab for persistence
    echo "/dev/sdb /mnt/volume ext4 defaults 0 0" | sudo tee -a /etc/fstab

    # Create ChromaDB directory on volume
    sudo mkdir -p /mnt/volume/chromadb
    sudo chown -R $USER:$USER /mnt/volume/chromadb
else
    echo "⚠️  Volume not found at /dev/sdb. Please mount manually."
    sudo mkdir -p /var/lib/chromadb
    sudo chown -R $USER:$USER /var/lib/chromadb
fi

# Install Docker for ChromaDB
echo "🐳 Installing Docker..."
sudo apt install -y docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER

echo "✅ Server setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure your domain DNS to point to this server"
echo "2. Run the ChromaDB setup: ./scripts/setup-chromadb.sh"
echo "3. Deploy the application: ./scripts/deploy-app.sh"
echo "4. Configure SSL: sudo certbot --nginx -d yourdomain.com"
