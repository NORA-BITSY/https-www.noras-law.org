# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NORA-1 is an AI-powered autonomous agent system built with Python, featuring:
- FastAPI-based REST API
- Claude AI integration via MCP (Model Context Protocol)
- Celery-based async task queue
- PostgreSQL database with Alembic migrations
- Multi-integration support (GitHub, Google, webhooks)
- Memory management with vector store capabilities
- Real estate, sales tracking, and CRM demo applications

## Architecture

### Core Components

**app/core/agent.py** - Main agent orchestration logic
- Primary entry point for agent decision-making
- Coordinates between memory, integrations, and task execution

**app/api/** - FastAPI REST endpoints
- `agents.py` - Agent management endpoints
- `tasks.py` - Task CRUD and execution
- `events.py` - Event processing endpoints
- `integrations.py` - Integration management
- `insights.py` - Analytics and insights
- `auth.py` - Authentication

**app/integrations/** - External service connectors
- `mcp/client.py` - MCP protocol client for Claude AI
- `webhooks/server.py` - Webhook event handlers
- `apis/` - Third-party API clients
- `connectors/` - Service-specific connectors

**app/memory/** - Persistence and context management
- `manager.py` - Memory coordination
- `cache/` - Short-term caching layer
- `vector_store/` - Embeddings and semantic search

**app/tasks/** - Background job processing
- `celery_app.py` - Celery configuration
- `scheduled.py` - Cron-style scheduled tasks
- `automation.py` - Workflow automation tasks
- `insights.py` - Analytics generation
- `sync.py` - Data synchronization

**app/models/** - SQLAlchemy ORM models
- `user.py` - User accounts
- `task.py` - Task definitions
- `event.py` - Event logging
- `integration.py` - Connected services
- `insight.py` - Generated insights

### Configuration

**config/settings.py** - Central configuration
- Environment-based settings
- Service credentials
- Feature flags

**database/migrations/** - Alembic migrations
- Version-controlled schema changes
- Use `alembic upgrade head` to apply

## Development Workflow

### Environment Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Initialize database
alembic upgrade head

# Verify setup
python verify_setup.py
```

### Running Services

```bash
# Start all services (API, Celery, Redis, PostgreSQL)
docker-compose up -d

# Run API server only
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Run Celery worker
celery -A app.tasks.celery_app worker --loglevel=info

# Run Celery beat scheduler
celery -A app.tasks.celery_app beat --loglevel=info
```

### Testing

```bash
# Run all tests
pytest

# Run specific test file
pytest tests/unit/test_agent.py

# Run with coverage
pytest --cov=app --cov-report=html

# Run integration tests
pytest tests/integration/

# Run end-to-end tests
pytest tests/e2e/
```

### Demos

```bash
# Run all demos
python run_demos.py

# Individual demos
python demo_daily_briefing.py
python demo_voice_to_crm.py
python demo_email_responder.py
python instant_demo.py

# Real estate demos
python real_estate_demo.py
python real_estate_deal_finder.py
python sales_tracker.py
```

## Key Patterns

### Agent Decision Flow
1. Event received via API or webhook ’ `app/events/processor.py`
2. Event triggers agent evaluation ’ `app/core/agent.py`
3. Agent queries memory context ’ `app/memory/manager.py`
4. Agent makes decision via MCP ’ `app/integrations/mcp/client.py`
5. Agent executes via task queue ’ `app/tasks/`
6. Results stored in memory and database

### Adding New Integrations
1. Create connector in `app/integrations/connectors/`
2. Add integration model in `app/models/integration.py`
3. Register in `app/integrations/mcp/client.py` for MCP access
4. Add API endpoints in `app/api/integrations.py`
5. Create sync tasks in `app/tasks/sync.py`

### Memory Management
- Short-term context: `app/memory/cache/`
- Long-term context: `app/memory/vector_store/`
- Query relevant context before agent decisions
- Update memory after significant events

## Database

### Running Migrations

```bash
# Create new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback one revision
alembic downgrade -1

# View current version
alembic current
```

## Deployment

### Production Checklist
```bash
# Run production readiness check
python scripts/production_readiness_check.py

# Quick health check
bash quick_check.sh
```

### Docker Deployment
```bash
# Build images
docker-compose build

# Deploy stack
docker-compose up -d

# View logs
docker-compose logs -f app

# Scale workers
docker-compose up -d --scale worker=3
```

## Project Structure Notes

- **Root-level Python files** - Legacy/migration files, functionality moved to `app/`
- **claude/** - Documentation and architectural guidance for Claude Code
- **scripts/** - Deployment, setup, and maintenance utilities
- **infrastructure/** - Docker and Kubernetes configurations
- **tests/** - Test suite organized by type (unit/integration/e2e)

## Environment Variables

Key variables in `.env`:
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection for Celery
- `ANTHROPIC_API_KEY` - Claude AI API key
- `MCP_SERVER_URL` - MCP server endpoint
- `GITHUB_TOKEN` - GitHub API access
- `GOOGLE_CREDENTIALS` - Google service account JSON
