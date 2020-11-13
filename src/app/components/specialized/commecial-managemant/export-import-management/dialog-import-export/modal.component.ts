import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource, MatTable, MatAccordion, MatPaginator } from '@angular/material';
import { ex_im_model } from 'src/app/_models/APIModel/export-import.model';
import { District } from 'src/app/_models/district.model';
import { CompanyDetailModel } from 'src/app/_models/APIModel/domestic-market.model';
import { log } from 'util';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({ 
    selector: 'jw-modal', 
    templateUrl: 'modal.component.html', 
    styleUrls: ['modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {
    public displayedColumns_business: string[] = ['index', 'ten_doanh_nghiep', 'cong_suat', 'mst', 'dia_chi', 'dien_thoai', 'nganh_nghe_kd', 'chi_tiet_doanh_nghiep'];
    ten_san_pham: string = '';
    so_doanh_nghiep: number = 0;
    displayedColumns: string[] = ['index', 'ten_san_pham', 'id_quoc_gia', 'luong_thang', 'gia_tri_thang', 'luong_cong_don', 'gia_tri_cong_don'];
    dataSource;
    dataDialog: any[] = [];
    filteredDataSource: MatTableDataSource<ex_im_model> = new MatTableDataSource<ex_im_model>();
    years: number[] = [];
    months: number[] = [1,2,3,4,5,6,7,8,9,10,11,12]
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
    sanLuongBanRa: number = 0;
    soLuongdoanhNghiep: number;
    isChecked: boolean;
    curentmonth: number = new Date().getMonth();
    @ViewChild('table', { static: false }) table: MatTable<ex_im_model>;
    @ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    TongLuongThangThucHien: number = 0;
    TongGiaTriThangThucHien: number = 0;
    TongLuongCongDon: number = 0;
    TongGiaTriCongDon: number = 0;
    id: number = 1;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public router : Router
        ) {
    }

    ngOnInit(): void {
        console.log('xxx', this.data)
        this.handleData();
    }

    handleData(){
        this.id = this.data['id'];
        if(this.id === 1){
            this.dataSource = new MatTableDataSource<ex_im_model>(this.data['data']);
            for (let item of this.data['data']) {
                // console.log(item)
                this.TongLuongThangThucHien += item['luong_thang'];
                this.TongGiaTriThangThucHien += item['gia_tri_thang'];
                this.TongLuongCongDon += item['luong_cong_don'];
                this.TongGiaTriCongDon += item['gia_tri_cong_don'];
            }
        } else {
            this.ten_san_pham = this.data['ten_san_pham'];
            this.so_doanh_nghiep = this.data['data'].length;
            if(this.data['data'].length)
                this.dataSource = new MatTableDataSource<CompanyDetailModel>(this.data['data'])
            else
                this.dataSource = new MatTableDataSource<CompanyDetailModel>()

            console.log(this.dataSource)
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        // debugger
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }
      public OpenDetailCompany(mst: string) {
        let url = this.router.serializeUrl(
          this.router.createUrlTree([encodeURI('#') + '/partner/search/' + mst]));
        window.open(url.replace('%23', '#'), "_blank");
      }
}