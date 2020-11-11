import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource, MatTable, MatAccordion, MatPaginator } from '@angular/material';
import { ex_im_model } from 'src/app/_models/APIModel/export-import.model';
import { District } from 'src/app/_models/district.model';

@Component({ 
    selector: 'jw-modal', 
    templateUrl: 'modal.component.html', 
    styleUrls: ['modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {

    displayedColumns: string[] = ['index', 'ten_san_pham', 'id_quoc_gia', 'luong_thang', 'gia_tri_thang', 'luong_cong_don', 'gia_tri_cong_don'];
    dataSource: any;
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
    
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        ) {
    }

    ngOnInit(): void {
        console.log('xxx', this.data)
        this.dataSource = this.data;
    }
}