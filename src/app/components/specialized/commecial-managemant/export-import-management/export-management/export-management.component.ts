import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
    MatTableDataSource,
    MatTable,
    MatAccordion,
    MatPaginator,
    MatDialog,
    MatDialogConfig,
} from "@angular/material";
import { District } from "src/app/_models/district.model";
import { ConditionalBusinessLineModel } from "src/app/_models/APIModel/conditional-business-line.model";
import { SCTService } from "src/app/_services/APIService/sct.service";
import { ex_im_model } from "src/app/_models/APIModel/export-import.model";
import { ModalService } from "../dialog-import-export/modal.service";
import { MarketService } from "src/app/_services/APIService/market.service";
import { ModalComponent } from "../dialog-import-export/modal.component";
import { MatSort } from "@angular/material/sort";
import { LinkModel } from "src/app/_models/link.model";
import { BreadCrumService } from "src/app/_services/injectable-service/breadcrums.service";
import * as XLSX from "xlsx";
import {
    dataExport,
    dataExport2,
    dataExport3,
    dataExport4,
    dataExport5,
    dataExport6,
    dataExport7,
    dataExport8,
    dataExport9,
    dataExport10,
    dataExport11,
    dataExport12,
    dataExportNotData,
} from "./data";
import {
    dataDialogM1,
    dataDialogM2,
    dataDialogM3,
    dataDialogM4,
    dataDialogM5,
    dataDialogM6,
    dataDialogM7,
    dataDialogM8,
    dataDialogM9,
    dataDialogM10,
    dataDialogM11,
    dataDialogM12,
} from "./dataDialog";
import { ImportDataComponent } from "../import-data/import-data.component";
import FileSaver from "file-saver";
import { ExcelServicesService } from "src/app/shared/services/excel-services.service";
import json_report_01 from "../test/report_export_01.json";
import json_report_02 from "../test/report_export_02.json";
import json_report_03 from "../test/report_export_03.json";
import json_report_04 from "../test/report_export_04.json";
import json_report_05 from "../test/report_export_05.json";
import json_report_06 from "../test/report_export_06.json";
import json_report_07 from "../test/report_export_07.json";
import json_report_08 from "../test/report_export_08.json";
import json_report_09 from "../test/report_export_09.json";
import json_report_10 from "../test/report_export_10.json";
import json_report_11 from "../test/report_export_11.json";
import json_report_12 from "../test/report_export_12.json";

@Component({
    selector: "app-export-management",
    templateUrl: "./export-management.component.html",
    styleUrls: ["../../../special_layout.scss"],
})
export class ExportManagementComponent implements OnInit {
    //Constant
    private readonly LINK_DEFAULT: string =
        "/specialized/commecial-management/export_import/exported_products";
    private readonly TITLE_DEFAULT: string = "Thông tin xuất khẩu";
    private readonly TEXT_DEFAULT: string = "Thông tin xuất khẩu";
    displayedColumns = [
        "index",
        "ten_san_pham",
        "luong_thang",
        "gia_tri_thang",
        "uoc_th_so_cungky_tht",
        "uoc_th_so_thg_truoc_tht",

        "luong_cong_don",
        "gia_tri_cong_don",
        "uoc_th_so_cungky_cong_don",
        "uoc_th_so_thg_truoc_cong_don",
        "danh_sach_doanh_nghiep",
        "chi_tiet_doanh_nghiep",
    ];
    displayRow1Header = [
        "index",
        "ten_san_pham",
        "thuc_hien_bao_cao_thang",
        "cong_don_den_ky_bao_cao",

        "danh_sach_doanh_nghiep",
        "chi_tiet_doanh_nghiep",
    ];
    displaRow2Header = [
        "luong_thang",
        "gia_tri_thang",
        "uoc_th_so_cungky_tht",
        "uoc_th_so_thg_truoc_tht",
        "luong_cong_don",
        "gia_tri_cong_don",
        "uoc_th_so_cungky_cong_don",
        "uoc_th_so_thg_truoc_cong_don",
    ];
    //Variable for only ts
    private _linkOutput: LinkModel = new LinkModel();
    // displayedColumns: string[] = [];
    // displayRow1Header: string[] = []
    // displaRow2Header: string[] = []
    // displayRow3Header: string[] = [];
    // dataSource: MatTableDataSource<ex_im_model> = new MatTableDataSource<ex_im_model>();
    dataSource: MatTableDataSource<ex_im_model> = new MatTableDataSource<ex_im_model>();
    dataDialog: any[] = [];
    filteredDataSource: MatTableDataSource<ex_im_model> = new MatTableDataSource<ex_im_model>();
    years: number[] = this.getYears();
    months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    TongGiaTriThangThucHien: number = 0;
    TongLuongCongDon: number = 0;
    TongLuongThangThucHien: number = 0;
    TongGiaTriCongDon: number = 0;
    uth_so_cungky: number = 0;
    uth_so_khn: number = 0;
    isChecked: boolean;
    pagesize: number = 0;
    curentmonth: number = new Date().getMonth() + 1;
    curentYear: number = new Date().getFullYear();
    @ViewChild("table", { static: false }) table: ElementRef;
    @ViewChild(MatAccordion, { static: true }) accordion: MatAccordion;
    @ViewChild("paginator", { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    xuat_khau_chu_yeu = [1, 6, 8, 4, 7, 21, 13, 27, 82, 51, 28, 20, 31, 19, 23];

    tongluong_tc: number = 0;
    tonggiatri_tc: number = 0;
    tongluongcongdon_tc: number = 0;
    tonggiatricongdon_tc: number = 0;

    dataTargets: any[] = [
        { id: 1, unit: "Cục hải quan" },
        { id: 2, unit: "Tổng cục hải quan" },
    ];
    dataTargetId = [2];
    isOnlyTongCucHQ: number = 2;
    isNoData: boolean = true;
    constructor(
        public sctService: SCTService,
        public matDialog: MatDialog,
        public marketService: MarketService,
        private _breadCrumService: BreadCrumService,
        private excelServices: ExcelServicesService
    ) { }

    handleGTXK() {
        // this.dataSource.data.forEach(item => {
        //     this.TongGiaTriThangThucHien += item['gia_tri_thang'];
        //     this.uth_so_cungky =
        // })
        this.TongGiaTriThangThucHien = this.dataSource.data[15].gia_tri_thang;
        this.uth_so_cungky = this.dataSource.data[15].uoc_th_so_cungky_tht;
        this.TongGiaTriCongDon = this.dataSource.data[15].gia_tri_cong_don;
        this.uth_so_khn = this.dataSource.data[15].uoc_th_so_thg_truoc_cong_don;
    }

    initVariable() {
        this.TongLuongThangThucHien = 0;
        this.TongGiaTriThangThucHien = 0;
        this.TongLuongCongDon = 0;
        this.TongGiaTriCongDon = 0;
        //toongr cuuc
        this.tongluong_tc = 0;
        this.tonggiatri_tc = 0;
        this.tongluongcongdon_tc = 0;
        this.tonggiatricongdon_tc = 0;

        // uth
        this.uth_so_cungky = 0;
        this.uth_so_khn = 0;
    }

    kiem_tra(id_mat_hang) {
        if (this.xuat_khau_chu_yeu.includes(id_mat_hang)) return true;
        return false;
    }

    ngOnInit() {
        // this.curentmonth = 1;
        // this.applyDataTarget(this.dataTargetId);
        this.getDanhSachXuatKhau(this.curentmonth);
        this.autoOpen();
        this.sendLinkToNext(true);
        // this.filteredDataSource.filterPredicate = function (data: ex_im_model, filter): boolean {
        //     return String(data.is_het_han).includes(filter);
        // };
    }
    public sendLinkToNext(type: boolean) {
        this._linkOutput.link = this.LINK_DEFAULT;
        this._linkOutput.title = this.TITLE_DEFAULT;
        this._linkOutput.text = this.TEXT_DEFAULT;
        this._linkOutput.type = type;
        this._breadCrumService.sendLink(this._linkOutput);
    }

    autoOpen() {
        setTimeout(() => this.accordion.openAll(), 1000);
    }

    // getTotalCost() {
    //   return this.dataSource.data.map(t => t.cost).reduce((acc, value) => acc + value, 0);
    // }

    getDanhSachXuatKhau(value) {
        let tem = this.curentYear * 100 + this.curentmonth;
        this.dataSource.data = [];
        if (tem == 202001) {
            this.dataSource.data = dataExport;
            this.dataDialog = dataDialogM1;
        }
        if (tem == 202002) {
            this.dataSource.data = dataExport2;
            this.dataDialog = dataDialogM2;
        }
        if (tem == 202003) {
            this.dataSource.data = dataExport3;
            this.dataDialog = dataDialogM3;
        }
        if (tem == 202004) {
            this.dataSource.data = dataExport4;
            this.dataDialog = dataDialogM4;
        }
        if (tem == 202005) {
            this.dataSource.data = dataExport5;
            this.dataDialog = dataDialogM5;
        }
        if (tem == 202006) {
            this.dataSource.data = dataExport6;
            this.dataDialog = dataDialogM6;
        }
        if (tem == 202007) {
            this.dataSource.data = dataExport7;
            this.dataDialog = dataDialogM7;
        }
        if (tem == 202008) {
            this.dataSource.data = dataExport8;
            this.dataDialog = dataDialogM8;
        }
        if (tem == 202009) {
            this.dataSource.data = dataExport9;
            this.dataDialog = dataDialogM9;
        }
        if (tem == 202010) {
            this.dataSource.data = dataExport10;
            this.dataDialog = dataDialogM10;
        }
        if (tem == 202011) {
            this.dataSource.data = dataExport11;
            this.dataDialog = dataDialogM11;
        }
        if (tem == 202012) {
            this.dataSource.data = dataExport12;
            this.dataDialog = dataDialogM12;
        }
        if (this.dataSource.data.length) {
            this.handleGTXK();
        } else {
            this.dataSource.data = dataExportNotData;
            this.initVariable();
        }

        if (this.dataSource.data == dataExportNotData) {
            this.isNoData = true;
        } else {
            this.isNoData = false;
        }
        // this.sctService.GetDanhSachXuatKhau(tem).subscribe((result) => {
        //     this.log(this.dataSource)
        //     this.dataDialog = result.data[0];
        //     this.applyExpireCheck(result.data[1])

        //     // console.log(this.TongGiaTriCongDon, this.TongGiaTriThangThucHien, this.TongLuongCongDon, this.TongLuongThangThucHien)
        //     this.filteredDataSource.data = [...this.dataSource.data];
        //     this.filteredDataSource.paginator = this.paginator;
        //     this.paginator._intl.itemsPerPageLabel = 'Số hàng';
        //     this.paginator._intl.firstPageLabel = "Trang Đầu";
        //     this.paginator._intl.lastPageLabel = "Trang Cuối";
        //     this.paginator._intl.previousPageLabel = "Trang Trước";
        //     this.paginator._intl.nextPageLabel = "Trang Tiếp";
        // });
    }

    tinh_tong(data) {
        this.initVariable();
        for (let item of data) {
            // console.log(item)
            this.TongLuongThangThucHien += item["luong_thang"];
            this.TongGiaTriThangThucHien += item["gia_tri_thang"];
            this.TongLuongCongDon += item["luong_cong_don"];
            this.TongGiaTriCongDon += item["gia_tri_cong_don"];
            // tổng cục hải quan
            this.tongluong_tc += item["luong_thang_tc"];
            this.tonggiatri_tc += item["gia_tri_thang_tc"];
            this.tongluongcongdon_tc += item["luong_cong_don_tc"];
            this.tonggiatricongdon_tc += item["gia_tri_cong_don_tc"];
        }
    }

    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    log(any) {
        console.log(any);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    getYears() {
        return Array(5)
            .fill(1)
            .map((element, index) => new Date().getFullYear() - index);
    }

    applyDistrictFilter(event) { }

    // isHidden(row : any){
    //     return (this.isChecked)? (row.is_het_han) : false;
    // }

    applyExpireCheck(data) {
        // console.log(data);
        let tem_data = [...data];
        this.dataSource = new MatTableDataSource<ex_im_model>(
            tem_data.filter((item) =>
                this.xuat_khau_chu_yeu.includes(item.id_mat_hang)
            )
        );
        this.tinh_tong(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    openDialog(id_mat_hang) {
        // if (this.kiem_tra(id_mat_hang)) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
            data: this.handelDataDialog(id_mat_hang),
            id: 1,
        };
        dialogConfig.minHeight = "100%";
        dialogConfig.minWidth = "90%";
        // console.log(this.handelDataDialog(id_mat_hang));
        // dialogConfig.panelClass = ['overflow-y: scroll;']
        this.matDialog.open(ModalComponent, dialogConfig);
        // }
    }

    handelDataDialog(id_mat_hang) {
        let data = this.dataDialog.filter(
            (item) => item.id_mat_hang === id_mat_hang
        );
        return data;
    }

    openDanh_sach_doanh_nghiep(id_mat_hang, ten_san_pham) {
        this.marketService
            .GetTopExport(this.curentmonth, new Date().getFullYear(), id_mat_hang)
            .subscribe((data) => {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = {
                    data: data["data"],
                    id: 2,
                    ten_san_pham: ten_san_pham,
                    thang: this.curentmonth,
                };
                dialogConfig.minWidth = "80%";
                this.matDialog.open(ModalComponent, dialogConfig);
            });
    }

    applyDataTarget(value: number[]) { }

    public ExportTOExcel(filename: string, sheetname: string) {
        const excelExtention: string = ".xlsx";
        let excelFileName: string = filename + excelExtention;
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
            this.table.nativeElement
        );
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheetname);
        console.log(this.table.nativeElement.querySelector("thead"));
        /* save to file */
        XLSX.writeFile(wb, excelFileName);
    }

    public DowloadFile(filename: string, sheetname: string) {
        let report: any = json_report_01;
        switch (this.curentmonth) {
            case 2:
                report = json_report_02;
                break;
            case 3:
                report = json_report_03;
                break;
            case 4:
                report = json_report_04;
                break;
            case 5:
                report = json_report_05;
                break;
            case 6:
                report = json_report_06;
                break;
            case 7:
                report = json_report_07;
                break;
            case 8:
                report = json_report_08;
                break;
            case 9:
                report = json_report_09;
                break;
            case 10:
                report = json_report_10;
                break;
            case 11:
                report = json_report_11;
                break;
            case 12:
                report = json_report_12;
                break;
            default:
                break;
        }
        this.excelServices.exportAsExcelFile(report, "mau_bao_cao_xuat_khau");
    }

    public ImportTOExcel() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
            data: {},
        };
        dialogConfig.minWidth = window.innerWidth - 100;
        dialogConfig.minHeight = window.innerHeight - 100;
        this.matDialog.open(ImportDataComponent, dialogConfig);
    }
}
