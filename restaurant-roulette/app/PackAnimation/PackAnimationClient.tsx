"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import PackOpening from "../../components/animation/PackOpening";
import { HotpepperShop } from "../../types/HotpepperShop";
import { getOrCreateUserId } from "@/utils/user";

export default function PackAnimationClient() {
  const searchParams = useSearchParams();
  const [shops, setShops] = useState<HotpepperShop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const range = searchParams.get("range");
    const budget = searchParams.get("budget");
    const genre = searchParams.get("genre");

    if (!lat || !lng) {
      setError("位置情報が取得できませんでした");
      setLoading(false);
      return;
    }

    const fetchShops = async () => {
      try {
        const params = new URLSearchParams({
          lat,
          lng,
          range: range || "3",
          budget: budget || "B010",
          genre: genre || "",
        });
        const res = await fetch(`/api/hotpepper?${params.toString()}`);
        if (!res.ok) throw new Error("API取得失敗");
        const data: HotpepperShop[] = await res.json();
        setShops(data);
        await fetchDB(data);
      } catch (e: any) {
        setError(e.message || "予期せぬエラー");
      } finally {
        setLoading(false);
      }
    };

    const fetchDB = async (shops: HotpepperShop[]) => {
      try {
        const session = await fetch("/api/create-session", { method: "POST" });
        const { session_id } = await session.json();
        localStorage.setItem("session_id", session_id);

        shops.forEach(async (shop) => {
          await fetch(`/api/register-shop?shop_id=${shop.shop_id}&session_id=${session_id}&name=${shop.name}&address=${shop.address}&genre=${shop.genre}&distance=${shop.distance}&budget=${shop.budget}&open=${shop.open}&comment=${shop.comment}&url=${shop.url}&photo=${shop.photo}&lat=${shop.lat}&lng=${shop.lng}`, { method: "POST" });
        });

        const user_id = getOrCreateUserId();
        await fetch(`/api/register-user?user_id=${user_id}&session_id=${session_id}`, { method: "POST" });
      } catch (e: any) {
        setError(e.message || "予期せぬエラー");
      }
    };

    fetchShops();
  }, [searchParams]);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;

  return <PackOpening initialshops={shops} />;
}