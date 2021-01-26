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
exports.BorderTradeImportComponent = void 0;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var link_model_1 = require("src/app/_models/link.model");
var modal_component_1 = require("../../export-import-management/dialog-import-export/modal.component");
var data_1 = require("../../border-trade/border-trade-import/data");
var XLSX = require("xlsx");
var gate = /** @class */ (function () {
    function gate() {
    }
    return gate;
}());
var BorderTradeImportComponent = /** @class */ (function () {
    function BorderTradeImportComponent(sctService, matDialog, marketService, _breadCrumService) {
        this.sctService = sctService;
        this.matDialog = matDialog;
        this.marketService = marketService;
        this._breadCrumService = _breadCrumService;
        //Constant
        this.LINK_DEFAULT = "/specialized/commecial-management/export_import/exported_products";
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
        this.dataSource = new material_1.MatTableDataSource([]);
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
        this.xuat_khau_chu_yeu = [1, 6, 8, 4, 7, 21, 13, 27, 82, 51, 28, 20, 31, 19, 23];
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
    BorderTradeImportComponent.prototype.handleGTXK = function () {
        // this.TongGiaTriThangThucHien = this.dataSource.data[15].gia_tri_thang;
        // this.uth_so_cungky = this.dataSource.data[15].uoc_th_so_cungky_tht;
        // this.TongGiaTriCongDon = this.dataSource.data[15].gia_tri_cong_don;
        // this.uth_so_khn = this.dataSource.data[15].uoc_th_so_thg_truoc_cong_don;
    };
    BorderTradeImportComponent.prototype.initVariable = function () {
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
    BorderTradeImportComponent.prototype.kiem_tra = function (id_mat_hang) {
        if (this.xuat_khau_chu_yeu.includes(id_mat_hang))
            return true;
        return false;
    };
    BorderTradeImportComponent.prototype.ngOnInit = function () {
        this.getDanhSachXuatKhau(this.curentmonth);
        this.autoOpen();
        this.sendLinkToNext(true);
        this.handleGTXK();
    };
    BorderTradeImportComponent.prototype.sendLinkToNext = function (type) {
        this._linkOutput.link = this.LINK_DEFAULT;
        this._linkOutput.title = this.TITLE_DEFAULT;
        this._linkOutput.text = this.TEXT_DEFAULT;
        this._linkOutput.type = type;
        this._breadCrumService.sendLink(this._linkOutput);
    };
    BorderTradeImportComponent.prototype.autoOpen = function () {
        var _this = this;
        setTimeout(function () { return _this.accordion.openAll(); }, 1000);
    };
    // getTotalCost() {
    //   return this.dataSource.data.map(t => t.cost).reduce((acc, value) => acc + value, 0);
    // }
    BorderTradeImportComponent.prototype.getDanhSachXuatKhau = function (value) {
        var time_id = this.curentYear * 100 + this.curentmonth;
        if (time_id == 202001) {
            this.dataSource.data = [];
            // this.dataDialog = dataDialogM1;
        }
        if (time_id == 202002) {
            this.dataSource.data = [];
            // this.dataDialog = dataDialogM2;
        }
        if (time_id == 202003) {
            this.dataSource.data = [];
            // this.dataDialog = dataDialogM3;
        }
        if (time_id == 202004) {
            this.dataSource.data = [];
            // this.dataDialog = dataDialogM4;
        }
        if (time_id == 202005) {
            this.dataSource.data = [];
            // this.dataDialog = dataDialogM5;
        }
        if (time_id == 202006) {
            this.dataSource.data = [];
            // this.dataDialog = dataDialogM6;
        }
        if (time_id == 202007) {
            this.dataSource.data = [];
            // this.dataDialog = dataDialogM7
        }
        if (time_id == 202008) {
            this.dataSource.data = [];
            // this.dataDialog = dataDialogM8
        }
        if (time_id == 202009) {
            this.dataSource.data = [];
            // this.dataDialog = dataDialogM9;
        }
        if (time_id == 202010) {
            this.dataSource.data = [];
            // this.dataDialog = dataDialogM10
        }
        if (time_id == 202011) {
            this.dataSource.data = data_1.data_xk_t11;
            // this.dataDialog = dataDialogM11;
        }
        if (time_id == 202012) {
            this.dataSource.data = [];
            // this.dataDialog = dataDialogM12;
        }
    };
    BorderTradeImportComponent.prototype.tinh_tong = function (data) {
        this.initVariable();
        for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
            var item = data_2[_i];
            // console.log(item)
            this.TongLuongThangThucHien += item['luong_thang'];
            this.TongGiaTriThangThucHien += item['gia_tri_thang'];
            this.TongLuongCongDon += item['luong_cong_don'];
            this.TongGiaTriCongDon += item['gia_tri_cong_don'];
            // tổng cục hải quan
            this.tongluong_tc += item['luong_thang_tc'];
            this.tonggiatri_tc += item['gia_tri_thang_tc'];
            this.tongluongcongdon_tc += item['luong_cong_don_tc'];
            this.tonggiatricongdon_tc += item['gia_tri_cong_don_tc'];
        }
    };
    BorderTradeImportComponent.prototype.ngAfterViewInit = function () {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    BorderTradeImportComponent.prototype.log = function (any) {
        console.log(any);
    };
    BorderTradeImportComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    BorderTradeImportComponent.prototype.getYears = function () {
        return Array(5)
            .fill(1)
            .map(function (element, index) { return new Date().getFullYear() - index; });
    };
    BorderTradeImportComponent.prototype.applyDistrictFilter = function (event) { };
    // isHidden(row : any){
    //     return (this.isChecked)? (row.is_het_han) : false;
    // }
    BorderTradeImportComponent.prototype.applyExpireCheck = function (data) {
        var _this = this;
        // console.log(data);
        var tem_data = __spreadArrays(data);
        this.dataSource = new material_1.MatTableDataSource(tem_data.filter(function (item) { return _this.xuat_khau_chu_yeu.includes(item.id_mat_hang); }));
        this.tinh_tong(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    BorderTradeImportComponent.prototype.openDialog = function (id_mat_hang) {
        // if (this.kiem_tra(id_mat_hang)) {
        var dialogConfig = new material_1.MatDialogConfig();
        dialogConfig.data = {
            data: this.handelDataDialog(id_mat_hang),
            id: 1
        };
        dialogConfig.minHeight = '100%';
        dialogConfig.minWidth = '90%';
        this.matDialog.open(modal_component_1.ModalComponent, dialogConfig);
        // }
    };
    BorderTradeImportComponent.prototype.handelDataDialog = function (id_mat_hang) {
        // let data = this.dataDialog.filter(
        //     (item) => item.id_mat_hang === id_mat_hang
        // );
        // return data;
    };
    BorderTradeImportComponent.prototype.openDanh_sach_doanh_nghiep = function (id_mat_hang, ten_san_pham) {
        var _this = this;
        this.marketService
            .GetTopExport(this.curentmonth, new Date().getFullYear(), id_mat_hang)
            .subscribe(function (data) {
            var dialogConfig = new material_1.MatDialogConfig();
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
    BorderTradeImportComponent.prototype.applyDataTarget = function (value) {
    };
    BorderTradeImportComponent.prototype.ExportTOExcel = function (filename, sheetname) {
        var excelExtention = ".xlsx";
        var excelFileName = filename + excelExtention;
        var ws = XLSX.utils.table_to_sheet(this.table.nativeElement);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheetname);
        /* save to file */
        XLSX.writeFile(wb, excelFileName);
    };
    __decorate([
        core_1.ViewChild("table", { static: false })
    ], BorderTradeImportComponent.prototype, "table");
    __decorate([
        core_1.ViewChild(material_1.MatAccordion, { static: true })
    ], BorderTradeImportComponent.prototype, "accordion");
    __decorate([
        core_1.ViewChild("paginator", { static: false })
    ], BorderTradeImportComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(material_1.MatSort, { static: false })
    ], BorderTradeImportComponent.prototype, "sort");
    BorderTradeImportComponent = __decorate([
        core_1.Component({
            selector: 'app-border-trade-import',
            templateUrl: './border-trade-import.component.html',
            styleUrls: ["../../../special_layout.scss"]
        })
    ], BorderTradeImportComponent);
    return BorderTradeImportComponent;
}());
exports.BorderTradeImportComponent = BorderTradeImportComponent;
