//Import library
import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
    selector: 'retail',
    templateUrl: './retail.component.html',
    styleUrls: ['./retail.component.scss'],
})

export class RetailComponent implements OnInit {
    //Constant variable -----------------------------------------------------------
    private readonly REDIRECT_PAGE: string = "/specialized/industry-management/iip/iip-detail";
    private readonly LINK_DEFAULT: string = "/specialized/industry-management/iip";
    private readonly TITLE_DEFAULT: string = "Chỉ số công nghiệp IIP";
    private readonly TEXT_DEFAULT: string = "Chỉ số công nghiệp IIP";
    public readonly DISPLAY_COLS: string[] = ['index', 'chi_tieu', 'don_vi', 'thang_1', 'thang_2', 'thang_3',
        'thang_4', 'thang_5', 'thang_6', 'thang_7', 'thang_8', 'thang_9', 'thang_10', 'thang_11', 'thang_12'];
    private readonly DATA_DEFAULT: RetailModel[] = [
        {
            thu_tu: " ", chi_tieu: "TỔNG MỨC BLHH VÀ DTDVTD", don_vi: "triệu đồng",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "I", chi_tieu: "Tổng mức bán lẻ hàng hóa", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "1", chi_tieu: "Lương thực, thực phẩm", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "2", chi_tieu: "Hàng may mặc", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "3", chi_tieu: "Đồ dùng, dụng cụ, trang thiết bị gia đình", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "4",chi_tieu: "Vật phẩm, văn hoá, giáo dục", don_vi: "triệu đồng", thang_1: null, thang_2: null, thang_3: null, thang_4: null, thang_5: null,
            thang_6: null, thang_7: null, thang_8: null,
            thang_9: null, thang_10: null, thang_11: null, thang_12: null
        },
        {
            thu_tu: "5", chi_tieu: "Gỗ và vật liệu xây dựng", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "6", chi_tieu: "Ô tô con (dưới 9 chỗ ngồi)", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "7", chi_tieu: "Phương tiện đi lại, trừ ô tô con (kể cả phụ tùng)", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        }, 
        {
            thu_tu: "-", chi_tieu: "Trong đó xe đạp và phụ tùng xe đạp", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        }, 
        {
            thu_tu: "8", chi_tieu: "Vải dệt", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "9", chi_tieu: "Xăng, dầu các loại", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "10", chi_tieu: "Nhiên liệu khác (trừ xăng dầu)", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "11", chi_tieu: "Đá quý, kim loại quý và sản phẩm", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "12", chi_tieu: "Các hợp chất từ cao su", don_vi: "triệu đồng", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
    ]
    //TS & HTML variable -----------------------------------------------------------
    public dataSource: MatTableDataSource<RetailModel> = new MatTableDataSource<RetailModel>();
    public year: number = 2020;
    public years: number[] = [2019, 2020];
    //Only TS Variable ------------------------------------------------------------
    private _linkOutput: LinkModel = new LinkModel();
    //ViewChild & Input & Output -------------------------------------------------
    @ViewChild('table', { static: false }) table: MatTable<RetailModel>;
    @ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;
    // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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