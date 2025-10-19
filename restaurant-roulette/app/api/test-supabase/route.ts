// app/api/test-supabase/route.ts
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data, error } = await supabase.from('sessions').select().limit(1);

  if (error) {
    console.error("Supabase接続エラー:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, data }, { status: 200 });
}
