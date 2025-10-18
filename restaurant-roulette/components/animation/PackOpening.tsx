"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"
import { Button } from "../../components/ui/button"
import ShopReveal from "../../components/animation/ShopReveal"
import { Shop } from "../../components/ShopCard"

const SAMPLE_SHOPS: Shop[] = [
    {
        name: "とんかつ田中",
        address: "東京都渋谷区道玄坂2-10-12",
        genre: "和食",
        distance: "500m",
        budget: "〜1000円",
        open: "11:00〜22:00",
        comment: "サクサクのとんかつが自慢！ランチタイムはご飯おかわり自由です。",
        url: "https://example.com/tonkatsu-tanaka",
        photo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
        name: "カフェ・ド・パリ",
        address: "東京都新宿区新宿3-15-8",
        genre: "カフェ",
        distance: "800m",
        budget: "1000円〜2000円",
        open: "9:00〜23:00",
        comment: "落ち着いた雰囲気で、こだわりのコーヒーとスイーツが楽しめます。",
        url: "https://example.com/cafe-de-paris",
        photo: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
        name: "麺屋 龍",
        address: "東京都豊島区池袋2-5-3",
        genre: "ラーメン",
        distance: "1.2km",
        budget: "〜1000円",
        open: "11:00〜翌3:00",
        comment: "濃厚な豚骨スープが絶品！深夜まで営業しているので飲み会帰りにもぴったり。",
        url: "https://example.com/menya-ryu",
        photo: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
]

export default function ShopPackOpening() {
    const [stage, setStage] = useState<"initial" | "opening" | "revealing">("initial")
    const [shops] = useState(SAMPLE_SHOPS)

    // パーティクル座標
    const [particlePositions, setParticlePositions] = useState<{ x: number, y: number }[]>([])

    // クライアントマウント後に初期化
    useEffect(() => {
        const positions = [...Array(20)].map(() => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
        }))
        setParticlePositions(positions)
    }, [])

    const handleOpenPack = () => {
        setStage("opening")
        setTimeout(() => setStage("revealing"), 2000)
    }

    const handleReset = () => {
        setStage("initial")
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900">

            {/* Background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {particlePositions.map((pos, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-2 w-2 rounded-full bg-primary/30"
                        initial={{ x: pos.x, y: pos.y }}
                        animate={{
                            x: [pos.x, Math.random() * window.innerWidth],
                            y: [pos.y, Math.random() * window.innerHeight],
                        }}
                        transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                {stage === "initial" && (
                    <motion.div
                        key="pack"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.2, opacity: 0 }}
                        className="relative z-10 flex flex-col items-center gap-8"
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <motion.div
                                className="relative cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleOpenPack}
                            >
                                <div className="relative h-[400px] w-[280px] rounded-2xl bg-gradient-to-br from-primary via-accent to-primary p-1 shadow-2xl glow-purple">
                                    <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-gradient-to-br from-primary/90 to-accent/90 p-6">
                                        <Sparkles className="mb-4 h-16 w-16 text-primary-foreground" />
                                        <h2 className="text-center font-bold text-2xl text-primary-foreground text-glow">
                                            {"ミステリーパック"}
                                        </h2>
                                        <p className="mt-2 text-center text-primary-foreground/80 text-sm">{"タップして開封！"}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        <Button size="lg" onClick={handleOpenPack} className="glow-purple text-lg">
                            <Sparkles className="mr-2 h-5 w-5" />
                            {"パックを開ける"}
                        </Button>
                    </motion.div>
                )}

                {stage === "opening" && (
                    <motion.div
                        key="opening"
                        initial={{ scale: 1, rotate: 0 }}
                        animate={{ scale: [1, 1.2, 0], rotate: [0, 180, 360], opacity: [1, 1, 0] }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="relative z-10"
                    >
                        <div className="relative h-[400px] w-[280px] rounded-2xl bg-gradient-to-br from-primary via-accent to-primary p-1 shadow-2xl glow-purple">
                            <div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-primary/90 to-accent/90">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Sparkles className="h-24 w-24 text-primary-foreground" />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {stage === "revealing" && <ShopReveal cards={shops} onReset={handleReset} />}
            </AnimatePresence>
        </div>
    )
}
