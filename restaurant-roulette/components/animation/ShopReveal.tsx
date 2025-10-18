"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { RotateCcw, Sparkles } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Shop, ShopCard } from "../../components/ShopCard"

interface CardRevealProps {
    cards: Shop[]
    onReset: () => void
}

export default function ShopReveal({ cards, onReset }: CardRevealProps) {
    const [selectedCard, setSelectedCard] = useState<number | null>(null)
    const router = useRouter()

    const handleGoToVote = () => {
        try {
            localStorage.setItem("lotteryShops", JSON.stringify(cards))
            console.log("cardsをlocalStorageに保存:", cards)
        } catch (error) {
            console.error("localStorageの保存に失敗:", error)
        }

        router.push("/vote")
    }



    return (
        <motion.div
            key="shops"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 w-full max-w-6xl"
        >
            <div className="mb-8 flex items-center justify-between">
                <motion.h2
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="font-bold text-3xl text-foreground text-glow"
                >
                    {"条件に合う営業中のお店が見つかりました！"}
                </motion.h2>
                <Button onClick={onReset} variant="outline" size="lg">
                    <RotateCcw className="mr-2 h-5 w-5" />
                    {"もう一度"}
                </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
                {cards.map((shop, index) => (
                    <motion.div
                        key={index}
                        initial={{
                            y: -500,
                            rotate: Math.random() * 20 - 10,
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            rotate: 0,
                            opacity: 1,
                        }}
                        transition={{
                            delay: index * 0.15,
                            type: "spring",
                            stiffness: 100,
                            damping: 15,
                        }}
                        whileHover={{ scale: 1.05, y: -10 }}
                        onClick={() => setSelectedCard(selectedCard === index ? null : index)}
                        className="cursor-pointer relative z-0 hover:z-10 m-3"
                    >
                        <ShopCard {...shop} />

                        {selectedCard === index && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-2 flex justify-center">
                                <Sparkles className="h-6 w-6 text-primary" />
                            </motion.div>
                        )}

                    </motion.div>
                ))}
            </div>

            {selectedCard !== null && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 rounded-xl bg-card p-6 text-center shadow-xl"
                >
                    <p className="text-card-foreground text-lg">{"カードをクリックして詳細を確認！"}</p>
                </motion.div>
            )}

            <div className="mt-12 flex justify-center">
                <Button
                    size="lg"
                    className="text-lg px-8 py-4"
                    onClick={handleGoToVote}
                >
                    {"投票画面へ"}
                </Button>
            </div>
        </motion.div>
    )
}
