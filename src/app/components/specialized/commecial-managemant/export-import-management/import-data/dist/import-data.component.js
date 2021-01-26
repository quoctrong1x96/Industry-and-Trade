"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ImportDataComponent = void 0;
var core_1 = require("@angular/core");
var XLSX = require("xlsx");
var material_1 = require("@angular/material");
var export_import_model_1 = require("src/app/_models/APIModel/export-import.model");
var ImportDataComponent = /** @class */ (function () {
    function ImportDataComponent(excelService) {
        this.excelService = excelService;
        this.displayedColumns = [
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
        this.displayRow1Header = [
            "index",
            "ten_san_pham",
            "thuc_hien_bao_cao_thang",
            "cong_don_den_ky_bao_cao",
            "danh_sach_doanh_nghiep",
            "chi_tiet_doanh_nghiep",
        ];
        this.displaRow2Header = [
            "luong_thang",
            "gia_tri_thang",
            "uoc_th_so_cungky_tht",
            "uoc_th_so_thg_truoc_tht",
            "luong_cong_don",
            "gia_tri_cong_don",
            "uoc_th_so_cungky_cong_don",
            "uoc_th_so_thg_truoc_cong_don",
        ];
        this.data = [];
        this.years = this.getYears();
        this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.dataTargets = [
            { id: 1, unit: "Cục hải quan" },
            { id: 2, unit: "Tổng cục hải quan" },
        ];
        this.dataTargetId = [2];
        this.currentmonth = new Date().getMonth() + 1;
        this.currentYear = new Date().getFullYear();
    }
    ImportDataComponent.prototype.ngOnInit = function () {
        this.autoOpen();
    };
    ImportDataComponent.prototype.getYears = function () {
        return Array(5)
            .fill(1)
            .map(function (element, index) { return new Date().getFullYear() - index; });
    };
    ImportDataComponent.prototype.autoOpen = function () {
        var _this = this;
        setTimeout(function () { return _this.accordion.openAll(); }, 1000);
    };
    ImportDataComponent.prototype.onFileChange = function (e) {
    };
    ImportDataComponent.prototype.incomingfile = function (event) {
        this.file = event.target.files[0];
    };
    ImportDataComponent.prototype.handleFile = function (e) {
        var _this = this;
        /* wire up file reader */
        var target = (e.target);
        if (target.files.length !== 1) {
            throw new Error('Cannot use multiple files');
        }
        var reader = new FileReader();
        reader.readAsBinaryString(target.files[0]);
        reader.onload = function (e) {
            /* create workbook */
            var binarystr = e.target.result;
            var wb = XLSX.read(binarystr, { type: 'binary' });
            /* selected the first sheet */
            var wsname = wb.SheetNames[0];
            var ws = wb.Sheets[wsname];
            /* save data */
            var data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
            console.log(data); // Data will be logged in array format containing objects
            _this.mapData(data);
        };
    };
    ImportDataComponent.prototype.mapData = function (data) {
        this.dataSource = new material_1.MatTableDataSource(data.map(function (item) {
            var tem = new export_import_model_1.ex_im_model();
            tem.ten_san_pham = item['Sản phẩm'];
            tem.luong_thang = item['Sản lượng (Nghìn tấn)'];
            tem.gia_tri_thang = item['Trị giá (Triệu USD)'];
            tem.uoc_th_so_cungky_tht = item['ƯTH so với 1 tháng cùng kỳ'];
            tem.uoc_th_so_thg_truoc_tht = item['ƯTH so với tháng trước'];
            tem.luong_cong_don = item['Sản lượng (Nghìn tấn)_1'];
            tem.gia_tri_cong_don = item['Trị giá (Triệu USD)_1'];
            tem.uoc_th_so_cungky_cong_don = item['ƯTH so với 1 tháng cùng kỳ'];
            tem.uth_so_khn = item['ƯTH so với kế hoạch năm'];
            return tem;
        }));
    };
    ImportDataComponent.prototype.save = function () {
        var date_time = this.currentYear * 100 + this.currentmonth;
        if (this.dataSource.data.length) {
            this.excelService.sharingdata(this.dataSource, date_time);
            alert('Lưu dữ liệu thành công !!');
        }
        else {
            alert('Chưa có dữ liệu !!');
        }
    };
    __decorate([
        core_1.ViewChild(material_1.MatAccordion, { static: true })
    ], ImportDataComponent.prototype, "accordion");
    ImportDataComponent = __decorate([
        core_1.Component({
            selector: "app-import-data",
            templateUrl: "./import-data.component.html",
            styleUrls: ["../../../special_layout.scss"]
        })
    ], ImportDataComponent);
    return ImportDataComponent;
}());
exports.ImportDataComponent = ImportDataComponent;
