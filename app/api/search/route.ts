import { NextRequest, NextResponse } from 'next/server';
import { searchDentists } from '@/lib/dentist-data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get('q') || '';
  const state = searchParams.get('state') || undefined;
  const type = searchParams.get('type') || undefined;
  const city = searchParams.get('city') || undefined;
  const emergency = searchParams.get('emergency') === 'true';
  const sedation = searchParams.get('sedation') === 'true';

  try {
    const dentists = await searchDentists(q, {
      state,
      type,
      city,
      emergency: emergency || undefined,
      sedation: sedation || undefined,
    });

    return NextResponse.json({
      dentists,
      total: dentists.length,
      query: q,
      filters: { state, type, city, emergency, sedation },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
