"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HotpepperShop } from "../../types/HotpepperShop";
import { VoteShop } from "./VoteShop";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import {QRCodeCanvas} from "qrcode.react";

export default function VotePage() {
    const router = useRouter();
    const [shops, setShops] = useState<HotpepperShop[]>([]);
    const [voteCounts, setVoteCounts] = useState<number[]>([]);
    const [votedShops, setVotedShops] = useState<Set<number>>(new Set());
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [shareUrl, setShareUrl] = useState("");
    //const session_id = useState<string>();

    // --- 共有ボタン ---
    const handleShare = () => {
        const sessionId = localStorage.getItem("session_id");
        const url = `${window.location.origin}/gestvote?session_id=${sessionId}`;
        setShareUrl(url);
        setIsShareOpen(true);
    };

    const shareToLINE = () => {
        const text = encodeURIComponent("一緒にお店を決めよう！");
        const url = encodeURIComponent(shareUrl);
        window.open(`https://line.me/R/msg/text/?${text}%0A${url}`, "_blank");
    };

    const shareToX = () => {
        const text = encodeURIComponent("一緒にお店を選ぼう！");
        const url = encodeURIComponent(shareUrl);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(shareUrl);
        alert("URLをコピーしました！");
    };

    useEffect(() => {
        try {
            const storedShops = localStorage.getItem("lotteryShops");
            if (storedShops) {
                const parsedShops: HotpepperShop[] = JSON.parse(storedShops);
                setShops(parsedShops);
                setVoteCounts(parsedShops.map(() => 0));
            }
        } catch (error) {
            console.error("localStorageの読み込みに失敗:", error);
        }
    }, []);

    const handleVote = (index: number) => {
        if (votedShops.has(index)) {
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
            setVoteCounts((prev) => {
                const newCounts = [...prev];
                newCounts[index] += 1;
                return newCounts;
            });
            setVotedShops((prev) => new Set(prev).add(index));
        }
    };

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
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                {/* タイトル */}
                <div className="text-center mb-6 sm:mb-12">
                    <h1 className="text-white mb-2 text-3xl sm:text-4xl font-bold">お店カード投票</h1>
                    <p className="text-blue-200 text-sm sm:text-base">お気に入りのお店に投票しよう！</p>
                </div>

                {/* 共有ボタン */}
                <div className="flex justify-center mb-6 sm:mb-12">
                    <Button
                        onClick={handleShare}
                        className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-lg shadow-md transition-all"
                    >
                        友達と共有ボタン
                    </Button>
                </div>

                {/* 投票カード */}
                {shops.length === 0 ? (
                    <p className="text-center text-gray-300">お店データを読み込んでいます...</p>
                ) : (
                    <div className="flex flex-wrap gap-6 justify-center">
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
                <div className="mt-8 sm:mt-12 flex justify-center">
                    <Button
                        onClick={handleStartLottery}
                        className="px-6 sm:px-8 py-3 sm:py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg shadow-lg transition-all"
                        disabled={shops.length === 0}
                    >
                        抽選開始
                    </Button>
                </div>
            </div>

            {/* --- 共有モーダル --- */}
            <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
                <DialogContent className="rounded-2xl sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>共有方法を選択</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-3 mt-4">
                        <Button onClick={shareToLINE} className="bg-green-500 text-white">
                            LINEで共有
                        </Button>
                        <Button onClick={shareToX} className="bg-black text-white">
                            X（旧Twitter）で共有
                        </Button>
                        <Button variant="outline" onClick={copyToClipboard}>
                            URLをコピー
                        </Button>
                    </div>
                    <div>
                        <QRCodeCanvas value={shareUrl} size={256} />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
