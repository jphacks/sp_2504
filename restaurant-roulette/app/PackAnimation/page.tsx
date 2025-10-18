import { HotpepperShop } from "@/types/HotpepperShop"
import PackOpening from "../../components/animation/PackOpening"
import { useEffect } from "react"

export default function PackAnimation() {
    useEffect(() => {
        const data = await fetch(`api/hotpepper?lat=???`)
        const shops = data.json() as HotpepperShop[];
    }, [])

    return (
        <main className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-accent/20">
            <PackOpening />
        </main>
    )
}
