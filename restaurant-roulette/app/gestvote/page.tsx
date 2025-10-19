import { Suspense } from "react";
import GestVote from "./GestVote";

export default function Page() {
  return (
    <Suspense fallback={<p>読み込み中...</p>}>
      <main className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-accent/20">
        <GestVote />
      </main>
    </Suspense>
  );
}
