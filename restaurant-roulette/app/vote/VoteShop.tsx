//VoteShop.tsx

import { ShopCard, Shop } from "../../components/ShopCard";
import { Button } from "../../components/ui/button";
import { Heart } from "lucide-react";

interface VoteShopProps {
    shop: Shop;
    voteCount: number;
    hasVoted: boolean;
    onVote: () => void;
}

export function VoteShop({ shop, voteCount, hasVoted, onVote }: VoteShopProps) {
    return (
        <div className="flex flex-col items-center gap-4">
            {/* 投票数 */}
            <div
                className={`rounded-full px-6 py-3 shadow-lg flex items-center gap-2 ${hasVoted
                    ? "bg-gradient-to-r from-green-500 to-emerald-600"
                    : "bg-gradient-to-r from-purple-600 to-pink-600"
                    }`}
            >
                <Heart className="w-6 h-6 text-white fill-white" />
                <span className="text-white">{voteCount} 票 {hasVoted && "(投票済み)"}</span>
            </div>

            {/* カード */}
            <div className="transform transition-all duration-300 hover:scale-105">
                <ShopCard {...shop} />
            </div>

            {/* 投票ボタン */}
            <Button
                onClick={onVote}
                className={`w-[280px] h-12 transition-all duration-300 ${hasVoted
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl"
                    : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl"
                    }`}
            >
                <Heart className={`w-5 h-5 mr-2 ${hasVoted ? "fill-white" : ""}`} />
                {hasVoted ? "投票をキャンセル" : "このお店に投票する"}
            </Button>
        </div>
    );
}
