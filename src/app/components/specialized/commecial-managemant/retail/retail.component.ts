//Import library
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
//Import service
import { BreadCrumService } from 'src/app/_services/injectable-service/breadcrums.service';
//Import Model
import { IIPIndustrialModel } from 'src/app/_models/industry.model';
import { LinkModel } from 'src/app/_models/link.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RetailModel } from 'src/app/_models/commecial.model';
import * as XLSX from 'xlsx';

@Component({
    selector: 'retail',
    templateUrl: './retail.component.html',
    styleUrls: ['/../../special_layout.scss'],
})

export class RetailComponent implements OnInit {
    //Constant variable -----------------------------------------------------------
    private readonly REDIRECT_PAGE: string = "/specialized/commecial-management/retail/retail-detail";
    private readonly LINK_DEFAULT: string = "/specialized/commecial-management/retail";
    private readonly TITLE_DEFAULT: string = "Tổng mức bán lẻ hàng hoá và dịch vụ";
    private readonly TEXT_DEFAULT: string = "Tổng mức bán lẻ hàng hoá và dịch vụ";
    public readonly DISPLAY_COLS: string[] = ['index', 'chi_tieu', 'don_vi', 'thang_1', 'thang_2', 'thang_3',
        'thang_4', 'thang_5', 'thang_6', 'thang_7', 'thang_8', 'thang_9', 'thang_10', 'thang_11', 'thang_12'];
    private readonly DATA_DEFAULT: RetailModel[] = [
        { thu_tu: " ", chi_tieu: "TỔNG MỨC BLHH VÀ DTDVTD", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 3867798.54, thang_7: 4131798.3, thang_8: 4352513.4, thang_9: 4441344.20000216, thang_10: 4554828.67, thang_11: 0, thang_12: 0 },
        { thu_tu: "I", chi_tieu: "Tổng mức bán lẻ hàng hóa", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 3235631.15, thang_7: 3401167.8, thang_8: 3556926.4, thang_9: 3634958.5, thang_10: 3729298.41, thang_11: 0, thang_12: 0 },
        { thu_tu: "1", chi_tieu: "Lương thực, thực phẩm", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 1704508.5, thang_7: 1804166.3, thang_8: 1889130.1, thang_9: 1934012.5, thang_10: 1987192.85, thang_11: 0, thang_12: 0 },
        { thu_tu: "2", chi_tieu: "Hàng may mặc", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 184965.24, thang_7: 195766.3, thang_8: 205625.3, thang_9: 210779, thang_10: 215975.69, thang_11: 0, thang_12: 0 },
        { thu_tu: "3", chi_tieu: "Đồ dùng, dụng cụ, trang thiết bị gia đình", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 430201.4, thang_7: 451713.3, thang_8: 465571.8, thang_9: 474301.7, thang_10: 483426.49, thang_11: 0, thang_12: 0 },
        { thu_tu: "4", chi_tieu: "Vật phẩm, văn hoá, giáo dục", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 38500.61, thang_7: 40948.8, thang_8: 38334.6, thang_9: 39634.2, thang_10: 39645.34, thang_11: 0, thang_12: 0 },
        { thu_tu: "5", chi_tieu: "Gỗ và vật liệu xây dựng", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 268950.1, thang_7: 270765.6, thang_8: 293575.4, thang_9: 298506.3, thang_10: 310920.89, thang_11: 0, thang_12: 0 },
        { thu_tu: "6", chi_tieu: "Ô tô con (dưới 9 chỗ ngồi)", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 10683.14, thang_7: 11118, thang_8: 11310, thang_9: 13610, thang_10: 11632.51, thang_11: 0, thang_12: 0 },
        { thu_tu: "7", chi_tieu: "Phương tiện đi lại, trừ ô tô con (kể cả phụ tùng)", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 92320.31, thang_7: 96720, thang_8: 99188, thang_9: 101319, thang_10: 102975.51, thang_11: 0, thang_12: 0 },
        { thu_tu: "-", chi_tieu: "Trong đó xe đạp và phụ tùng xe đạp", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 3201.21, thang_7: 3450.5, thang_8: 4250, thang_9: 4350, thang_10: 4354.89, thang_11: 0, thang_12: 0 },
        { thu_tu: "8", chi_tieu: "Vải dệt", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 181584.51, thang_7: 190356.3, thang_8: 199303.3, thang_9: 200760.3, thang_10: 207549.57, thang_11: 0, thang_12: 0 },
        { thu_tu: "9", chi_tieu: "Xăng, dầu các loại", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 78534.87, thang_7: 81201.7, thang_8: 82921.7, thang_9: 83985, thang_10: 85662.89, thang_11: 0, thang_12: 0 },
        { thu_tu: "10", chi_tieu: "Nhiên liệu khác (trừ xăng dầu)", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 82954.1, thang_7: 86163, thang_8: 91879.5, thang_9: 92869.5, thang_10: 95224.32, thang_11: 0, thang_12: 0 },
        { thu_tu: "11", chi_tieu: "Đá quý, kim loại quý và sản phẩm", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 105210.65, thang_7: 110347.5, thang_8: 112571.5, thang_9: 114255.5, thang_10: 117875.64, thang_11: 0, thang_12: 0 },
        { thu_tu: "12", chi_tieu: "Các hợp chất từ cao su", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 54016.51, thang_7: 58450.5, thang_8: 63265.2, thang_9: 66575.5, thang_10: 66861.82, thang_11: 0, thang_12: 0 },
        { thu_tu: "II", chi_tieu: "Doanh thu hoạt động dịch vụ (trừ lưu trú, ăn uống, dịch vụ lữ hành)", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 219394.4, thang_7: 310112.88, thang_8: 375722.87, thang_9: 380501.68, thang_10: 389257.34, thang_11: 0, thang_12: 0 },
        { thu_tu: "1", chi_tieu: "Dịch vụ kinh doanh bất động sản", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 40660.25, thang_7: 42160.2, thang_8: 43283.5, thang_9: 44180.57, thang_10: 44918.12, thang_11: 0, thang_12: 0 },
        { thu_tu: "2", chi_tieu: "Dịch vụ hành chính và dịch vụ hỗ trợ", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 22324.21, thang_7: 26567.1, thang_8: 27325.14, thang_9: 27850.01, thang_10: 28363.32, thang_11: 0, thang_12: 0 },
        { thu_tu: "3", chi_tieu: "Dịch vụ giáo dục và đào tạo", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 888.52, thang_7: 1032.7, thang_8: 1085.21, thang_9: 1119.03, thang_10: 1144.5, thang_11: 0, thang_12: 0 },
        { thu_tu: "4", chi_tieu: "Dịch vụ y tế và hoạt động trợ giúp xã hội", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 2140.61, thang_7: 2442.5, thang_8: 2562.34, thang_9: 2597.04, thang_10: 2637.11, thang_11: 0, thang_12: 0 },
        { thu_tu: "5", chi_tieu: "Dịch vụ  nghệ thuật, vui chơi và giải trí", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 85521.91, thang_7: 168263.8, thang_8: 229016.1, thang_9: 230584.6, thang_10: 237261.1, thang_11: 0, thang_12: 0 },
        { thu_tu: "6", chi_tieu: "DV sửa chữa máy vi tính, đồ dùng cá nhân và gia đình", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 26101.28, thang_7: 26101.28, thang_8: 26905.28, thang_9: 27573.43, thang_10: 27931.05, thang_11: 0, thang_12: 0 },
        { thu_tu: "7", chi_tieu: "Dịch vụ khác", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 41757.62, thang_7: 43545.3, thang_8: 45545.3, thang_9: 46597, thang_10: 47002.14, thang_11: 0, thang_12: 0 },
        { thu_tu: "III", chi_tieu: "Doanh thu DV ăn uống, lưu trú, du lịch lữ hành", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 412772.99, thang_7: 420517.62, thang_8: 419864.13, thang_9: 425884.02000216, thang_10: 436272.92, thang_11: 0, thang_12: 0 },
        { thu_tu: "1", chi_tieu: "Dịch vụ lưu trú", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 17425.31, thang_7: 17855.31, thang_8: 18305.21, thang_9: 18620.61, thang_10: 18889.02, thang_11: 0, thang_12: 0 },
        { thu_tu: "2", chi_tieu: "Dịch vụ ăn uống", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 395217.68, thang_7: 402452.31, thang_8: 401558.92, thang_9: 407235.41000216, thang_10: 417293.4, thang_11: 0, thang_12: 0 },
        { thu_tu: "3", chi_tieu: "Dịch vụ lữ hành và hoạt động hỗ trợ du lịch", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 130, thang_7: 210, thang_8: 0, thang_9: 28, thang_10: 90.5, thang_11: 0, thang_12: 0 },

    ]
    //TS & HTML variable -----------------------------------------------------------
    public dataSource: MatTableDataSource<RetailModel> = new MatTableDataSource<RetailModel>();
    public year: number = 2020;
    public years: number[] = [2019, 2020];
    //Only TS Variable ------------------------------------------------------------
    private _linkOutput: LinkModel = new LinkModel();
    //ViewChild & Input & Output -------------------------------------------------
    @ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild('TABLE', { static: false }) table: ElementRef;

    exportExcel() {
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Bán lẻ hàng hóa và dịch vụ');

        XLSX.writeFile(wb, 'Bán lẻ hàng hóa và dịch vụ.xlsx');

    }

    //Contructor + Init + Destroy
    constructor(
        private _breadCrumService: BreadCrumService,
        private _router: Router
    ) { }

    ngOnInit() {
        this.year = 2020;
        this.initData();
        this.sendLinkToNext(true);
    }
    //HTML & TS Function ----------------------------------------------------------
    public ChangeYear(year: number): void {
        if (year == 2020) {
            this.dataSource = new MatTableDataSource(this.DATA_DEFAULT);
        }
        else {
            this.dataSource = new MatTableDataSource();
        }
    }
    public OpenDetail(month: number, year: number) {
        this._router.navigate([this.REDIRECT_PAGE], { queryParams: { year: year, month: month } });
        //     const url = this._router.serializeUrl(this._router.createUrlTree([encodeURI('#') + this.REDIRECT_PAGE], { queryParams: { month: month, year: year} })
        //   );
        //   window.open(url.replace('%23','#'));
    }
    //TS Function -----------------------------------------------------------------
    private initData(): void {
        this.year = this.getCurrentYear();
        console.log("year:", this.year);
        this.dataSource = new MatTableDataSource(this.DATA_DEFAULT);
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Số hàng';
        this.paginator._intl.firstPageLabel = "Trang Đầu";
        this.paginator._intl.lastPageLabel = "Trang Cuối";
        this.paginator._intl.previousPageLabel = "Trang Trước";
        this.paginator._intl.nextPageLabel = "Trang Tiếp";
    }

    private sendLinkToNext(type: boolean): void {
        this._linkOutput.link = this.LINK_DEFAULT;
        this._linkOutput.title = this.TITLE_DEFAULT;
        this._linkOutput.text = this.TEXT_DEFAULT;
        this._linkOutput.type = type;
        this._breadCrumService.sendLink(this._linkOutput);
    }
    private getCurrentYear(): number {
        var currentDate = new Date();
        return currentDate.getFullYear();
    }
}