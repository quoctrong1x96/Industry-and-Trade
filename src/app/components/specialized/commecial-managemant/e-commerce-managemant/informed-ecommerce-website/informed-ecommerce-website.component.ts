import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { District } from 'src/app/_models/district.model';
import { notification_management } from '../../../../../_models/APIModel/ecommerce.model'

@Component({
  selector: 'app-informed-ecommerce-website',
  templateUrl: './informed-ecommerce-website.component.html',
  styleUrls: ['./informed-ecommerce-website.component.scss']
})
export class InformedEcommerceWebsiteComponent implements OnInit {

  filteredDataSource: MatTableDataSource<notification_management>;
  dataSource: MatTableDataSource<notification_management>;
  constructor() { }
  data: Array<notification_management> =[{email: "sct.bp@binhphuoc.gov.vn",dia_chi:"Đường Hùng Vương, Phường Tân Bình,  TP. Đồng Xoài, tỉnh Bình Phước",dien_thoai:"02713879199",id_quan_huyen:1,index:1,ma_nganh:0,mst:"48/2018/QĐ-UBND",nganh_nghe:"nông sản, gỗ, cao su, dưa lưới",ten_mien:"ecombinhphuoc.com.cn",ten_to_chuc:"Sở Công Thương tỉnh Bình Phước"},
  {email:"tungtatungtang2018@gmail.com",dia_chi:"Tổ 6, ấp 1, X. Tân Khai, H. Hớn Quản, Bình Phước",dien_thoai:"0972374926",id_quan_huyen:7,index:2,ma_nganh:0,mst:"3801187468",nganh_nghe:"Bất động sản, Hàng điện tử, điện lạnh, đồ gia dụng, Máy tính, điện thoại, thiết bị văn phòng, Ôtô, xe máy, xe đạp, Sách, văn phòng phẩm, Thiết bị nội thất, ngoại thất, Thời trang, mỹ phẩm, chăm sóc sức khỏe, Dịch vụ lưu trú và du lịch, Dịch vụ việc làm, Mẹ và bé",ten_mien:"tungtatungtang.com",ten_to_chuc:"Công ty TNHH Một thành viên Quảng cáo và Tổ chức sự kiện Hớn Quản"},];
  ngOnInit() {
    this.dataSource = new MatTableDataSource<notification_management>();
    this.dataSource.data = this.data;
    console.log(this.dataSource.data);
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
