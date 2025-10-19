// app/api/create-session/route.ts
import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { data, error } = await supabase
    .from('sessions')
    .insert([{}]) // created_at は DB側で自動設定
    .select()
    .single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? 'Failed to create session' }, { status: 500 });
  }

  return NextResponse.json({ session_id: data.id }, { status: 200 });
}