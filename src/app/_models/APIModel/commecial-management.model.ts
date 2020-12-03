export class MarketCommonModel {
    huyen: string;
    tongsocho: number;
    chohang1: number;
    chohang2: number;
    chohang3: number;
}

export class SuperMarketCommonModel {
    huyen: string;
    ten_tttm: string;
    dientich: number;
    vondautu: number;
    phanloai: string;
    namdautuxaydung: string;
    id_quan_huyen : number;
}

export class SuperMarketFilterModel {
    id_quan_huyen : number[] =[];
    phanloai : string[] = [];
}

export class StoreCommonModel {
    tencuahang: string;
    sanphamkinhdoanh:string;
    scndkkd:string;
    ngaycap:Date;
    noicap:string;
    diachi:string;
    sogcn:string;
    ngaycaogcn: Date;
    ngayhethangcn:Date;
    sdtlienhe: string;
    id_quan_huyen : number;
}
export class StoreFilterModel{
    id_quan_huyen : number[] = [];
}

export class FoodCommonModel {
    tendoanhnghiep: string;
    diachi:string;
    sanphamkinhdoanh:string;
    scndkkd:string;
    ngaycap:Date;
    noicap:string;
    tennddpl:string;
    sdtnddpl: string;
    id_quan_huyen : number;
}

export class FoodFilterModel{
    id_quan_huyen : number[] = [];
}