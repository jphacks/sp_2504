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