import { NextResponse } from 'next/server';

const ADS_TXT = 'google.com, pub-9667530069853985, DIRECT, f08c47fec0942fa0\n';

export async function GET() {
  return new NextResponse(ADS_TXT, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
