// components/layout/Header.tsx

'use client';

import { Utensils } from 'lucide-react';

export function Header() {

    return (
        <header className="sticky top-0 z-50 bg-card border-b border-border">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
                <Utensils className="w-6 h-6" />
                <h1>アプリケーション名</h1>
            </div>
        </header>
    );
}
