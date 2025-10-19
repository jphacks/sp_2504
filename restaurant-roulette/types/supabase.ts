// types/supabase.ts

export type Session = {
  id: string; // UUID
  created_at: string; // ISO timestamp
};

export type User = {
  id: string; // UUID
  session_id: string; // UUID
  joined_at: string; // ISO timestamp
};

export type Shop = {
  id: string; // HotPepperAPIの店舗ID
  session_id: string; // UUID

  name: string;
  address: string | null;
  genre: string | null;
  distance: string | null;
  budget: string | null;
  open: string | null;
  comment: string | null;
  url: string | null;
  photo: string | null;
  lat: number | null;
  lng: number | null;

  created_at: string; // ISO timestamp
};

export type Vote = {
  id: string; // UUID
  user_id: string; // UUID
  shop_id: string; // HotPepperAPIの店舗ID
  session_id: string; // UUID
  created_at: string; // ISO timestamp
};