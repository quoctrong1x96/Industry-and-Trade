import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatOption, MatSelect, MatTable, MatTableDataSource } from '@angular/material';
import { element } from 'protractor';
import { ConditionalBusinessLineModel } from 'src/app/_models/APIModel/conditional-business-line.model';
import { ReportService } from 'src/app/_services/APIService/report.service';
import { SCTService } from 'src/app/_services/APIService/sct.service';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { District } from 'src/app/_models/district.model';
import * as XLSX from 'xlsx';

@Component({
    selector: 'petrol-business',
    templateUrl: './petrol-business.component.html',
    styleUrls: ['../../../special_layout.scss'],
})

export class PetrolBusinessComponent implements OnInit {
    displayedColumns: string[] = ['index', 'mst', 'ten_doanh_nghiep', 'ten_cua_hang', 'dia_chi', 'dien_thoai', 'so_giay_phep', 'ngay_cap', 'ngay_het_han', 'danh_sach_thuong_nhan', 'san_luong', 'ghi_chu'];
    dataSource: MatTableDataSource<ConditionalBusinessLineModel> = new MatTableDataSource<ConditionalBusinessLineModel>();
    filteredDataSource: MatTableDataSource<ConditionalBusinessLineModel> = new MatTableDataSource<ConditionalBusinessLineModel>();
    years: number[] = [];
    districts: District[] = [{ id: 1, ten_quan_huyen: 'Phước Long' },
    { id: 2, ten_quan_huyen: 'Đồng Xoài' },
    { id: 3, ten_quan_huyen: 'Bình Long' },
    { id: 4, ten_quan_huyen: 'Bù Gia Mập' },
    { id: 5, ten_quan_huyen: 'Lộc Ninh' },
    { id: 6, ten_quan_huyen: 'Bù Đốp' },
    { id: 7, ten_quan_huyen: 'Hớn Quản' },
    { id: 8, ten_quan_huyen: 'Đồng Phú' },
    { id: 9, ten_quan_huyen: 'Bù Đăng' },
    { id: 10, ten_quan_huyen: 'Chơn Thành' },
    { id: 11, ten_quan_huyen: 'Phú Riềng' }];
    sanLuongBanRa: number;
    soLuongDoanhNghiep: number;
    soLuongThuongNhanCungCap: number;
    isChecked: boolean;

    @ViewChild('table', { static: false }) table: ElementRef;
    @ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


    constructor(public sctService: SCTService) {
    }

    ngOnInit() {
        this.years = this.getYears();
        // this.filteredDataSource.filterPredicate = function (data: ConditionalBusinessLineModel, filter): boolean {
        //     return String(data.is_het_han).includes(filter);
        // };
        this.getDanhSachBuonBanLeXangDau(0);
        this.autoOpen();
    }

    autoOpen() {
        setTimeout(() => this.accordion.openAll(), 1000);
    }

    // ngAfterViewInit(): void {
    //     //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //     //Add 'implements AfterViewInit' to the class.
    //     this.accordion.openAll();
    // }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.filteredDataSource.filter = filterValue.trim().toLowerCase();
    }

    getDanhSachBuonBanLeXangDau(time_id: number) {
        this.sctService.GetDanhSachBanLeXangDau(2020).subscribe(result => {
            this.dataSource = new MatTableDataSource<ConditionalBusinessLineModel>(result.data[0]);
            console.log(this.dataSource);

            this.dataSource.data.forEach(element => {
                element.is_het_han = new Date(element.ngay_het_han) < new Date();
                result.data[1].forEach(businessman => {
                    if (businessman.id_kd_co_dk === element.id) {
                        element.danh_sach_thuong_nhan += businessman.ten_thuong_nhan + '\n';
                    }
                });
            });
            if (time_id != 0)
                this.filteredDataSource.data = [...this.dataSource.data.filter(x => new Date(x.ngay_cap).getFullYear() == time_id)];
            else
                this.filteredDataSource.data = [...this.dataSource.data];
            this.sanLuongBanRa = this.filteredDataSource.data.length ? this.filteredDataSource.data.map(x => x.san_luong).reduce((a, b) => a + b) : 0;
            this.soLuongThuongNhanCungCap = this.filteredDataSource.data.length ? [...new Set(this.filteredDataSource.data.map(x => x.danh_sach_thuong_nhan))].length : 0;
            this.filteredDataSource.paginator = this.paginator;
            this.paginator._intl.itemsPerPageLabel = 'Số hàng';
            this.paginator._intl.firstPageLabel = "Trang Đầu";
            this.paginator._intl.lastPageLabel = "Trang Cuối";
            this.paginator._intl.previousPageLabel = "Trang Trước";
            this.paginator._intl.nextPageLabel = "Trang Tiếp";
        })
    }

    log(any) {
        console.log(any);
    }

    getYears() {
        return [0, ...Array(5).fill(1).map((element, index) => new Date().getFullYear() - index)];
    }

    applyDistrictFilter(event) {
        let filteredData = [];

        event.value.forEach(element => {
            this.dataSource.data.filter(x => x.dia_chi_cua_hang.toLowerCase().includes(element.toLowerCase())).forEach(x => filteredData.push(x));
        });

        if (!filteredData.length) {
            if (event.value.length)
                this.filteredDataSource.data = [];
            else
                this.filteredDataSource.data = this.dataSource.data;
        }
        else {
            this.filteredDataSource.data = filteredData;
        }
        this.sanLuongBanRa = this.filteredDataSource.data.length ? this.filteredDataSource.data.map(x => x.san_luong).reduce((a, b) => a + b) : 0;
        this.soLuongThuongNhanCungCap = this.filteredDataSource.data.length ? [...new Set(this.filteredDataSource.data.map(x => x.danh_sach_thuong_nhan))].length : 0;
    }

    // isHidden(row : any){
    //     return (this.isChecked)? (row.is_het_han) : false;
    // }

    applyExpireCheck(event) {
        console.log(event);
        this.filteredDataSource.filter = (event.checked) ? "true" : "";
    }

    countBusiness(): number {
        return [...new Set(this.filteredDataSource.data.map(x => x.mst.toString().split('-')[0]))].length;
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

    @ViewChild('dSelect', { static: false }) dSelect: MatSelect;
    allSelected = false;
    toggleAllSelection() {
        this.allSelected = !this.allSelected;  // to control select-unselect

        if (this.allSelected) {
            this.dSelect.options.forEach((item: MatOption) => item.select());
        } else {
            this.dSelect.options.forEach((item: MatOption) => item.deselect());
        }
        this.dSelect.close();
    }
}
