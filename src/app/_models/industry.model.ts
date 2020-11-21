export class ClusterDetailModel{
    id:number;
    ten_cum_cong_nghiep: string;
    hinh_anhs: string[];
    dia_chi:string;
    chu_dau_tu: string;
    dien_tich: number;
    co_so_phap_lys:string[];
    dien_giai: string;
    downloadPDF:string;
}

export class ClusterDetailShortModel{
    chi_tieu:string;
    dien_giai:string;
    constructor(chiTieu:string, dienGiai:string){
        this.chi_tieu = chiTieu;
        this.dien_giai = dienGiai;
    }
}