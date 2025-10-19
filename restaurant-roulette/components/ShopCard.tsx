//ShopCard.tsx

import { ImageWithFallback } from "./image/ImageWithFallback";
import { Badge } from "./ui/badge";
import { MapPin, ExternalLink, Clock, DollarSign, Navigation } from "lucide-react";
import { HotpepperShop } from "../types/HotpepperShop";

export function ShopCard({
    name,
    address,
    genre,
    distance,
    budget,
    open,
    comment,
    url,
    photo,
    lat,
    lng
}: HotpepperShop) {
    const genreColors: Record<string, string> = {
        居酒屋: "bg-amber-600",
        "ダイニングバー・バル": "bg-rose-500",
        創作料理: "bg-pink-500",
        和食: "bg-red-500",
        洋食: "bg-blue-500",
        "イタリアン・フレンチ": "bg-green-500",
        中華: "bg-yellow-500",
        "焼肉・ホルモン": "bg-orange-700",
        韓国料理: "bg-red-400",
        "アジア・エスニック料理": "bg-lime-500",
        各国料理: "bg-cyan-500",
        "カラオケ・パーティ": "bg-purple-500",
        "バー・カクテル": "bg-indigo-500",
        ラーメン: "bg-red-600",
        "お好み焼き・もんじゃ": "bg-orange-600",
        "カフェ・スイーツ": "bg-orange-400",
        その他グルメ: "bg-gray-500",
    };

    return (
        <div className="w-[320px] h-[450px] bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-100 rounded-2xl p-4 shadow-2xl border-8 border-yellow-400 relative overflow-hidden">
            {/* ホログラフィック効果 */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-30 pointer-events-none"></div>

            <div className="relative z-10 h-full flex flex-col">
                {/* ヘッダー */}
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        <h2 className="text-black truncate">{name}</h2>
                        <Badge className={`${genreColors[genre] || "bg-gray-500"} text-white px-2 py-0.5 text-xs flex-shrink-0`}>
                            {genre}
                        </Badge>
                    </div>
                </div>

                {/* お店画像 */}
                <div className="bg-gradient-to-br from-white to-gray-100 rounded-lg p-2 mb-3 border-2 border-yellow-300 flex-shrink-0">
                    <ImageWithFallback
                        src={photo}
                        alt={name}
                        className="w-full h-[140px] object-cover rounded"
                    />
                </div>

                {/* 内容 */}
                <div className="space-y-2 mb-3 flex-grow overflow-y-auto">
                    {/* 住所 */}
                    <div className="bg-white/80 rounded-lg p-2 border border-yellow-300">
                        <div className="flex items-start gap-2">
                            <MapPin className="w-3 h-3 text-red-500 flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-black break-words">{address}</p>
                            </div>
                        </div>
                    </div>

                    {/* URL */}
                    <div className="bg-white/80 rounded-lg p-2 border border-yellow-300">
                        <div className="flex items-center gap-2">
                            <ExternalLink className="w-3 h-3 text-blue-500 flex-shrink-0" />
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:underline truncate"
                            >
                                お店のページ
                            </a>
                        </div>
                    </div>

                    {/* 距離・予算・営業時間 */}
                    <div className="bg-white/80 rounded-lg p-2 border border-yellow-300 space-y-1">
                        <div className="flex items-center gap-2">
                            <Navigation className="w-3 h-3 text-green-500 flex-shrink-0" />
                            <span className="text-xs text-black">{distance}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-3 h-3 text-yellow-600 flex-shrink-0" />
                            <span className="text-xs text-black">{budget}</span>
                        </div>
                        {open && (
                            <div className="flex items-center gap-2">
                                <Clock className="w-3 h-3 text-purple-500 flex-shrink-0" />
                                <span className="text-xs text-black">{open}</span>
                            </div>
                        )}
                    </div>

                    {/* コメント */}
                    {comment && (
                        <div className="bg-white/80 rounded-lg p-2 border border-yellow-300">
                            <p className="text-xs text-gray-700">{comment}</p>
                        </div>
                    )}
                </div>

                {/* フッター情報 */}
                <div className="space-y-1 text-xs pt-2 border-t border-yellow-300">
                    <div className="flex justify-between items-center">
                        <Badge className="bg-yellow-500 text-white px-2 py-0.5 text-xs">
                            レア
                        </Badge>
                        <button
                            onClick={() =>
                                window.open(
                                    `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
                                    "_blank"
                                )
                            }
                            className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <MapPin className="w-4 h-4 text-red-500" />
                            <span className="text-xs underline">Google Map</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
