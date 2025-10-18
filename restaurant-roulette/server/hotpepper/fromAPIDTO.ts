export interface fromAPIDTO {
    results: Results;
}

export interface Results {
    api_version:       string;
    results_available: string;
    results_returned:  string;
    results_start:     string;
    shop:              Shop[];
}

export interface Shop {
    id:                 string;
    name:               string;
    logo_image:         string;
    name_kana:          string;
    address:            string;
    station_name:       string;
    ktai_coupon:        string;
    large_service_area: Area;
    service_area:       Area;
    large_area:         Area;
    middle_area:        Area;
    small_area:         Area;
    lat:                string;
    lng:                string;
    genre:              Genre;
    sub_genre:          SubGenre;
    budget:             Budget;
    catch:              string;
    capacity:           string;
    access:             string;
    mobile_access:      string;
    urls:               Urls;
    photo:              Photo;
    open:               string;
    close:              string;
    party_capacity:     string;
    other_memo:         string;
    shop_detail_memo:   string;
    budget_memo:        string;
    wedding:            string;
    course:             string;
    free_drink:         string;
    free_food:          string;
    private_room:       string;
    horigotatsu:        string;
    tatami:             string;
    card:               string;
    non_smoking:        string;
    charter:            string;
    parking:            string;
    barrier_free:       string;
    show:               string;
    karaoke:            string;
    band:               string;
    tv:                 string;
    lunch:              string;
    midnight:           string;
    english:            string;
    pet:                string;
    child:              string;
    wifi:               string;
    coupon_urls:        CouponUrls;
}

export interface Budget {
    code:    string;
    name:    string;
    average: string;
}

export interface CouponUrls {
    pc: string;
    sp: string;
}

export interface Genre {
    name:  string;
    catch: string;
    code:  string;
}
export interface SubGenre {
    name: string;
    code: string;
}
export interface Area {
    code: string;
    name: string;
}

export interface Photo {
    pc:     PC;
    mobile: Mobile;
}

export interface Mobile {
    l: string;
    s: string;
}

export interface PC {
    l: string;
    m: string;
    s: string;
}

export interface Urls {
    pc: string;
}