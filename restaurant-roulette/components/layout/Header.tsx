// components/layout/Header.tsx

'use client';

import Image from "next/image";

export function Header() {
    return (
        <header className="sticky top-0 z-50 bg-card border-b border-border">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
                {/* アイコン画像を表示 */}
                <Image
                    src="/frame_4.png"   // public/icon.png に置いた場合
                    alt="アプリのアイコン"
                    width={50}        // アイコンサイズ
                    height={50}
                    className="rounded-full"
                />
                <h1 className="text-3xl font-bold">Funeat</h1>
            </div>
        </header>
    );
}
