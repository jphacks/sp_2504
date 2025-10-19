/*
"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { HotpepperShop } from "../../types/HotpepperShop";
import { VoteShop } from "../vote//VoteShop";
import { Button } from "../../components/ui/button";

export default function GuestVotePage() {
    const [shops, setShops] = useState<HotpepperShop[]>([]);
    const [votedShops, setVotedShops] = useState<Set<number>>(new Set());
    const [submitted, setSubmitted] = useState(false);

    const guestSessionId = crypto.randomUUID(); // Guest識別ID

    // --- Supabaseからお店データ取得 ---
    useEffect(() => {
        const fetchShops = async () => {
            const { data, error } = await supabase.from("shops").select("*");
            if (error) {
                console.error("ショップ取得失敗:", error);
                return;
            }
            if (data) setShops(data);
        };
        fetchShops();
    }, []);

    // --- 投票選択 ---
    const handleVote = (index: number) => {
        setVotedShops(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) newSet.delete(index);
            else newSet.add(index);
            return newSet;
        });
    };

    // --- 投票送信 ---
    const handleSubmitVote = async () => {
        if (votedShops.size === 0) {
            alert("1つ以上のお店を選んでください。");
            return;
        }

        try {
            await supabase.from("votegest").insert({
                session_id: guestSessionId,
                votes: Array.from(votedShops),
                finished_at: new Date()
            });
            setSubmitted(true);
        } catch (err) {
            console.error(err);
            alert("投票送信に失敗しました。");
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 text-white p-4">
                <h2 className="text-2xl font-bold text-center">
                    投票を送信しました！<br />
                    Hostの結果をお待ちください。
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6 sm:mb-12">
                    <h1 className="text-white mb-2 text-3xl sm:text-4xl font-bold">お店に投票しよう！</h1>
                    <p className="text-blue-200 text-sm sm:text-base">選んだお店を Host に送信します</p>
                </div>

                {shops.length === 0 ? (
                    <p className="text-center text-gray-300">お店データを読み込んでいます...</p>
                ) : (
                    <div className="flex flex-wrap gap-6 justify-center">
                        {shops.map((shop, index) => (
                            <VoteShop
                                key={index}
                                shop={shop}
                                voteCount={0} // Guestは自分の選択のみ
                                hasVoted={votedShops.has(index)}
                                onVote={() => handleVote(index)}
                            />
                        ))}
                    </div>
                )}

                <div className="mt-8 sm:mt-12 flex justify-center">
                    <Button
                        onClick={handleSubmitVote}
                        className="px-6 sm:px-8 py-3 sm:py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg transition-all"
                        disabled={shops.length === 0}
                    >
                        投票を送信
                    </Button>
                </div>
            </div>
        </div>
    );
}
*/