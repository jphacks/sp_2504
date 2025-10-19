//app/FormPage/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Header } from "../../components/layout/Header";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Checkbox } from "../../components/ui/checkbox";
import { BudgetMap, GenreLabels, GenreCode } from "../../types/HotpepperShop";

// --- 検索範囲マップ ---
const RangeMap: Record<string, string> = {
    "500": "1",
    "800": "2",
    "1000": "3",
    "1500": "4",
    "2000": "5",
    "3000": "6",
    "4000": "7",
};

export default function FormPage() {
    const router = useRouter();
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [shareUrl, setShareUrl] = useState("");
    const [selectedGenres, setSelectedGenres] = useState<GenreCode[]>([]);
    const [radius, setRadius] = useState("1000");
    const [budget, setBudget] = useState<keyof typeof BudgetMap>("B010"); // 501〜1000円

    // --- 共有ボタン ---
    const handleShare = () => {
        const uuid = crypto.randomUUID();
        const url = `${window.location.origin}/share?id=${uuid}`;
        setShareUrl(url);
        setIsShareOpen(true);
    };

    // --- 共有関連関数 ---
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

    // --- 検索処理 ---
    async function handleSearch() {
        if (!navigator.geolocation) {
            alert("このブラウザでは位置情報が利用できません。");
            return;
        }

        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const { latitude, longitude } = position.coords;

            const query = new URLSearchParams({
                lat: latitude.toString(),
                lng: longitude.toString(),
                range: RangeMap[radius],
                budget,
                genre: selectedGenres.join(","),
            });

            router.push(`/PackAnimation?${query.toString()}`);
        } catch (error: any) {
            if (error.code === 1) alert("位置情報の使用が拒否されました。");
            else if (error.code === 2) alert("位置情報が取得できませんでした。");
            else if (error.code === 3) alert("位置情報の取得がタイムアウトしました。");
            else alert("位置情報エラーが発生しました。");
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
            <Header />

            <main className="flex-1 flex items-center justify-center px-4 pb-20 mt-6 md:mt-12">
                <div className="w-full max-w-md">
                    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                        <CardContent className="pt-8 pb-8 px-6 space-y-5">

                            {/* --- 検索範囲 --- */}
                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground">検索半径</label>
                                <Select value={radius} onValueChange={setRadius}>
                                    <SelectTrigger className="w-full rounded-xl h-12">
                                        <SelectValue placeholder="Select radius" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(RangeMap).map((r) => (
                                            <SelectItem key={r} value={r}>
                                                {r}m
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* --- 予算 --- */}
                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground">予算</label>
                                <Select value={budget} onValueChange={(v) => setBudget(v as keyof typeof BudgetMap)}>
                                    <SelectTrigger className="w-full rounded-xl h-12">
                                        <SelectValue placeholder="Select budget" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(BudgetMap).map(([code, label]) => (
                                            <SelectItem key={code} value={code}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* --- ジャンル選択 --- */}
                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground">ジャンル</label>
                                <div className="flex items-center space-x-2 py-1">
                                    <Checkbox
                                        id="omakase"
                                        checked={selectedGenres.length === 0}
                                        onCheckedChange={() => setSelectedGenres([])}
                                    />
                                    <label htmlFor="omakase" className="text-sm">
                                        おまかせ
                                    </label>
                                </div>

                                {Object.entries(GenreLabels).map(([code, label]) => (
                                    <div key={code} className="flex items-center space-x-2 py-1">
                                        <Checkbox
                                            id={code}
                                            checked={selectedGenres.includes(code as GenreCode)}
                                            onCheckedChange={() => {
                                                const key = code as GenreCode;
                                                setSelectedGenres((prev) =>
                                                    prev.includes(key)
                                                        ? prev.filter((g) => g !== key)
                                                        : [...prev, key]
                                                );
                                            }}
                                        />
                                        <label htmlFor={code} className="text-sm leading-none">
                                            {label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* --- ボタン --- */}
                    <div className="mt-8 space-y-3">
                        <Button
                            className="w-full h-14 rounded-2xl bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-white shadow-lg hover:scale-[1.02]"
                            onClick={handleSearch}
                        >
                            条件に合うお店を取得
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full h-14 rounded-2xl border-pink-500 text-pink-600 hover:bg-pink-50"
                            onClick={handleShare}
                        >
                            友達と共有
                        </Button>
                    </div>
                </div>
            </main>

            <footer className="py-6 px-4 text-center">
                <p className="text-sm text-muted-foreground">Powered by Hot Pepper API</p>
            </footer>

            {/* --- 共有モーダル --- */}
            <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
                <DialogContent className="rounded-2xl">
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
                </DialogContent>
            </Dialog>
        </div>
    );
}
