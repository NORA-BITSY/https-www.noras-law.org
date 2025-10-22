#!/bin/bash

# ChromaDB Setup Script for Nora's Law
# Sets up ChromaDB on volume storage as Pinecone replacement

set -e

echo "🗄️  Setting up ChromaDB..."

# Check if volume is mounted
if [ -d "/mnt/volume" ]; then
    CHROMA_PATH="/mnt/volume/chromadb"
    echo "Using volume storage at $CHROMA_PATH"
else
    CHROMA_PATH="/var/lib/chromadb"
    echo "Using local storage at $CHROMA_PATH"
fi

# Create ChromaDB directory
mkdir -p $CHROMA_PATH

# Create docker-compose.yml for ChromaDB
cat > $CHROMA_PATH/docker-compose.yml << 'EOF'
version: '3.8'

services:
  chromadb:
    image: chromadb/chroma:latest
    container_name: noras-law-chromadb
    ports:
      - "8000:8000"
    volumes:
      - ./data:/chroma/chroma
    environment:
      - CHROMA_SERVER_HOST=0.0.0.0
      - CHROMA_SERVER_HTTP_PORT=8000
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/api/v1/heartbeat"]
      interval: 30s
      timeout: 10s
      retries: 3
EOF

cd $CHROMA_PATH

# Start ChromaDB
echo "🐳 Starting ChromaDB..."
docker-compose up -d

# Wait for ChromaDB to be ready
echo "⏳ Waiting for ChromaDB to start..."
sleep 30

# Test connection
if curl -f http://localhost:8000/api/v1/heartbeat > /dev/null 2>&1; then
    echo "✅ ChromaDB is running successfully!"
    echo "📍 ChromaDB URL: http://localhost:8000"
else
    echo "❌ ChromaDB failed to start. Check logs:"
    docker-compose logs
    exit 1
fi

# Create systemd service for persistence
sudo tee /etc/systemd/system/chromadb.service > /dev/null << EOF
[Unit]
Description=ChromaDB Service
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$CHROMA_PATH
ExecStart=/usr/bin/docker-compose up -d
ExecStop=/usr/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable chromadb

echo "✅ ChromaDB setup complete!"
echo "🔄 ChromaDB will start automatically on boot"
