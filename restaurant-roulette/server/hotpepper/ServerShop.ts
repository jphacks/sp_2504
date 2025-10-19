export interface ServerShop {
    name: string
    address: string
    location: Location
    genre: GenreType
    openighours: Openinghours
    openinghoursstring: string
    bugdet: BudgetRange
    comment: string
    url: string
    photo: string
    shop_id: string
}
export interface Location {
    latitude: number
    longitude: number
}
//ジャンルのリテラル型。これ以外の値はありえない型
export type GenreType = 
    "居酒屋" |
    "ダイニングバー"|
    "創作料理"|
    "和食"|
    "洋食"|
    "イタリアン・フレンチ"|
    "中華"|
    "焼肉・ホルモン"|
    "韓国料理"|
    "アジア・エスニック料理"|
    "各国料理"|
    "カラオケ・パーティ"|
    "バー・カクテル"|
    "ラーメン"|
    "お好み焼き・もんじゃ"|
    "カフェ・スイーツ"|
    "その他グルメ";
export type Weekday =
    "Monday"|
    "Tuesday"|
    "Wednesday"|
    "Thursday"|
    "Friday"|
    "Saturday"|
    "Sunday";
//時刻を管理するクラス型、時刻データのアクセスはバグりやすいからカプセル化する
export class Time {
    private hour: number = 0
    private minute: number = 0

    constructor(hour: number, minute:number){
        this.setTime(hour, minute)
    }
    public setTime(hour: number, minute: number){
        if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
            throw new Error('Invalid time')
        }
        this.hour = hour
        this.minute = minute
    }
    public getTime(): {hour: number, minute: number} {
        return {hour: this.hour, minute: this.minute}
    }
    //文字列にするやつ使えるか謎
    public toString(): string {
        return `${this.hour.toString().padStart(2, '0')}:${this.minute.toString().padStart(2, '0')}`
    }
    //時刻同士の比較用
    public isBefore(other: Time): boolean {
        return this.hour * 60 + this.minute < other.hour * 60 + other.minute
    }

}
export interface TimeRange {
    open: Time
    close: Time
}
//キーがWeekdayになっている(openinghours['Monday']のようにアクセスできる)、nullの時は定休日
export type Openinghours = {
    [day in Weekday]?: TimeRange | null
}
export class BudgetRange{
    private readonly min :number
    private readonly max :number
    constructor(min: number, max: number){
        this.min = min
        this.max = max
    }
    public toStringForClient(): string{
        return "500~1000円"
    }
}