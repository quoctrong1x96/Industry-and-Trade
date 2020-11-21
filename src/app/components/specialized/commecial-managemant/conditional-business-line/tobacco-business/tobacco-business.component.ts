import { Component, OnInit, ViewChild } from '@angular/core';
import { findEndOfBlock } from '@angular/localize/src/utils';
import { MatTable, MatTableDataSource } from '@angular/material';
import { element } from 'protractor';
import { ConditionalBusinessLineModel } from 'src/app/_models/APIModel/conditional-business-line.model';
import { ReportService } from 'src/app/_services/APIService/report.service';
import { SCTService } from 'src/app/_services/APIService/sct.service';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { District } from 'src/app/_models/district.model';

@Component({
    selector: 'tobacco-business',
    templateUrl: './tobacco-business.component.html',
    styleUrls: ['./tobacco-business.component.scss'],
})

export class TobaccoBusinessComponent implements OnInit {
    displayedColumns: string[] = ['index', 'mst', 'ten_doanh_nghiep', 'dia_chi', 'dien_thoai', 'so_giay_phep', 'ngay_cap', 'ngay_het_han', 'danh_sach_thuong_nhan', 'san_luong', 'tri_gia'];
    dataSource: MatTableDataSource<ConditionalBusinessLineModel> = new MatTableDataSource<ConditionalBusinessLineModel>();
    filteredDataSource: MatTableDataSource<ConditionalBusinessLineModel> = new MatTableDataSource<ConditionalBusinessLineModel>();
    years: number[] = [];
    districts: District[] = [{ id: 1, ten_quan_huyen: 'Thị xã Phước Long' },
    { id: 2, ten_quan_huyen: 'Thành phố Đồng Xoài' },
    { id: 3, ten_quan_huyen: 'Thị xã Bình Long' },
    { id: 4, ten_quan_huyen: 'Huyện Bù Gia Mập' },
    { id: 5, ten_quan_huyen: 'Huyện Lộc Ninh' },
    { id: 6, ten_quan_huyen: 'Huyện Bù Đốp' },
    { id: 7, ten_quan_huyen: 'Huyện Hớn Quản' },
    { id: 8, ten_quan_huyen: 'Huyện Đồng Phú' },
    { id: 9, ten_quan_huyen: 'Huyện Bù Đăng' },
    { id: 10, ten_quan_huyen: 'Huyện Chơn Thành' },
    { id: 11, ten_quan_huyen: 'Huyện Phú Riềng' }];
    sanLuongBanRa: number;
    giaTriSanPham: number;
    isChecked: boolean;
    currenttime: number = new Date().getFullYear();

    @ViewChild('table', { static: false }) table: MatTable<ConditionalBusinessLineModel>;
    @ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    constructor(public sctService: SCTService) {
    }

    ngOnInit() {
        this.years = this.getYears();
        this.getDanhSachBuonBanThuocLa(this.currenttime);
        // this.filteredDataSource.filterPredicate = function (data: ConditionalBusinessLineModel, filter): boolean {
        //     return String(data.is_het_han).includes(filter);
        // };
        this.autoOpen()
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

    getDanhSachBuonBanThuocLa(time_id: number) {
        this.sctService.GetDanhSachBuonBanThuocLa(time_id).subscribe(result => {
            this.dataSource = new MatTableDataSource<ConditionalBusinessLineModel>(result.data[0]);

            this.dataSource.data.forEach(element => {
                element.is_het_han = new Date(element.ngay_het_han) < new Date();
                result.data[1].forEach(businessman => {
                    if (businessman.id_kd_co_dk === element.id)
                        element.danh_sach_thuong_nhan += businessman.ten_thuong_nhan + '\n';
                });
            });

            this.filteredDataSource.data = [...this.dataSource.data];
            // this.filteredDataSource.data = this.filteredDataSource.data.concat(this.filteredDataSource.data);
            // this.filteredDataSource.data = this.filteredDataSource.data.concat(this.filteredDataSource.data);
            // this.filteredDataSource.data = this.filteredDataSource.data.concat(this.filteredDataSource.data);
            this.sanLuongBanRa = this.filteredDataSource.data.length ? this.filteredDataSource.data.map(x => x.san_luong).reduce((a, b) => a + b) : 0 * 1000;
            this.giaTriSanPham = this.filteredDataSource.data.length ? this.filteredDataSource.data.map(x => x.tri_gia).reduce((a, b) => a + b) : 0 / 1000;
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
        return Array(5).fill(1).map((element, index) => new Date().getFullYear() - index);
    }

    applyDistrictFilter(event) {
        let filteredData = [];

        event.value.forEach(element => {
            this.dataSource.data.filter(x => x.id_quan_huyen == element).forEach(x => filteredData.push(x));
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
        this.sanLuongBanRa = this.filteredDataSource.data.length ? this.filteredDataSource.data.map(x => x.san_luong).reduce((a, b) => a + b) : 0 * 1000;
        this.giaTriSanPham = this.filteredDataSource.data.length ? this.filteredDataSource.data.map(x => x.tri_gia).reduce((a, b) => a + b) : 0 / 1000;
    }

    // isHidden(row : any){
    //     return (this.isChecked)? (row.is_het_han) : false;
    // }

    applyExpireCheck(event) {
        console.log(event);
        this.filteredDataSource.filter = (event.checked) ? "true" : "";
    }
}