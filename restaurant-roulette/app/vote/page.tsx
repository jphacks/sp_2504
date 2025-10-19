"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HotpepperShop } from "../../types/HotpepperShop";
import { VoteShop } from "./VoteShop";

export default function VotePage() {
    const router = useRouter();
    const [shops, setShops] = useState<HotpepperShop[]>([]);
    const [voteCounts, setVoteCounts] = useState<number[]>([]);
    const [votedShops, setVotedShops] = useState<Set<number>>(new Set());

    useEffect(() => {
        try {
            const storedShops = localStorage.getItem("lotteryShops");
            if (storedShops) {
                const parsedShops: HotpepperShop[] = JSON.parse(storedShops);
                setShops(parsedShops);
                setVoteCounts(parsedShops.map(() => 0)); // 初期投票数
                console.log("localStorageからshopsを読み込みました:", parsedShops);
            } else {
                console.warn("localStorageにショップデータがありません");
            }
        } catch (error) {
            console.error("localStorageの読み込みに失敗:", error);
        }
    }, []);

    const handleVote = (index: number) => {
        if (votedShops.has(index)) {
            // すでに投票していたら取り消す
            setVoteCounts((prev) => {
                const newCounts = [...prev];
                newCounts[index] = Math.max(0, newCounts[index] - 1);
                return newCounts;
            });
            setVotedShops((prev) => {
                const newSet = new Set(prev);
                newSet.delete(index);
                return newSet;
            });
        } else {
            // 新しく投票する
            setVoteCounts((prev) => {
                const newCounts = [...prev];
                newCounts[index] += 1;
                return newCounts;
            });
            setVotedShops((prev) => new Set(prev).add(index));
        }
    };

    // 抽選開始ボタン押下
    const handleStartLottery = () => {
        if (shops.length === 0) {
            alert("ショップデータがありません。");
            return;
        }

        localStorage.setItem("lotteryShops", JSON.stringify(shops));
        localStorage.setItem("lotteryVotes", JSON.stringify(voteCounts));
        router.push("/LotteryAnimation");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-white mb-2 text-3xl font-bold">お店カード投票</h1>
                    <p className="text-blue-200">お気に入りのお店に投票しよう！</p>
                </div>

                {/* ローディング or データがない場合 */}
                {shops.length === 0 ? (
                    <p className="text-center text-gray-300">お店データを読み込んでいます...</p>
                ) : (
                    <div className="flex flex-wrap gap-8 justify-center">
                        {shops.map((shop, index) => (
                            <VoteShop
                                key={index}
                                shop={shop}
                                voteCount={voteCounts[index]}
                                hasVoted={votedShops.has(index)}
                                onVote={() => handleVote(index)}
                            />
                        ))}
                    </div>
                )}

                {/* 抽選開始ボタン */}
                <div className="mt-12 flex justify-center">
                    <button
                        onClick={handleStartLottery}
                        className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg shadow-lg transition-all"
                        disabled={shops.length === 0}
                    >
                        抽選開始
                    </button>
                </div>
            </div>
        </div>
    );
}
