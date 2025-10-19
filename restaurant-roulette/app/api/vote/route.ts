import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

//DBへ投票する
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url); //投票したいものがクエリパラメータで送られてくるからそれを受け取る

  const user_id = searchParams.get('user_id');
  const shop_id = searchParams.get('shop_id');
  const session_id = searchParams.get('session_id');
  const weight = Number(searchParams.get('weight'));

  // 手動バリデーション
  if (
    !user_id || !shop_id || !session_id ||
    isNaN(weight) || weight <= 0
  ) {
    return NextResponse.json({ error: 'Invalid query parameters' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('votes')
    .insert([{ user_id, shop_id, session_id, weight }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
