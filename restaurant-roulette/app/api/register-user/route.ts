import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get('user_id');
  const session_id = searchParams.get('session_id');

  if (!user_id || !session_id) {
    return NextResponse.json({ error: 'Missing user_id or session_id' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        id: user_id,
        session_id: session_id,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ user: data }, { status: 200 });
}
