//server/hotpepperServer.ts

import { HotpepperShop } from "@/types/HotpepperShop";
import { fromAPIDTO, Shop } from "./fromAPIDTO";
import { BudgetRange, GenreType, Openinghours, ServerShop, Time } from "./ServerShop";
import { getDistance } from "geolib";

export class HotpepperServer {
    private readonly geolibAccuracy = 10;
    //フェッチしてきたデータを店舗ごとの型として保持
    private constructor(
        private shops: ServerShop[]
    ) { }
    static fromAPIDTO(dto: fromAPIDTO): HotpepperServer {
        let shops: ServerShop[] = dto.results.shop.map((rawShop): ServerShop => ({
            name: rawShop.name,
            address: rawShop.address,
            location: { latitude: Number(rawShop.lat), longitude: Number(rawShop.lng) },
            genre: this.createGenreType("popopo"),
            openighours: this.createOpeningHours("pepepe"),
            openinghoursstring: rawShop.open,
            bugdet: new BudgetRange(500, 1000),
            comment: rawShop.catch,
            url: rawShop.urls.pc,
            photo: rawShop.photo.pc.l
        }));
        return new HotpepperServer(shops)
    }
    static createGenreType(raw: string): GenreType {
        return "洋食"
    }
    //あのヤバ文字列からデータを抽出
    static createOpeningHours(raw: string): Openinghours {
        return {
            Monday: { open: new Time(1, 0), close: new Time(23, 0) },
            Tuesday: { open: new Time(1, 0), close: new Time(23, 0) },
            Wednesday: { open: new Time(1, 0), close: new Time(23, 0) },
            Thursday: { open: new Time(1, 0), close: new Time(23, 0) },
            Friday: { open: new Time(1, 0), close: new Time(23, 0) },
            Saturday: { open: new Time(1, 0), close: new Time(23, 0) },
            Sunday: { open: new Time(1, 0), close: new Time(23, 0) }
        };
    }
    public toClientDTO(myLat: number, myLng: number): HotpepperShop[] {
        return this.shops.map((rawShop): HotpepperShop => ({
            name: rawShop.name,
            address: rawShop.address,
            genre: rawShop.genre.toString(),
            distance: (getDistance({latitude: myLat, longitude: myLng}, {latitude: rawShop.location.latitude, longitude: rawShop.location.longitude}, this.geolibAccuracy).toString() + "m"),
            budget: rawShop.bugdet.toStringForClient(),
            open: rawShop.openinghoursstring,
            comment: rawShop.comment,
            url: rawShop.url,
            photo: rawShop.photo,
            lat: rawShop.location.latitude,
            lng: rawShop.location.longitude
        }));
    }
}