"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { RotateCcw, Sparkles } from "lucide-react"
import { Button } from "../../components/ui/button"
import { ShopCard } from "../../components/ShopCard"
import { HotpepperShop } from "../../types/HotpepperShop"

interface CardRevealProps {
    cards: HotpepperShop[]
}

export default function ShopReveal({ cards }: CardRevealProps) {
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

    const handleBackToForm = () => {
        router.push("/FormPage") // フォームページに戻る
    }

    // cardsが空の場合
    if (cards.length === 0) {
        return (
            <motion.div
                key="no-shops"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative z-10 w-full max-w-6xl text-center"
            >
                <h2 className="font-bold text-3xl text-red-500 mb-6">
                    お店が見つかりませんでした！
                </h2>
                <Button size="lg" className="text-lg px-8 py-4" onClick={handleBackToForm}>
                    フォーム画面へ戻る
                </Button>
            </motion.div>
        )
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
                    className="font-bold text-3xl text-yellow-500 text-glow"
                >
                    {"お店が見つかりました！"}
                </motion.h2>
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

                    </motion.div>
                ))}
            </div>

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
