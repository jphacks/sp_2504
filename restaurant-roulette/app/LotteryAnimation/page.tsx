"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shop } from "../../components/ShopCard";
import { CardLottery } from "../../components/animation/CardLottery"

export default function LotteryAnimationPage() {
    const router = useRouter();
    const [shops, setShops] = useState<Shop[]>([]);
    const [votes, setVotes] = useState<number[]>([]);

    useEffect(() => {
        // localStorage からデータを取得
        const storedShops = localStorage.getItem("lotteryShops");
        const storedVotes = localStorage.getItem("lotteryVotes");

        if (storedShops && storedVotes) {
            try {
                setShops(JSON.parse(storedShops));
                setVotes(JSON.parse(storedVotes));
            } catch (error) {
                console.error("データの読み込みに失敗しました:", error);
            }
        } else {
            // データがない場合、投票ページに戻る
            router.push("/");
        }
    }, [router]);

    return (
        <main className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-accent/20">
            <CardLottery shops={shops} votes={votes} />
        </main>
    );
}

