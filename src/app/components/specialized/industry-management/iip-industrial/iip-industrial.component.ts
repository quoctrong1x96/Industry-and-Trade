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

@Component({
    selector: 'iip-industrial',
    templateUrl: './iip-industrial.component.html',
    styleUrls: ['/../../special_layout.scss'],
})

export class IipIndustrialComponent implements OnInit {
    //Constant variable -----------------------------------------------------------
    private readonly REDIRECT_PAGE: string = "/specialized/industry-management/iip/iip-detail";
    private readonly LINK_DEFAULT: string = "/specialized/industry-management/iip";
    private readonly TITLE_DEFAULT: string = "Chỉ số sản xuất công nghiệp";
    private readonly TEXT_DEFAULT: string = "Chỉ số sản xuất công nghiệp";
    public readonly DISPLAY_COLS: string[] = ['index', 'chi_tieu', 'don_vi', 'thang_1', 'thang_2', 'thang_3',
        'thang_4', 'thang_5', 'thang_6', 'thang_7', 'thang_8', 'thang_9', 'thang_10', 'thang_11', 'thang_12'];
    private readonly DATA_DEFAULT: IIPIndustrialModel[] = [
        {
            thu_tu: "I", chi_tieu: "Chỉ số sản xuất công nghiệp (IIP) so với cùng kỳ theo giá so sánh năm 2010", don_vi: "%",
            thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "1", chi_tieu: "Công nghiệp khai khoáng", don_vi: "%", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "2", chi_tieu: "Công nghiệp chế biến, chế tạo", don_vi: "%", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "3", chi_tieu: "Công nghiệp sản xuất, phân phối điện, khí đốt", don_vi: "%", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "4", chi_tieu: "Cung cấp nước, quản lý và xử lý nước thải, rác thải", don_vi: "%", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "II", chi_tieu: "Một số sản phẩm công nghiệp chủ yếu", don_vi: "", thang_1: null, thang_2: null, thang_3: null, thang_4: null, thang_5: null,
            thang_6: null, thang_7: null, thang_8: null,
            thang_9: null, thang_10: null, thang_11: null, thang_12: null
        },
        {
            thu_tu: "1", chi_tieu: "Đá xây dựng khác", don_vi: "m3", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "2", chi_tieu: "Hạt điều nhân", don_vi: "tấn", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "3", chi_tieu: "Vải dệt", don_vi: "1000 m2", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "4", chi_tieu: "Quần áo các loại", don_vi: "1000 cái", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "5", chi_tieu: "Giày, dép ", don_vi: "1000 đôi", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "6", chi_tieu: "Gỗ cưa, xẻ các loại", don_vi: "m3", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "7", chi_tieu: "Các hợp chất từ cao su", don_vi: "tấn", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
        {
            thu_tu: "8", chi_tieu: "Xi măng", don_vi: "tấn", thang_1: 0, thang_2: 0, thang_3: 0, thang_4: 0, thang_5: 0, thang_6: 0, thang_7: 0, thang_8: 0,
            thang_9: 0, thang_10: 0, thang_11: 0, thang_12: 0
        },
    ]
    //TS & HTML variable -----------------------------------------------------------
    public dataSource: MatTableDataSource<IIPIndustrialModel> = new MatTableDataSource<IIPIndustrialModel>();
    public year: number = 2020;
    public years: number[] = [2019, 2020];
    //Only TS Variable ------------------------------------------------------------
    private _linkOutput: LinkModel = new LinkModel();
    //ViewChild & Input & Output -------------------------------------------------
    @ViewChild('table', { static: false }) table: MatTable<IIPIndustrialModel>;
    @ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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
            this.dataSource.paginator = this.paginator;
        }
        else {
            this.dataSource = new MatTableDataSource();
            this.dataSource.paginator = this.paginator;
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