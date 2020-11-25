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
    private readonly TITLE_DEFAULT: string = "Tổng mức bán lẽ hàng hoá và dịch vụ";
    private readonly TEXT_DEFAULT: string = "Tổng mức bán lẽ hàng hoá và dịch vụ";
    public readonly DISPLAY_COLS: string[] = ['index', 'chi_tieu', 'don_vi', 'thang_1', 'thang_2', 'thang_3',
        'thang_4', 'thang_5', 'thang_6', 'thang_7', 'thang_8', 'thang_9', 'thang_10', 'thang_11', 'thang_12'];
    private readonly DATA_DEFAULT: RetailModel[] = [
        {
            thu_tu: " ", chi_tieu: "TỔNG MỨC BLHH VÀ DTDVTD", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 4441344.20, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "I", chi_tieu: "Tổng mức bán lẻ hàng hóa", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 3634958.50, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "1", chi_tieu: "Lương thực, thực phẩm", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 1934012.5, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "2", chi_tieu: "Hàng may mặc", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 210779, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "3", chi_tieu: "Đồ dùng, dụng cụ, trang thiết bị gia đình", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 474301.7, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "4", chi_tieu: "Vật phẩm, văn hoá, giáo dục", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0,
            thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 39634.2, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "5", chi_tieu: "Gỗ và vật liệu xây dựng", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 298506.3, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "6", chi_tieu: "Ô tô con (dưới 9 chỗ ngồi)", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 13610, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "7", chi_tieu: "Phương tiện đi lại, trừ ô tô con (kể cả phụ tùng)", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 101319, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "-", chi_tieu: "Trong đó xe đạp và phụ tùng xe đạp", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 4350, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "8", chi_tieu: "Vải dệt", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 200760.3, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "9", chi_tieu: "Xăng, dầu các loại", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 83985, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "10", chi_tieu: "Nhiên liệu khác (trừ xăng dầu)", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 92869.5, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "11", chi_tieu: "Đá quý, kim loại quý và sản phẩm", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 114255.5, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "12", chi_tieu: "Các hợp chất từ cao su", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 66575.5, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "II", chi_tieu: "Doanh thu hoạt động dịch vụ (trừ lưu trú, ăn uống, dịch vụ lữ hành)", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 380501.68, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "1", chi_tieu: "Dịch vụ kinh doanh bất động sản", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 44180.57, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "2", chi_tieu: "Dịch vụ hành chính và dịch vụ hỗ trợ", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 27850.01, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "3", chi_tieu: "Dịch vụ giáo dục và đào tạo", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 1119.03, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "4", chi_tieu: "Dịch vụ y tế và hoạt động trợ giúp xã hội", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 2597.04, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "5", chi_tieu: "Dịch vụ  nghệ thuật, vui chơi và giải trí", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 230584.6, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "6", chi_tieu: "DV sửa chữa máy vi tính, đồ dùng cá nhân và gia đình", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 27573.43, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "7", chi_tieu: "Dịch vụ khác", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 46597, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "III", chi_tieu: "Doanh thu DV ăn uống, lưu trú, du lịch lữ hành", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 425884.02, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "1", chi_tieu: "Dịch vụ lưu trú", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 18620.61, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "2", chi_tieu: "Dịch vụ ăn uống", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 407235.41, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "3", chi_tieu: "Dịch vụ lữ hành và hoạt động hỗ trợ du lịch", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 28, thang_10: 0, thang_11: 0, thang_12: 0
        },
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