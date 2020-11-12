import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SaleWebsite, SaleWebsiteFilterModel, ECommerceWebsite } from 'src/app/_models/APIModel/e-commerce.model';
import { District } from 'src/app/_models/district.model';
import { SCTService } from 'src/app/_services/APIService/sct.service';
import { registration_management } from "../../../../../_models/APIModel/ecommerce.model";
@Component({
  selector: 'registered-sale-website',
  templateUrl: './registered-sale-website.component.html',
  styleUrls: ['./registered-sale-website.component.scss']
})
export class RegisteredSaleWebsiteComponent implements OnInit {

  displayedColumns : string[] = ['index', 'mst', 'ten_tc_cn', 'dia_chi', 'dien_thoai', 'ten_mien', 'nganh_nghe', 'ma_so_nganh_nghe'];
  dataSource: MatTableDataSource<SaleWebsite>;
  filteredDataSource: MatTableDataSource<SaleWebsite> = new MatTableDataSource<SaleWebsite>();
  filterModel : SaleWebsiteFilterModel = {id_quan_huyen :[]};
  constructor(private sctService : SCTService) { }

  ngOnInit() {
    this.GetDanhSachWebsiteTMDT();
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

  GetDanhSachWebsiteTMDT(){
    this.sctService.GetDanhSachWebBH().subscribe(response => {
      console.log(response)
      this.dataSource = new MatTableDataSource<SaleWebsite>(response.data);
      this.filteredDataSource.data = [...this.dataSource.data];
    })
  }

  applyFilter() {
    console.log(this.filterModel)
    let filteredData = this.filterArray(this.dataSource.data, this.filterModel);
        if (!filteredData.length) {
            if (this.filterModel)
                this.filteredDataSource.data = [];
            else
                this.filteredDataSource.data = this.dataSource.data;
        }
        else {
            this.filteredDataSource.data = filteredData;
        }
  }

  filterArray(array, filters) {
    const filterKeys = Object.keys(filters);
    let temp = [...array];
    filterKeys.forEach(key => {
        let temp2 = [];
        if (filters[key].length) {
            filters[key].forEach(criteria => {
                temp2 = temp2.concat(temp.filter(x => x[key] == criteria));
            });
            temp = [...temp2];
        }
    })
    return temp;
}
}
