import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Basic health check
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    };

    // Check ChromaDB connection if configured
    if (process.env.CHROMA_URL) {
      try {
        const chromaResponse = await fetch(`${process.env.CHROMA_URL}/api/v1/heartbeat`, {
          timeout: 5000,
        });
        health.chromadb = chromaResponse.ok ? 'connected' : 'disconnected';
      } catch {
        health.chromadb = 'unreachable';
      }
    }

    // Check Supabase connection if configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      health.supabase = 'configured';
    }

    return NextResponse.json(health);
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
