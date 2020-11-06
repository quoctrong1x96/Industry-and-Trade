import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { District } from 'src/app/_models/district.model';
import { notification_management } from '../../../../../_models/APIModel/ecommerce.model'

@Component({
  selector: 'app-informed-ecommerce-website',
  templateUrl: './informed-ecommerce-website.component.html',
  styles: []
})
export class InformedEcommerceWebsiteComponent implements OnInit {

  filteredDataSource: MatTableDataSource<notification_management>;
  dataSource: MatTableDataSource<notification_management>;
  constructor() { }

  ngOnInit() {

  }

  districts: District[] = [
    { id: 1, ten_quan_huyen: 'Thị xã Phước Long' },
    { id: 2, ten_quan_huyen: 'Thành phố Đồng Xoài' },
    { id: 3, ten_quan_huyen: 'Thị xã Bình Long' },
    { id: 4, ten_quan_huyen: 'Huyện Bù Gia Mập' },
    { id: 5, ten_quan_huyen: 'Huyện Lộc Ninh' },
    { id: 6, ten_quan_huyen: 'Huyện Bù Đốp' },
    { id: 7, ten_quan_huyen: 'Huyện Hớn Quản' },
    { id: 8, ten_quan_huyen: 'Huyện Đồng Phú' },
    { id: 9, ten_quan_huyen: 'Huyện Bù Đăng' },
    { id: 10, ten_quan_huyen: 'Huyện Chơn Thành' },
    { id: 11, ten_quan_huyen: 'Huyện Phú Riềng' }
  ];

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
    // this.sanLuongBanRa = this.filteredDataSource.data.length ? this.filteredDataSource.data.map(x => x.san_luong).reduce((a, b) => a + b) : 0;
  }

}
