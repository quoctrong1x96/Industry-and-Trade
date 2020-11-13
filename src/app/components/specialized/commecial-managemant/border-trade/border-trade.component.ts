import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable, MatAccordion, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { SCTService } from 'src/app/_services/APIService/sct.service';
import { MarketService } from 'src/app/_services/APIService/market.service';
import { ModalComponent } from '../export-import-management/dialog-import-export/modal.component';
import { BorderTrade } from 'src/app/_models/APIModel/border-trade.model'
import { concat } from 'rxjs';

export class GroupProduct {
  group_code: number;
  group_name: string;
  isGroup: boolean;
}

@Component({
  selector: 'app-border-trade',
  templateUrl: './border-trade.component.html',
  styleUrls: ['./border-trade.component.scss']
})
export class BorderTradeComponent implements OnInit {
  displayedColumns: string[] = [
    "id_mat_hang_xnk",
    "so_luong",
    "don_vi",
    "kim_ngach",
    "ten_doanh_nghiep"
  ];
  danh_sach: string[] = [
    'I. Hàng hóa xuất khẩu, nhập khẩu thương mại',
    'II. Hàng hóa mua bán, trao đổi của cư dân biên giới',
    'III. Hàng kinh doanh miễn thuế',
    'IV. Hàng hóa kinh doanh tậm nhập, tái xuất: ',
    'V. Khác',
  ];

  danh_sach_con: string[] = [
    '1.Xuất khẩu',
    '2. Nhập khẩu',
    '1. Tái xuất',
    '2. Tạm nhập'
  ];

  gr1: GroupProduct[] = [
    { group_code: 1, group_name: this.danh_sach[0], isGroup: true },
    { group_code: 1, group_name: this.danh_sach_con[0], isGroup: true },
    { group_code: 1, group_name: this.danh_sach_con[1], isGroup: true },
  ];
  gr2: GroupProduct[] = [
    { group_code: 2, group_name: this.danh_sach[1], isGroup: true },
    { group_code: 2, group_name: this.danh_sach_con[0], isGroup: true },
    { group_code: 2, group_name: this.danh_sach_con[1], isGroup: true }
  ]
  gr3: GroupProduct[] = [
    { group_code: 3, group_name: this.danh_sach[0], isGroup: true },
    { group_code: 3, group_name: this.danh_sach_con[2], isGroup: true },
    { group_code: 3, group_name: this.danh_sach_con[3], isGroup: true },
  ]
  gr4: GroupProduct[] = [
    { group_code: 4, group_name: this.danh_sach[3], isGroup: true },
    { group_code: 4, group_name: this.danh_sach_con[0], isGroup: true },
    { group_code: 4, group_name: this.danh_sach_con[1], isGroup: true },
  ]
  gr5: GroupProduct[] = [
    { group_code: 5, group_name: this.danh_sach[4], isGroup: true },
    { group_code: 5, group_name: this.danh_sach_con[0], isGroup: true },
    { group_code: 5, group_name: this.danh_sach_con[1], isGroup: true },
  ]
  danh_sach_cua_khau: any[] = [
    { ten_cua_khau: "Lộc Thịnh", id_cua_khau: 3 },
    { ten_cua_khau: "Hoàng Diệu", id_cua_khau: 2 },
    { ten_cua_khau: "Hoa Lư", id_cua_khau: 1 }
  ]
  id_cua_khau: number = 1;
  cua_khau: string = this.danh_sach_cua_khau[2].ten_cua_khau;
  dataSourceI: (BorderTrade | GroupProduct)[] = [];
  filteredDataSource: MatTableDataSource<BorderTrade> = new MatTableDataSource<BorderTrade>();
  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
 
  isChecked: boolean;
  pagesize: number = 0;
  curentmonth: number = new Date().getMonth() + 1;
  @ViewChild("table", { static: false }) table: MatTable<BorderTrade>;
  @ViewChild(MatAccordion, { static: true }) accordion: MatAccordion;
  @ViewChild("paginator", { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  groupI: GroupProduct;
  groupII: GroupProduct;
  groupIII: GroupProduct;
  groupIV: GroupProduct;
  groupV: GroupProduct;

  TongKimNgachThangNhomIxk: number = 0;
  TongLuongThangNhomIxk: number = 0;
  TongKimNgachThangNhomInk: number = 0;
  TongLuongThangNhomInk: number = 0;

  TongKimNgachThangNhomIIxk: number = 0;
  TongLuongThangNhomIIxk: number = 0;
  TongKimNgachThangNhomIInk: number = 0;
  TongLuongThangNhomIInk: number = 0;

  TongKimNgachThangNhomIIIxk: number = 0;
  TongLuongThangNhomIIIxk: number = 0;
  TongKimNgachThangNhomIIInk: number = 0;
  TongLuongThangNhomIIInk: number = 0;

  TongKimNgachThangNhomIVxk: number = 0;
  TongLuongThangNhomIVxk: number = 0;
  TongKimNgachThangNhomIVnk: number = 0;
  TongLuongThangNhomIVnk: number = 0;

  TongKimNgachThangNhomVxk: number = 0;
  TongLuongThangNhomVxk: number = 0;
  TongKimNgachThangNhomVnk: number = 0;
  TongLuongThangNhomVnk: number = 0;

  constructor(
    private sctService: SCTService,
    private matDialog: MatDialog,
    private marketService: MarketService
  ) { }

  ngOnInit() {
    // this.autoOpen();
    this.createGroup();
    console.log(this.groupI)  
    this.getThuongMaiBG(this.curentmonth);
    this.autoOpen();
  }

  createGroup() {
    this.initGroup(this.groupI = new GroupProduct(), 1);
    this.initGroup(this.groupII = new GroupProduct(), 2);
    this.initGroup(this.groupIII = new GroupProduct(), 3);
    this.initGroup(this.groupIV = new GroupProduct(), 4);
    this.initGroup(this.groupV = new GroupProduct(), 5);
  }

  initGroup(gr: GroupProduct, code: number) {
    gr.group_code = code;
    gr.group_name = this.danh_sach[code - 1];
    gr.isGroup = true;
  }

  autoOpen() {
    setTimeout(() => this.accordion.openAll(), 1000);
  }

  // getTotalCost() {
  //   return this.dataSource.data.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  // }

  selectGate(id_gate){
    this.id_cua_khau = id_gate;
    this.getThuongMaiBG(this.curentmonth)
  }

  selectMonth(month){
    this.curentmonth = month;
    this.getThuongMaiBG(this.curentmonth)
  }

  getThuongMaiBG(thang) {
    let tem = new Date().getFullYear() * 100 + thang;
    this.sctService.GetDanhSachXuatNhapKhauBG(tem, this.id_cua_khau).subscribe((result) => {
     
      this.sapxepXK(result.data[0], this.gr1);
      this.sapxepNK(result.data[1], this.gr1);

      this.sapxepXK(result.data[2], this.gr2);
      this.sapxepNK(result.data[3], this.gr2);

      this.sapxepXK(result.data[4], this.gr3);
      this.sapxepNK(result.data[5], this.gr3);

      this.sapxepXK(result.data[6], this.gr4);
      this.sapxepNK(result.data[7], this.gr4);

      this.sapxepXK(result.data[8], this.gr5);
      this.sapxepNK(result.data[9], this.gr5);

      this.dataSourceI = [...result.data[0],...result.data[1],...result.data[2],...result.data[3],...result.data[4],...result.data[5],...result.data[6],...result.data[7],...result.data[8],...result.data[9]]
      console.log(this.dataSourceI)
    });
  }

  sapxepXK(resultDataXK, gr) {
    let dataGroupIxk = this.xulysolieu(resultDataXK);
    resultDataXK.push(dataGroupIxk);
    resultDataXK.splice(0, 0, gr[0]);
    resultDataXK.splice(1, 0, gr[1]);
    
  }
  sapxepNK(resulDatatNK, gr){
    let dataGroupIxk = this.xulysolieu(resulDatatNK);
    resulDatatNK.push(dataGroupIxk);
    resulDatatNK.splice(1, 0, gr[2]);
    
  }

  xulysolieu(data) {
    let tong_so_luong = 0;
    let tong_kim_ngach = 0;
    for (const iterator of data) {
      tong_so_luong += iterator.so_luong;
      tong_kim_ngach += iterator.kim_ngach;
    }
    // this.TongLuongThangThucHien = tong_so_luong;
    // this.TongKimNgachThangThucHien = tong_kim_ngach;
    let ob = {
      id_mat_hang_xnk: 0,
      so_luong: tong_so_luong,
      don_vi: '',
      kim_ngach: tong_kim_ngach,
      ten_doanh_nghiep: ''
    }
    return ob;
  }

  isGroup(index, item): boolean {
    return item.isGroup;
  }

  log(any) {
    console.log(any);
  }

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  getYears() {
    return Array(5)
      .fill(1)
      .map((element, index) => new Date().getFullYear() - index);
  }

  applyExpireCheck(event) {
    console.log(event);
    this.filteredDataSource.filter = event.checked ? "true" : "";
  }
}
