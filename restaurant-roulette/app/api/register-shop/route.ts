import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const shop = {
    id: searchParams.get('shop_id'),
    session_id: searchParams.get('session_id'),
    name: searchParams.get('name'),
    address: searchParams.get('address'),
    genre: searchParams.get('genre'),
    distance: searchParams.get('distance'),
    budget: searchParams.get('budget'),
    open: searchParams.get('open'),
    comment: searchParams.get('comment'),
    url: searchParams.get('url'),
    photo: searchParams.get('photo'),
    lat: Number(searchParams.get('lat')),
    lng: Number(searchParams.get('lng')),
  };

  if (!shop.id || !shop.session_id || !shop.name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('shops')
    .insert([shop])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ shop: data }, { status: 200 });
}
