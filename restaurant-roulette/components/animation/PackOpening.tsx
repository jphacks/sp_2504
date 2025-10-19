//PackOpening.tsx

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"
import { Button } from "../../components/ui/button"
import ShopReveal from "../../components/animation/ShopReveal"
import { HotpepperShop } from "../../types/HotpepperShop"

export default function ShopPackOpening({ initialshops }: { initialshops: HotpepperShop[] }) {
    const [stage, setStage] = useState<"initial" | "opening" | "revealing">("initial")
    const [shops] = useState(initialshops)

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

                {stage === "revealing" && <ShopReveal cards={shops} />}
            </AnimatePresence>
        </div>
    )
}
