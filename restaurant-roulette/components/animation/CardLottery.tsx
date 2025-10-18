"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LotteryBox } from "../../components/animation/LotteryBox"
import { Shop, ShopCard } from "../../components/ShopCard";

interface CardLotteryProps {
    shops: Shop[];
    votes: number[];
}

type AnimationState = "inserting" | "shuffling" | "opening" | "drawing" | "revealing" | "complete";

export function CardLottery({ shops, votes }: CardLotteryProps) {
    const [animationState, setAnimationState] = useState<AnimationState>("inserting");
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [drawnShop, setDrawnShop] = useState<Shop | null>(null);
    const [shopsInBox, setShopsInBox] = useState<Shop[]>([]);

    /** 重み付き抽選 */
    const weightedRandomDraw = (shops: Shop[], votes: number[]): Shop => {
        const totalVotes = votes.reduce((sum, v) => sum + v, 0);
        if (totalVotes === 0) return shops[Math.floor(Math.random() * shops.length)];

        let random = Math.random() * totalVotes;
        for (let i = 0; i < shops.length; i++) {
            random -= votes[i];
            if (random <= 0) return shops[i];
        }
        return shops[shops.length - 1];
    };

    /** アニメーションの進行管理 */
    useEffect(() => {
        if (animationState === "inserting") {
            if (currentCardIndex < shops.length) {
                const timer = setTimeout(() => {
                    setShopsInBox((prev) => [...prev, shops[currentCardIndex]]);
                    setCurrentCardIndex((prev) => prev + 1);
                }, 600);
                return () => clearTimeout(timer);
            } else {
                const timer = setTimeout(() => {
                    setAnimationState("shuffling");
                }, 800);
                return () => clearTimeout(timer);
            }
        }

        if (animationState === "shuffling") {
            const timer = setTimeout(() => setAnimationState("opening"), 2000);
            return () => clearTimeout(timer);
        }

        if (animationState === "opening") {
            const timer = setTimeout(() => {
                const drawn = weightedRandomDraw(shops, votes);
                setDrawnShop(drawn);
                setAnimationState("drawing");
            }, 800);
            return () => clearTimeout(timer);
        }

        if (animationState === "drawing") {
            const timer = setTimeout(() => setAnimationState("revealing"), 1000);
            return () => clearTimeout(timer);
        }

        if (animationState === "revealing") {
            const timer = setTimeout(() => setAnimationState("complete"), 1500);
            return () => clearTimeout(timer);
        }
    }, [animationState, currentCardIndex, shops, votes]);

    return (
        <div className="relative w-full min-h-[700px] flex flex-col items-center justify-center">
            {/* カードを1枚ずつボックスに挿入 */}
            <AnimatePresence>
                {animationState === "inserting" && currentCardIndex < shops.length && (
                    <motion.div
                        key={`inserting-${currentCardIndex}`}
                        initial={{ y: -200, opacity: 0, scale: 0.6 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 150, opacity: 0, scale: 0.3 }}
                        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                        className="absolute top-0 z-20"
                    >
                        <ShopCard {...shops[currentCardIndex]} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 抽選ボックス */}
            <div className="relative z-10">
                <LotteryBox
                    isShuffling={animationState === "shuffling"}
                    isOpening={["opening", "drawing", "revealing"].includes(animationState)}
                    cardCount={shopsInBox.length}
                />
            </div>

            {/* 当選カード */}
            <AnimatePresence>
                {drawnShop &&
                    ["drawing", "revealing", "complete"].includes(animationState) && (
                        <motion.div
                            key="drawn-card"
                            initial={{ y: -50, opacity: 0, scale: 0.5, rotateY: 0 }}
                            animate={{
                                y: animationState === "drawing" ? -120 : -160,
                                opacity: 1,
                                scale: animationState === "drawing" ? 0.9 : 1.1,
                                rotateY: ["revealing", "complete"].includes(animationState) ? 360 : 0,
                            }}
                            transition={{
                                duration: animationState === "drawing" ? 0.8 : 1.2,
                                ease: [0.34, 1.56, 0.64, 1],
                            }}
                            className="absolute z-30"
                            style={{ top: "50%" }}
                        >
                            <ShopCard {...drawnShop} />
                        </motion.div>
                    )}
            </AnimatePresence>

            {/* 当選メッセージ */}
            <AnimatePresence>
                {animationState === "complete" && drawnShop && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="absolute bottom-10 text-center z-40"
                    >
                        <div className="bg-white/90 dark:bg-gray-800 rounded-lg px-6 py-4 shadow-xl border border-yellow-300">
                            <h2 className="text-3xl font-bold text-yellow-700 dark:text-yellow-400 mb-2">🎉 当選！ 🎉</h2>
                            <p className="text-xl font-semibold text-gray-800 dark:text-white">{drawnShop.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{drawnShop.genre}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
