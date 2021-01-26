"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ImportManagementComponent = void 0;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var modal_component_1 = require("../dialog-import-export/modal.component");
var dialog_1 = require("@angular/material/dialog");
var link_model_1 = require("src/app/_models/link.model");
var XLSX = require("xlsx");
var report_export_01_json_1 = require("../test/report_export_01.json");
var report_export_02_json_1 = require("../test/report_export_02.json");
var report_export_03_json_1 = require("../test/report_export_03.json");
var report_export_04_json_1 = require("../test/report_export_04.json");
var report_export_05_json_1 = require("../test/report_export_05.json");
var report_export_06_json_1 = require("../test/report_export_06.json");
var report_export_07_json_1 = require("../test/report_export_07.json");
var report_export_08_json_1 = require("../test/report_export_08.json");
var report_export_09_json_1 = require("../test/report_export_09.json");
var report_export_10_json_1 = require("../test/report_export_10.json");
var report_export_11_json_1 = require("../test/report_export_11.json");
var report_export_12_json_1 = require("../test/report_export_12.json");
var import_data_component_1 = require("../import-data/import-data.component");
var ImportManagementComponent = /** @class */ (function () {
    function ImportManagementComponent(sctService, matDialog, marketService, _breadCrumService, excelServices) {
        this.sctService = sctService;
        this.matDialog = matDialog;
        this.marketService = marketService;
        this._breadCrumService = _breadCrumService;
        this.excelServices = excelServices;
        //Constant
        this.LINK_DEFAULT = "/specialized/commecial-management/export_import/imported_products";
        this.TITLE_DEFAULT = "Thông tin nhập khẩu";
        this.TEXT_DEFAULT = "Thông tin nhập khẩu";
        this.displayedColumns = [
            'index', 'ten_san_pham',
            'luong_thang', 'gia_tri_thang',
            'uoc_th_so_cungky_tht',
            'uoc_th_so_thg_truoc_tht',
            'luong_cong_don', 'gia_tri_cong_don',
            'uoc_th_so_cungky_cong_don',
            'uoc_th_so_thg_truoc_cong_don',
            'danh_sach_doanh_nghiep',
            'chi_tiet_doanh_nghiep'
        ];
        this.displayRow1Header = [
            'index',
            'ten_san_pham',
            'thuc_hien_bao_cao_thang',
            'cong_don_den_ky_bao_cao',
            'danh_sach_doanh_nghiep',
            'chi_tiet_doanh_nghiep'
        ];
        this.displaRow2Header = [
            'luong_thang',
            'gia_tri_thang',
            'uoc_th_so_cungky_tht',
            'uoc_th_so_thg_truoc_tht',
            'luong_cong_don',
            'gia_tri_cong_don',
            'uoc_th_so_cungky_cong_don',
            'uoc_th_so_thg_truoc_cong_don',
        ];
        //Variable for only ts
        this._linkOutput = new link_model_1.LinkModel();
        // displayedColumns: string[] = [];
        // displayRow1Header: string[] = []
        // displaRow2Header: string[] = []
        // displayRow3Header: string[] = [];
        // dataSource: MatTableDataSource<ex_im_model> = new MatTableDataSource<ex_im_model>();
        this.dataSource = new material_1.MatTableDataSource();
        this.dataDialog = [];
        this.filteredDataSource = new material_1.MatTableDataSource();
        this.years = this.getYears();
        this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.TongGiaTriThangThucHien = 0;
        this.TongLuongCongDon = 0;
        this.TongLuongThangThucHien = 0;
        this.TongGiaTriCongDon = 0;
        this.uth_so_cungky = 0;
        this.uth_so_khn = 0;
        this.pagesize = 0;
        this.curentmonth = new Date().getMonth() + 1;
        this.curentYear = new Date().getFullYear();
        this.nhap_khau_chu_yeu = [1, 6, 8, 4, 7, 21, 13, 27, 82, 51, 28, 20, 31, 19, 23];
        this.tongluong_tc = 0;
        this.tonggiatri_tc = 0;
        this.tongluongcongdon_tc = 0;
        this.tonggiatricongdon_tc = 0;
        this.dataTargets = [
            { id: 1, unit: 'Cục hải quan' },
            { id: 2, unit: 'Tổng cục hải quan' }
        ];
        this.dataTargetId = [2];
        this.isOnlyTongCucHQ = 2;
    }
    ImportManagementComponent.prototype.handleGTXK = function () {
        // this.dataSource.data.forEach(item => {
        //     this.TongGiaTriThangThucHien += item['gia_tri_thang'];
        //     this.uth_so_cungky = 
        // })
        this.TongGiaTriThangThucHien = this.dataSource.data[15].gia_tri_thang;
        this.uth_so_cungky = this.dataSource.data[15].uoc_th_so_cungky_tht;
        this.TongGiaTriCongDon = this.dataSource.data[15].gia_tri_cong_don;
        this.uth_so_khn = this.dataSource.data[15].uoc_th_so_thg_truoc_cong_don;
    };
    ImportManagementComponent.prototype.initVariable = function () {
        this.TongLuongThangThucHien = 0;
        this.TongGiaTriThangThucHien = 0;
        this.TongLuongCongDon = 0;
        this.TongGiaTriCongDon = 0;
        //toongr cuuc
        this.tongluong_tc = 0;
        this.tonggiatri_tc = 0;
        this.tongluongcongdon_tc = 0;
        this.tonggiatricongdon_tc = 0;
    };
    ImportManagementComponent.prototype.kiem_tra = function (id_mat_hang) {
        if (this.nhap_khau_chu_yeu.includes(id_mat_hang))
            return true;
        return false;
    };
    ImportManagementComponent.prototype.ngOnInit = function () {
        // this.curentmonth = 1;
        // this.applyDataTarget(this.dataTargetId);
        // this.getDanhSachXuatKhau(this.curentmonth);
        this.autoOpen();
        this.sendLinkToNext(true);
        // this.filteredDataSource.filterPredicate = function (data: ex_im_model, filter): boolean {
        //     return String(data.is_het_han).includes(filter);
        // };
        // this.handleGTXK();
    };
    ImportManagementComponent.prototype.sendLinkToNext = function (type) {
        this._linkOutput.link = this.LINK_DEFAULT;
        this._linkOutput.title = this.TITLE_DEFAULT;
        this._linkOutput.text = this.TEXT_DEFAULT;
        this._linkOutput.type = type;
        this._breadCrumService.sendLink(this._linkOutput);
    };
    ImportManagementComponent.prototype.autoOpen = function () {
        var _this = this;
        setTimeout(function () { return _this.accordion.openAll(); }, 1000);
    };
    // getTotalCost() {
    //   return this.dataSource.data.map(t => t.cost).reduce((acc, value) => acc + value, 0);
    // }
    ImportManagementComponent.prototype.getDanhSachNhapKhau = function (thang) {
        var tem = this.curentYear * 100 + thang;
        if (tem = 202001) {
            this.dataSource.data = [];
        }
        else {
            this.dataSource.data = [];
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
    };
    ImportManagementComponent.prototype.tinh_tong = function (data) {
        this.initVariable();
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            // console.log(item)
            this.TongLuongThangThucHien += item['luong_thang'];
            this.TongGiaTriThangThucHien += item['gia_tri_thang'] / 1000000;
            this.TongLuongCongDon += item['luong_cong_don'];
            this.TongGiaTriCongDon += item['gia_tri_cong_don'] / 1000000;
            // tổng cục hải quan
            this.tongluong_tc += item['luong_thang_tc'];
            this.tonggiatri_tc += item['gia_tri_thang_tc'];
            this.tongluongcongdon_tc += item['luong_cong_don_tc'];
            this.tonggiatricongdon_tc += item['gia_tri_cong_don_tc'];
        }
    };
    ImportManagementComponent.prototype.ngAfterViewInit = function () {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    ImportManagementComponent.prototype.log = function (any) {
        console.log(any);
    };
    ImportManagementComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    ImportManagementComponent.prototype.getYears = function () {
        return Array(5)
            .fill(1)
            .map(function (element, index) { return new Date().getFullYear() - index; });
    };
    ImportManagementComponent.prototype.applyDistrictFilter = function (event) { };
    // isHidden(row : any){
    //     return (this.isChecked)? (row.is_het_han) : false;
    // }
    ImportManagementComponent.prototype.applyExpireCheck = function (data) {
        var _this = this;
        // console.log(data);
        var tem_data = __spreadArrays(data);
        this.dataSource = new material_1.MatTableDataSource(tem_data.filter(function (item) { return _this.nhap_khau_chu_yeu.includes(item.id_mat_hang); }));
        this.tinh_tong(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    ImportManagementComponent.prototype.openDialog = function (id_mat_hang) {
        if (this.kiem_tra(id_mat_hang)) {
            var dialogConfig = new dialog_1.MatDialogConfig();
            dialogConfig.data = {
                data: this.handelDataDialog(id_mat_hang),
                id: 1
            };
            dialogConfig.minWidth = '80%';
            // console.log(this.handelDataDialog(id_mat_hang));
            // dialogConfig.panelClass = ['overflow-y: scroll;']
            this.matDialog.open(modal_component_1.ModalComponent, dialogConfig);
        }
    };
    ImportManagementComponent.prototype.handelDataDialog = function (id_mat_hang) {
        var data = this.dataDialog.filter(function (item) { return item.id_mat_hang === id_mat_hang; });
        return data;
    };
    ImportManagementComponent.prototype.openDanh_sach_doanh_nghiep = function (id_mat_hang, ten_san_pham) {
        var _this = this;
        this.marketService
            .GetTopExport(this.curentmonth, new Date().getFullYear(), id_mat_hang)
            .subscribe(function (data) {
            var dialogConfig = new dialog_1.MatDialogConfig();
            dialogConfig.data = {
                data: data["data"],
                id: 2,
                ten_san_pham: ten_san_pham,
                thang: _this.curentmonth
            };
            dialogConfig.minWidth = '80%';
            _this.matDialog.open(modal_component_1.ModalComponent, dialogConfig);
        });
    };
    ImportManagementComponent.prototype.applyDataTarget = function (value) {
        // this.dataTargetId[0] = 2
        // 1: cuc hai quan
        // 2: tong cuc hai quan
        // 3: cả 2 
        // if (this.dataTargetId.includes(1) && this.dataTargetId.includes(2)) {
        //     this.isOnlyTongCucHQ = 3
        // } else if (this.dataTargetId.includes(1)) {
        //     this.isOnlyTongCucHQ = 1
        // } else {
        //     this.isOnlyTongCucHQ = 2;
        // }
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
    };
    ImportManagementComponent.prototype.ExportTOExcel = function (filename, sheetname) {
        var excelExtention = ".xlsx";
        var excelFileName = filename + excelExtention;
        var ws = XLSX.utils.table_to_sheet(this.table.nativeElement);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheetname);
        /* save to file */
        XLSX.writeFile(wb, excelFileName);
    };
    ImportManagementComponent.prototype.DowloadFile = function (filename, sheetname) {
        var report = report_export_01_json_1["default"];
        switch (this.curentmonth) {
            case 2:
                report = report_export_02_json_1["default"];
                break;
            case 3:
                report = report_export_03_json_1["default"];
                break;
            case 4:
                report = report_export_04_json_1["default"];
                break;
            case 5:
                report = report_export_05_json_1["default"];
                break;
            case 6:
                report = report_export_06_json_1["default"];
                break;
            case 7:
                report = report_export_07_json_1["default"];
                break;
            case 8:
                report = report_export_08_json_1["default"];
                break;
            case 9:
                report = report_export_09_json_1["default"];
                break;
            case 10:
                report = report_export_10_json_1["default"];
                break;
            case 11:
                report = report_export_11_json_1["default"];
                break;
            case 12:
                report = report_export_12_json_1["default"];
                break;
            default:
                break;
        }
        this.excelServices.exportAsExcelFile(report, "mau_bao_cao_nhap_khau");
    };
    ImportManagementComponent.prototype.ImportTOExcel = function () {
        var dialogConfig = new dialog_1.MatDialogConfig();
        dialogConfig.data = {
            data: {}
        };
        dialogConfig.minWidth = window.innerWidth - 100;
        dialogConfig.minHeight = window.innerHeight - 100;
        this.matDialog.open(import_data_component_1.ImportDataComponent, dialogConfig);
    };
    __decorate([
        core_1.ViewChild("table", { static: false })
    ], ImportManagementComponent.prototype, "table");
    __decorate([
        core_1.ViewChild(material_1.MatAccordion, { static: true })
    ], ImportManagementComponent.prototype, "accordion");
    __decorate([
        core_1.ViewChild("paginator", { static: false })
    ], ImportManagementComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(material_1.MatSort, { static: false })
    ], ImportManagementComponent.prototype, "sort");
    ImportManagementComponent = __decorate([
        core_1.Component({
            selector: 'app-import-management',
            templateUrl: './import-management.component.html',
            styleUrls: ['../../../special_layout.scss']
        })
    ], ImportManagementComponent);
    return ImportManagementComponent;
}());
exports.ImportManagementComponent = ImportManagementComponent;
