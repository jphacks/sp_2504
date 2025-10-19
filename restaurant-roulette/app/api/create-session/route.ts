import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const expires_at = searchParams.get('expires_at') ?? null;

  const { data, error } = await supabase
    .from('sessions')
    .insert([
      {
        expires_at: expires_at ? new Date(expires_at).toISOString() : null,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ session: data }, { status: 200 });
}
