"use client"

import { motion } from "framer-motion"

interface LotteryBoxProps {
    isShuffling: boolean
    isOpening: boolean
    cardCount: number
}

export function LotteryBox({ isShuffling, isOpening, cardCount }: LotteryBoxProps) {
    return (
        <div className="relative w-64 h-80 flex items-center justify-center">
            {/* ボックス本体 */}
            <motion.div
                animate={
                    isShuffling
                        ? {
                            rotate: [0, -2, 2, -2, 2, 0],
                            x: [0, -3, 3, -3, 3, 0],
                        }
                        : {}
                }
                transition={{
                    duration: 0.5,
                    repeat: isShuffling ? Number.POSITIVE_INFINITY : 0,
                    ease: "easeInOut",
                }}
                className="relative w-full h-full"
            >
                {/* ボックスの側面 */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg shadow-2xl border-4 border-amber-900">
                    {/* 木目調の質感 */}
                    <div
                        className="absolute inset-0 opacity-20 rounded-lg"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
                        }}
                    />

                    {/* ボックスのラベル */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center">
                        <div className="bg-amber-900/50 py-3 px-4 mx-4 rounded">
                            <p className="text-amber-100 font-bold text-lg">{"抽選BOX"}</p>
                            {cardCount > 0 && (
                                <p className="text-amber-200 text-sm mt-1">
                                    {cardCount} {"枚"}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* 蓋 */}
                <motion.div
                    animate={
                        isOpening
                            ? {
                                rotateX: -120,
                                y: -20,
                                z: 50,
                            }
                            : {
                                rotateX: 0,
                                y: 0,
                                z: 0,
                            }
                    }
                    transition={{
                        duration: 0.8,
                        ease: [0.34, 1.56, 0.64, 1],
                    }}
                    style={{
                        transformOrigin: "top center",
                        transformStyle: "preserve-3d",
                    }}
                    className="absolute inset-x-0 top-0 h-16 bg-gradient-to-br from-amber-700 to-amber-900 rounded-t-lg border-4 border-amber-900 shadow-lg"
                >
                    {/* 蓋の取っ手 */}
                    <div className="absolute inset-x-0 top-2 flex justify-center">
                        <div className="w-16 h-3 bg-amber-950 rounded-full shadow-inner" />
                    </div>

                    {/* 蓋の質感 */}
                    <div
                        className="absolute inset-0 opacity-20 rounded-t-lg"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
                        }}
                    />
                </motion.div>

                {/* 開口部（蓋が開いたときに見える） */}
                {isOpening && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-x-4 top-4 h-12 bg-gradient-to-b from-gray-900 to-gray-800 rounded-t-lg shadow-inner"
                    >
                        {/* 暗い内部 */}
                        <div className="absolute inset-0 bg-black/60 rounded-t-lg" />
                    </motion.div>
                )}
            </motion.div>

            {/* シャッフル時のエフェクト */}
            {isShuffling && (
                <>
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-yellow-400/20 rounded-lg blur-xl"
                    />
                    <motion.div
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="w-72 h-72 border-4 border-dashed border-yellow-400/40 rounded-full" />
                    </motion.div>
                </>
            )}
        </div>
    )
}
