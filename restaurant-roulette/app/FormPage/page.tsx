'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Header } from "../../components/layout/Header";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Checkbox } from "../../components/ui/checkbox";

export default function HomePage() {
    const router = useRouter();
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [shareUrl, setShareUrl] = useState("");
    const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

    // 共有ボタンを押したとき
    const handleShare = () => {
        const uuid = crypto.randomUUID();
        const url = `${window.location.origin}/share?id=${uuid}`;
        setShareUrl(url);
        setIsShareOpen(true);
    };

    // LINE共有
    const shareToLINE = () => {
        const text = encodeURIComponent("一緒にお店を決めよう！");
        const url = encodeURIComponent(shareUrl);
        window.open(`https://line.me/R/msg/text/?${text}%0A${url}`, "_blank");
    };

    // X共有
    const shareToX = () => {
        const text = encodeURIComponent("一緒にお店を選ぼう！");
        const url = encodeURIComponent(shareUrl);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
    };

    // URLコピー
    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(shareUrl);
        alert("URLをコピーしました！");
    };

    // キーワードリスト
    const keywordOptions = ["ラーメン", "寿司", "焼肉", "イタリアン", "居酒屋"];

    // 選択トグル
    const toggleKeyword = (keyword: string) => {
        setSelectedKeywords((prev) =>
            prev.includes(keyword)
                ? prev.filter((k) => k !== keyword)
                : [...prev, keyword]
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
            <Header />

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 pb-20">
                <div className="w-full max-w-md">
                    {/* Search Card */}
                    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                        <CardContent className="pt-8 pb-8 px-6 space-y-5">
                            {/* Search Radius */}
                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground">Search Radius</label>
                                <Select defaultValue="1000">
                                    <SelectTrigger className="w-full bg-input-background border-border/50 rounded-xl h-12">
                                        <SelectValue placeholder="Select radius" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="500">300m</SelectItem>
                                        <SelectItem value="800">500m</SelectItem>
                                        <SelectItem value="1000">1000m</SelectItem>
                                        <SelectItem value="1500">1500m</SelectItem>
                                        <SelectItem value="2000">2000m</SelectItem>
                                        <SelectItem value="3000">2500m</SelectItem>
                                        <SelectItem value="4000">3000m</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Budget */}
                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground">Budget</label>
                                <Select defaultValue="under-1000">
                                    <SelectTrigger className="w-full bg-input-background border-border/50 rounded-xl h-12">
                                        <SelectValue placeholder="Select budget" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="under-1000">1000円以下</SelectItem>
                                        <SelectItem value="under-2000">2000円以下</SelectItem>
                                        <SelectItem value="under-3000">3000円以下</SelectItem>
                                        <SelectItem value="under-4000">4000円以下</SelectItem>
                                        <SelectItem value="under-5000">5000円以下</SelectItem>
                                        <SelectItem value="under-10000">10000円以下</SelectItem>
                                        <SelectItem value="no-designation">おまかせ</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Keyword Multi Select */}
                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground">Key Word</label>

                                {/* おまかせを選ぶチェックボックス */}
                                <div className="flex items-center space-x-2 py-1">
                                    <Checkbox
                                        id="おまかせ"
                                        checked={selectedKeywords.length === 0} // 他が選ばれていなければON
                                        onCheckedChange={() => setSelectedKeywords([])} // 全解除
                                    />
                                    <label
                                        htmlFor="おまかせ"
                                        className="text-sm leading-none peer-disabled:cursor-not-allowed"
                                    >
                                        おまかせ
                                    </label>
                                </div>

                                {/* 通常のキーワードを複数選択可能に */}
                                {keywordOptions.map((keyword) => (
                                    <div key={keyword} className="flex items-center space-x-2 py-1">
                                        <Checkbox
                                            id={keyword}
                                            checked={selectedKeywords.includes(keyword)}
                                            onCheckedChange={() => {
                                                setSelectedKeywords((prev) =>
                                                    prev.includes(keyword)
                                                        ? prev.filter((k) => k !== keyword)
                                                        : [...prev, keyword]
                                                );
                                            }}
                                        />
                                        <label
                                            htmlFor={keyword}
                                            className="text-sm leading-none peer-disabled:cursor-not-allowed"
                                        >
                                            {keyword}
                                        </label>
                                    </div>
                                ))}
                            </div>

                        </CardContent>
                    </Card>

                    {/* Buttons */}
                    <div className="mt-8 space-y-3">
                        <Button
                            className="w-full h-14 rounded-2xl bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 hover:from-orange-500 hover:via-pink-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                            onClick={() => router.push("/PackAnimation")}
                        >
                            条件に合うお店を取得
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full h-14 rounded-2xl border-pink-500 text-pink-600 hover:bg-pink-50 transition-all"
                            onClick={handleShare}
                        >
                            友達と共有
                        </Button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 px-4 text-center">
                <p className="text-sm text-muted-foreground">Powered by Hot Pepper API</p>
            </footer>

            {/* 共有モーダル */}
            <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
                <DialogContent className="rounded-2xl">
                    <DialogHeader>
                        <DialogTitle>共有方法を選択</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-3 mt-4">
                        <Button onClick={shareToLINE} className="bg-green-500 hover:bg-green-600 text-white">
                            LINEで共有
                        </Button>
                        <Button onClick={shareToX} className="bg-black text-white hover:bg-gray-800">
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
