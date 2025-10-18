import { fromAPIDTO } from "@/server/hotpepper/fromAPIDTO";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    //クエリパラメータから、lat,lng,radius,budget,genreを取得する
    const searchParams = request.nextUrl.searchParams
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")
    const range = searchParams.get("range")
    const genre = searchParams.get("genre")
    const budget = searchParams.get("budget")
    const order = 4 //人気順
    const start = 1 //ランダムにする
    const count = 100 //一旦
    const format = "json"

    const apiKey = process.env.HOTPEPPER_API_KEY
    const url = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${apiKey}&lat=${lat}&lng=${lng}&range=${range}&genre=${genre}&budget=${budget}&order=${order}&start=${start}&format=${format}&count=${count}`

    try{
        const res = await fetch(url) //サーバーサイドで安全にfetch。fetchはURLから情報を取ってくる処理。返ってきているのはHTTPレスポンスオブジェクトらしい
        if(!res.ok){ //HTTPステータスコードが200のときres.ok = trueで正常にやり取りできたことを示す。それ以外の時はエラーが書かれたjsonを返す
            return NextResponse.json({error: "Failed to fetch hot pepper API"}, {status: res.status})
        }
        const data = await res.json() as fromAPIDTO; //HTTPレスポンスオブジェクトのボディ部分をJSONとして切り出す
        
        return NextResponse.json(data); //最終的に返すJSONレスポンスを作るところ
    }
    catch (error){ //ネットワークエラーや構文エラーをひろう。500番台のステータスコードでサーバー関連のエラーであることを通知する。
        return NextResponse.json({error: 'Unexpected error occurred'}, {status: 500})
    }
}