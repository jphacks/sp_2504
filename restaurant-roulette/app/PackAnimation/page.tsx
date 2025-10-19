"use client";

//app/PackAnimation/page.tsx

import { HotpepperShop } from "../../types/HotpepperShop"
import { useSearchParams } from "next/navigation";
import PackOpening from "../../components/animation/PackOpening"
import { useState, useEffect } from "react"

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
            } catch (e: any) {
                console.error(e);
                setError(e.message || "予期せぬエラー");
            } finally {
                setLoading(false);
            }
        };

        fetchShops();
    }, [searchParams]);

    if (loading) return <p>読み込み中...</p>;
    if (error) return <p>エラー: {error}</p>;

    return (
        <main className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-accent/20">
            <PackOpening initialshops={shops} />
        </main>
    )
}
