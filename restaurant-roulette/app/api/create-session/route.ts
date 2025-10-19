// app/api/create-session/route.ts
import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { data, error } = await supabase
    .from('sessions')
    .insert([{}]) // created_at は DB側で自動設定
    .select();

  if (error || !data || data.length == 0) {
    console.error("supabase error", error)
    return NextResponse.json({ error: error?.message ?? 'Failed to create session' }, { status: 500 });
  }

  return NextResponse.json({ session_id: data[0].id }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ message: "このAPIはPOST専用です" }, { status: 405 });
}
