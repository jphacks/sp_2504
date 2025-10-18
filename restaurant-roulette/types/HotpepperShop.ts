//サーバー-クライアントDTO
//クライアント内で使うものしか持たない

export interface HotpepperShop {
  name: string;         // 店舗名
  address: string;      // 住所
  genre: string;        // ジャンル名
  distance: string;     // 距離（例: "500m"）
  budget: string;       // 予算（例: "〜1000円"）
  open: string | null;  // 営業時間（例: "11:00〜22:00"）
  comment: string;      // コメントや紹介文
  url: string;          // 店舗ページURL
  photo: string;        // 画像URL
  lat: number;          // 緯度（Google Maps用）
  lng: number;          // 経度（Google Maps用）
}

export type BudgetCode =
  | "B009" | "B010" | "B011" | "B001" | "B002"
  | "B003" | "B008" | "B004" | "B005" | "B006"
  | "B012" | "B013" | "B014"; 
export const BudgetMap: Record<string, string> = {
  B009: "～500円",
  B010: "501～1000円",
  B011: "1001～1500円",
  B001: "1501～2000円",
  B002: "2001～3000円",
  B003: "3001～4000円",
  B008: "4001～5000円",
  B004: "5001～7000円",
  B005: "7001～10000円",
  B006: "10001～15000円",
  B012: "15001～20000円",
  B013: "20001～30000円",
  B014: "30001円～",
};

export type GenreCode =
  | "G001" | "G002" | "G003" | "G004" | "G005" | "G006"
  | "G007" | "G008" | "G017" | "G009" | "G010" | "G011"
  | "G012" | "G013" | "G016" | "G014" | "G015";

export const GenreLabels: Record<GenreCode, string> = {
  G001: "居酒屋",
  G002: "ダイニングバー・バル",
  G003: "創作料理",
  G004: "和食",
  G005: "洋食",
  G006: "イタリアン・フレンチ",
  G007: "中華",
  G008: "焼肉・ホルモン",
  G017: "韓国料理",
  G009: "アジア・エスニック料理",
  G010: "各国料理",
  G011: "カラオケ・パーティ",
  G012: "バー・カクテル",
  G013: "ラーメン",
  G016: "お好み焼き・もんじゃ",
  G014: "カフェ・スイーツ",
  G015: "その他グルメ",
};
