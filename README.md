# Nora's Law - Federal Civil Rights Litigation Platform

A comprehensive platform supporting federal civil rights litigation with AI-powered case management, evidence analysis, and legal document generation.

## Features

- **AI-Powered Case Management**: Intelligent case organization and analysis
- **Evidence Processing**: Automated document analysis and metadata extraction
- **Legal Document Generation**: AI-assisted complaint and motion drafting
- **Vector Search**: ChromaDB-powered semantic search across all case materials
- **Email Integration**: Gmail SMTP for notifications and communications
- **Analytics**: Google Analytics integration for usage tracking

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Vector Store**: ChromaDB (self-hosted)
- **AI**: OpenAI GPT-4
- **Email**: Gmail SMTP
- **Deployment**: Docker, Linode Ubuntu 24

## Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd noras-law
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start ChromaDB (for vector storage)**
   ```bash
   npm run db:setup
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

### Production Deployment

1. **Server Setup**
   ```bash
   # On your Linode Ubuntu 24 server
   ./scripts/setup-server.sh
   ```

2. **Configure ChromaDB**
   ```bash
   ./scripts/setup-chromadb.sh
   ```

3. **Deploy Application**
   ```bash
   ./scripts/deploy-app.sh
   ```

4. **Test Email Configuration**
   ```bash
   ./scripts/test-email.sh
   ```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# ChromaDB Configuration
CHROMA_URL=http://localhost:8000

# Gmail SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# NextAuth Configuration
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your_random_secret

# Google Analytics
NEXT_PUBLIC_GA_ID=your_ga_measurement_id
```

## Docker Deployment

### Using Docker Compose

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Scale services if needed**
   ```bash
   docker-compose up -d --scale noras-law=3
   ```

### Manual Docker Build

1. **Build the image**
   ```bash
   docker build -t noras-law .
   ```

2. **Run the container**
   ```bash
   docker run -d \
     --name noras-law \
     -p 3000:3000 \
     --env-file .env.local \
     noras-law
   ```

## API Documentation

### Health Check
```
GET /api/health
```
Returns system health status including ChromaDB and Supabase connectivity.

### Authentication
The platform uses NextAuth.js for authentication. Supported providers:
- Email/Password
- OAuth providers (configurable)

## Database Schema

The application uses Supabase with the following main tables:
- `users`: User accounts and profiles
- `cases`: Legal cases and metadata
- `documents`: Uploaded documents and evidence
- `evidence`: Evidence items with metadata
- `violations`: Identified legal violations
- `ai_conversations`: AI assistant conversation history

## ChromaDB Collections

The application creates the following ChromaDB collections:
- `documents`: Document embeddings for search
- `evidence`: Evidence embeddings
- `case_notes`: Case-related notes
- `legal_precedents`: Legal precedent embeddings

## Email Templates

Pre-built email templates for:
- Welcome messages
- Case updates
- Document ready notifications
- System notifications

## Security

- All API routes are protected with authentication
- File uploads are validated and scanned
- Sensitive data is encrypted at rest
- Rate limiting implemented on API endpoints
- HTTPS enforced in production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Email: support@noraslaw.com
- Documentation: [Link to docs]
- Issues: [GitHub Issues]

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.
