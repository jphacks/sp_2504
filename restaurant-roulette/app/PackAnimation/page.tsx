"use client";

//app/PackAnimation/page.tsx

import { HotpepperShop } from "../../types/HotpepperShop"
import { useSearchParams } from "next/navigation";
import PackOpening from "../../components/animation/PackOpening"
import { useState, useEffect } from "react"
import { getOrCreateUserId } from "@/utils/user";
import { supabase } from "@/lib/supabase";

export default function PackAnimation() {

    const searchParams = useSearchParams(); // URLSearchParamsを取得
    const [shops, setShops] = useState<HotpepperShop[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // クエリパラメータを取得
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

        // APIリクエスト
        const fetchShops = async () => {
            console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
            console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

            try {
                const params = new URLSearchParams({
                    lat,
                    lng,
                    range: range || "3", // デフォルト3
                    budget: budget || "B010",
                    genre: genre || "",
                });
                const res = await fetch(`/api/hotpepper?${params.toString()}`);
                if (!res.ok) throw new Error("API取得失敗");
                const data: HotpepperShop[] = await res.json();
                setShops(data);

                await fetchDB(shops);
            } catch (e: any) {
                console.error('Supabase error:', error);
                setError(e.message || "予期せぬエラー");
            } finally {
                setLoading(false);
            }
        };
        fetchShops();
        //DBとの接続。セッション作成、ショップ登録、ユーザー登録
        const fetchDB = async (shops: HotpepperShop[]) => {
            try{
                const session = await fetch("/api/create-session", {method: "POST"});
                const { session_id } = await await session.json();
                console.log(shops);
                shops.forEach(async (shop) => {
                    console.log("popopo");
                    await fetch(`/api/register-shop?shop_id=${shop.shop_id}&session_id=${session_id}&name=${shop.name}&address=${shop.address}&genre=${shop.genre}&distance=${shop.distance}&budget=${shop.budget}&open=${shop.open}&comment=${shop.comment}&url=${shop.url}&photo=${shop.photo}&lat=${shop.lat}&lng=${shop.lng}`, {method: "POST"})
                });
                const user_id = getOrCreateUserId();
                await fetch(`/api/register-user?user_id=${user_id}&session_id=${session_id}`, {method: "POST"});
            }
            catch(e: any){
                console.error(e);
                setError(e.message || "予期せぬエラー");
            }
        }
    }, [searchParams]);

    if (loading) return <p>読み込み中...</p>;
    if (error) return <p>エラー: {error}</p>;

    return (
        <main className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-accent/20">
            <PackOpening initialshops={shops} />
        </main>
    )
}
