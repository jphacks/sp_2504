import { supabaseAdmin } from '@/lib/supabase-admin';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get('session_id');

  if (!session_id) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from('sessions')
    .delete()
    .eq('id', session_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Session deleted successfully' }, { status: 200 });
}
