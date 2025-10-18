import { HotpepperShop } from "@/types/HotpepperShop";
import { fromAPIDTO } from "./fromAPIDTO";
import { ServerShop } from "./ServerShop";

export class HotpepperServer {
    private shops: ServerShop[] //フェッチしてきたデータを店舗ごとの型として保持
    private constructor(){}
    static fromAPIDTO(dto: fromAPIDTO) : HotpepperServer{

    }
    public toClientDTO(): HotpepperShop[] {

    }
}