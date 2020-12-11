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
import { MatSort } from '@angular/material/sort';
import { LinkModel } from 'src/app/_models/link.model';
import { BreadCrumService } from 'src/app/_services/injectable-service/breadcrums.service';
import * as XLSX from 'xlsx';
import { dataExport } from "./data";
@Component({
    selector: "app-export-management",
    templateUrl: "./export-management.component.html",
    styleUrls: ['../../../special_layout.scss'],
})
export class ExportManagementComponent implements OnInit {
    //Constant
    private readonly LINK_DEFAULT: string = "/specialized/commecial-management/export_import/exported_products";
    private readonly TITLE_DEFAULT: string = "Thông tin xuất khẩu";
    private readonly TEXT_DEFAULT: string = "Thông tin xuất khẩu";
    displayedColumns = [
        'index', 'ten_san_pham', 
        'luong_thang', 'gia_tri_thang', 
        'uoc_th_so_cungky_tht', 
        'uoc_th_so_thg_truoc_tht',
        
        'luong_cong_don', 'gia_tri_cong_don', 
        'uoc_th_so_cungky_cong_don', 
        'uoc_th_so_thg_truoc_cong_don',
        'danh_sach_doanh_nghiep', 
        'chi_tiet_doanh_nghiep'];
    displayRow1Header = [
        'index',
        'ten_san_pham',
        'thuc_hien_bao_cao_thang',
        'cong_don_den_ky_bao_cao',
        
        'danh_sach_doanh_nghiep',
        'chi_tiet_doanh_nghiep'
    ]
    displaRow2Header = [
        'luong_thang',
        'gia_tri_thang',
        'uoc_th_so_cungky_cong_don', 
        'uoc_th_so_thg_truoc_cong_don',
        'luong_cong_don',
        'gia_tri_cong_don',
        'uoc_th_so_cungky_cong_don', 
        'uoc_th_so_thg_truoc_cong_don',
    ]
    //Variable for only ts
    private _linkOutput: LinkModel = new LinkModel();
    // displayedColumns: string[] = [];
    // displayRow1Header: string[] = []
    // displaRow2Header: string[] = []
    // displayRow3Header: string[] = [];
    // dataSource: MatTableDataSource<ex_im_model> = new MatTableDataSource<ex_im_model>();
    dataSource: MatTableDataSource<ex_im_model> = new MatTableDataSource<ex_im_model>(dataExport);
    dataDialog: any[] = [];
    filteredDataSource: MatTableDataSource<ex_im_model> = new MatTableDataSource<ex_im_model>();
    years: number[] =this.getYears();
    months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    TongLuongThangThucHien: number = 0;
    TongGiaTriThangThucHien: number = 0;
    TongLuongCongDon: number = 0;
    TongGiaTriCongDon: number = 0;
    isChecked: boolean;
    pagesize: number = 0;
    curentmonth: number = new Date().getMonth();
    curentYear: number = new Date().getFullYear();
    @ViewChild("table", { static: false }) table: ElementRef;
    @ViewChild(MatAccordion, { static: true }) accordion: MatAccordion;
    @ViewChild("paginator", { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    nhap_khau_chu_yeu = [1, 6, 8, 4, 7, 21, 13, 27, 82, 51, 28, 20, 31, 19, 23]

    tongluong_tc: number = 0;
    tonggiatri_tc: number = 0;
    tongluongcongdon_tc: number = 0;
    tonggiatricongdon_tc: number = 0;
    dataTargets: any[] = [
        { id: 1, unit: 'Cục hải quan' },
        { id: 2, unit: 'Tổng cục hải quan' }
    ]
    dataTargetId = [2];
    isOnlyTongCucHQ: number = 2;
    constructor(
        public sctService: SCTService,
        public matDialog: MatDialog,
        public marketService: MarketService,
        private _breadCrumService: BreadCrumService
    ) { }

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
    }

    kiem_tra(id_mat_hang) {
        if (this.nhap_khau_chu_yeu.includes(id_mat_hang))
            return true
        return false;
    }

    ngOnInit() {
        // this.applyDataTarget(this.dataTargetId);
        // this.getDanhSachXuatKhau(this.curentmonth);
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

    getDanhSachXuatKhau(thang) {
        let tem = new Date().getFullYear() * 100 + thang;
        // if (thang !== this.curentmonth && thang) {
        //     this.curentmonth = thang;
        // }
        // if (thang === 10) {
        //     this.dataTargetId = [1];
        // } else {
        //     this.dataTargetId = [2];
        // }
        // this.applyDataTarget(this.dataTargetId);
        this.sctService.GetDanhSachXuatKhau(tem).subscribe((result) => {
            this.log(this.dataSource)
            this.dataDialog = result.data[0];
            this.applyExpireCheck(result.data[1])

            // console.log(this.TongGiaTriCongDon, this.TongGiaTriThangThucHien, this.TongLuongCongDon, this.TongLuongThangThucHien)
            this.filteredDataSource.data = [...this.dataSource.data];
            this.filteredDataSource.paginator = this.paginator;
            this.paginator._intl.itemsPerPageLabel = 'Số hàng';
            this.paginator._intl.firstPageLabel = "Trang Đầu";
            this.paginator._intl.lastPageLabel = "Trang Cuối";
            this.paginator._intl.previousPageLabel = "Trang Trước";
            this.paginator._intl.nextPageLabel = "Trang Tiếp";

        });
    }

    tinh_tong(data) {
        this.initVariable();
        for (let item of data) {
            // console.log(item)
            this.TongLuongThangThucHien += item['luong_thang'];
            this.TongGiaTriThangThucHien += item['gia_tri_thang']/1000000;
            this.TongLuongCongDon += item['luong_cong_don'];
            this.TongGiaTriCongDon += item['gia_tri_cong_don']/1000000;
            // tổng cục hải quan
            this.tongluong_tc += item['luong_thang_tc'];
            this.tonggiatri_tc += item['gia_tri_thang_tc'];
            this.tongluongcongdon_tc += item['luong_cong_don_tc'];
            this.tonggiatricongdon_tc += item['gia_tri_cong_don_tc'];
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
        let tem_data = [...data]
        this.dataSource = new MatTableDataSource<ex_im_model>(tem_data.filter(item => this.nhap_khau_chu_yeu.includes(item.id_mat_hang)));
        this.tinh_tong(this.dataSource.data)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    openDialog(id_mat_hang) {
        if (this.kiem_tra(id_mat_hang)) {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
                data: this.handelDataDialog(id_mat_hang),
                id: 1,
            };
            // console.log(this.handelDataDialog(id_mat_hang));
            // dialogConfig.panelClass = ['overflow-y: scroll;']
            this.matDialog.open(ModalComponent, dialogConfig);
        }
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
                this.matDialog.open(ModalComponent, dialogConfig);
            });
    }

    applyDataTarget(value: number[]) {
        // this.dataTargetId[0] = 2
        // 1: cuc hai quan
        // 2: tong cuc hai quan
        // 3: cả 2 
        if (this.dataTargetId.includes(1) && this.dataTargetId.includes(2)) {
            this.isOnlyTongCucHQ = 3
        } else if (this.dataTargetId.includes(1)) {
            this.isOnlyTongCucHQ = 1
        } else {
            this.isOnlyTongCucHQ = 2;
        }

        // switch (this.isOnlyTongCucHQ) {
        //     case 1:
        //         this.displayedColumns = [
        //             'index', 'ten_san_pham', 'luong_thang', 'gia_tri_thang', 'luong_cong_don',
        //             'gia_tri_cong_don', 'danh_sach_doanh_nghiep', 'chi_tiet_doanh_nghiep'];
        //         this.displayRow1Header = [
        //             'index',
        //             'ten_san_pham',
        //             'cuc_hai_quan',
        //             'danh_sach_doanh_nghiep',
        //             'chi_tiet_doanh_nghiep'
        //         ]
        //         this.displaRow2Header = [
        //             'thuc_hien_bao_cao_thang',
        //             'cong_don_den_ky_bao_cao',
        //         ]
        //         this.displayRow3Header = [
        //             'luong_thang',
        //             'gia_tri_thang',
        //             'luong_cong_don',
        //             'gia_tri_cong_don',
        //         ]
        //         break;
        //     case 2:
        //         this.displayedColumns = [
        //             'index', 'ten_san_pham', 'luong_thang_tc', 'gia_tri_thang_tc', 'luong_thang_cong_don_tc',
        //             'gia_tri_thang_cong_don_tc', 'danh_sach_doanh_nghiep', 'chi_tiet_doanh_nghiep'];
        //         this.displayRow1Header = [
        //             'index',
        //             'ten_san_pham',
        //             'tong_cuc_hai_quan',
        //             'danh_sach_doanh_nghiep',
        //             'chi_tiet_doanh_nghiep'
        //         ]
        //         this.displaRow2Header = [
        //             'thuc_hien_bao_cao_thang1',
        //             'cong_don_den_ky_bao_cao1'
        //         ]
        //         this.displayRow3Header = [
        //             'luong_thang_tc',
        //             'gia_tri_thang_tc',
        //             'luong_thang_cong_don_tc',
        //             'gia_tri_thang_cong_don_tc'
        //         ]
        //         break;
        //     case 3:
        //         this.displayedColumns = [
        //             'index', 'ten_san_pham', 'luong_thang', 'gia_tri_thang', 'luong_cong_don',
        //             'gia_tri_cong_don', 'luong_thang_tc', 'gia_tri_thang_tc', 'luong_thang_cong_don_tc',
        //             'gia_tri_thang_cong_don_tc', 'danh_sach_doanh_nghiep', 'chi_tiet_doanh_nghiep'];
        //         this.displayRow1Header = [
        //             'index',
        //             'ten_san_pham',
        //             'cuc_hai_quan',
        //             'tong_cuc_hai_quan',
        //             'danh_sach_doanh_nghiep',
        //             'chi_tiet_doanh_nghiep'
        //         ]
        //         this.displaRow2Header = [
        //             'thuc_hien_bao_cao_thang',
        //             'cong_don_den_ky_bao_cao',
        //             'thuc_hien_bao_cao_thang1',
        //             'cong_don_den_ky_bao_cao1'
        //         ]
        //         this.displayRow3Header = [
        //             'luong_thang',
        //             'gia_tri_thang',
        //             'luong_cong_don',
        //             'gia_tri_cong_don',
        //             'luong_thang_tc',
        //             'gia_tri_thang_tc',
        //             'luong_thang_cong_don_tc',
        //             'gia_tri_thang_cong_don_tc'
        //         ]
        //         break;
        //     default:
        //         break;
        // }
    }

    public ExportTOExcel(filename: string, sheetname: string) {
        const excelExtention: string = ".xlsx";
        let excelFileName: string = filename + excelExtention;
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheetname);
        /* save to file */
        XLSX.writeFile(wb, excelFileName);
    }
}
