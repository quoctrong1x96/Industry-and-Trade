import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable, MatAccordion, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { SCTService } from 'src/app/_services/APIService/sct.service';
import { MarketService } from 'src/app/_services/APIService/market.service';
import { ModalComponent } from '../export-import-management/dialog-import-export/modal.component';
import { BorderTrade } from 'src/app/_models/APIModel/border-trade.model'
import { concat } from 'rxjs';
import { LinkModel } from 'src/app/_models/link.model';
import { BreadCrumService } from 'src/app/_services/injectable-service/breadcrums.service';
import { ExcelUitl } from 'src/app/_services/excelUtil.service';
import * as XLSX from 'xlsx';

export class GroupProduct {
  group_code: number;
  group_name: string;
  isGroup: boolean;
}

@Component({
  selector: 'app-border-trade',
  templateUrl: './border-trade.component.html',
  styleUrls: ['/../../special_layout.scss'],
})
export class BorderTradeComponent implements OnInit {
  //Constant
  private readonly LINK_DEFAULT: string = "/specialized/commecial-management/border_trade";
  private readonly TITLE_DEFAULT: string = "Thương mại biên giới";
  private readonly TEXT_DEFAULT: string = "Thương mại biên giới";
  //
  displayedColumns: string[] = [
    "id_mat_hang_xnk",
    "so_luong",
    "don_vi",
    "kim_ngach",
    "ten_doanh_nghiep"
  ];
  danh_sach: any[] = [
    { id: 1, value: 'I. Hàng hóa xuất khẩu, nhập khẩu thương mại' },
    { id: 2, value: 'II. Hàng hóa mua bán, trao đổi của cư dân biên giới' },
    { id: 3, value: 'III. Hàng kinh doanh miễn thuế' },
    { id: 4, value: 'IV. Hàng hóa kinh doanh tậm nhập, tái xuất: ' },
    { id: 5, value: 'V. Khác' },
  ];

  danh_sach_con: string[] = [
    '1.Xuất khẩu',
    '2. Nhập khẩu',
    '1. Tái xuất',
    '2. Tạm nhập'
  ];

  gr1: GroupProduct[] = [
    { group_code: 1, group_name: this.danh_sach[0].value, isGroup: true },
    { group_code: 1, group_name: this.danh_sach_con[0], isGroup: true },
    { group_code: 1, group_name: this.danh_sach_con[1], isGroup: true },
  ];
  gr2: GroupProduct[] = [
    { group_code: 2, group_name: this.danh_sach[1].value, isGroup: true },
    { group_code: 2, group_name: this.danh_sach_con[0], isGroup: true },
    { group_code: 2, group_name: this.danh_sach_con[1], isGroup: true }
  ]
  gr3: GroupProduct[] = [
    { group_code: 3, group_name: this.danh_sach[2].value, isGroup: true },
    { group_code: 3, group_name: this.danh_sach_con[2], isGroup: true },
    { group_code: 3, group_name: this.danh_sach_con[3], isGroup: true },
  ]
  gr4: GroupProduct[] = [
    { group_code: 4, group_name: this.danh_sach[3].value, isGroup: true },
    { group_code: 4, group_name: this.danh_sach_con[0], isGroup: true },
    { group_code: 4, group_name: this.danh_sach_con[1], isGroup: true },
  ]
  gr5: GroupProduct[] = [
    { group_code: 5, group_name: this.danh_sach[4].value, isGroup: true },
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
  dulieuI: (BorderTrade | GroupProduct)[] = [];
  dulieuII: (BorderTrade | GroupProduct)[] = [];
  dulieuIII: (BorderTrade | GroupProduct)[] = [];
  dulieuIV: (BorderTrade | GroupProduct)[] = [];
  dulieuV: (BorderTrade | GroupProduct)[] = [];
  filteredDataSource: (BorderTrade | GroupProduct)[] = [];
  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  isChecked: boolean;
  pagesize: number = 0;
  curentmonth: number = new Date().getMonth() + 1;
  @ViewChild("table", { static: false }) table: ElementRef;
  @ViewChild(MatAccordion, { static: true }) accordion: MatAccordion;
  @ViewChild("paginator", { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  groupI: GroupProduct;
  groupII: GroupProduct;
  groupIII: GroupProduct;
  groupIV: GroupProduct;
  groupV: GroupProduct;
  Id_Array: number[] = [];
  ds_san_pham_chu_luc: any[] = [
    { id: 1, ten_sp: 'Hạt điều' }
  ]
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

  TongKimNgachxk: number = 0;
  TongKimNgachnk: number = 0;
  //Private Variable for TS
  private _linkOutput: LinkModel = new LinkModel();
  constructor(
    private sctService: SCTService,
    private matDialog: MatDialog,
    private marketService: MarketService,
    private _breadCrumService: BreadCrumService
  ) { }

  ngOnInit() {
    // this.autoOpen();
    this.createGroup();
    console.log(this.groupI)
    this.getThuongMaiBG(this.curentmonth);
    this.autoOpen();
    this.sendLinkToNext(true);
    console.log("Border Trade:",this._linkOutput.title);
  }

  public sendLinkToNext(type: boolean) {
    this._linkOutput.link = this.LINK_DEFAULT;
    this._linkOutput.title = this.TITLE_DEFAULT;
    this._linkOutput.text = this.TEXT_DEFAULT;
    this._linkOutput.type = type;
    this._breadCrumService.sendLink(this._linkOutput);
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
    gr.group_name = this.danh_sach[code - 1].value;
    gr.isGroup = true;
  }

  autoOpen() {
    setTimeout(() => this.accordion.openAll(), 1000);
  }

  // getTotalCost() {
  //   return this.dataSource.data.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  // }

  selectGate(id_gate) {
    this.id_cua_khau = id_gate;
    this.getThuongMaiBG(this.curentmonth)
    let tem_cua_khau = this.danh_sach_cua_khau.find(item => item.id_cua_khau === id_gate);
    this.cua_khau = tem_cua_khau.ten_cua_khau;
    this.Id_Array = [];
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

  selectMonth(month) {
    this.curentmonth = month;
    this.getThuongMaiBG(this.curentmonth);
    this.Id_Array = [];

  }

  getThuongMaiBG(thang) {
    let tem = new Date().getFullYear() * 100 + thang;
    this.sctService.GetDanhSachXuatNhapKhauBG(tem, this.id_cua_khau).subscribe((result) => {
      this.getNhomI(result);
      this.getNhomII(result);
      this.getNhomIII(result);
      this.getNhomIV(result);
      this.getNhomV(result);
      this.dataSourceI = [...result.data[0], ...result.data[1], ...result.data[2], ...result.data[3], ...result.data[4], ...result.data[5], ...result.data[6], ...result.data[7], ...result.data[8], ...result.data[9]]
      console.log(this.dataSourceI)
      this.TongKimNgachxk = this.TongKimNgachThangNhomIxk + this.TongKimNgachThangNhomIIxk + this.TongKimNgachThangNhomIIIxk + this.TongKimNgachThangNhomIVxk + this.TongKimNgachThangNhomVxk;
      this.TongKimNgachnk = this.TongKimNgachThangNhomInk + this.TongKimNgachThangNhomIInk + this.TongKimNgachThangNhomIIInk + this.TongKimNgachThangNhomIVnk + this.TongKimNgachThangNhomVnk;
      console.log('tong xk', this.TongKimNgachxk)
    });
  }

  getNhomI(result) {
    this.sapxepXK(result.data[0], this.gr1, 1);
    this.sapxepNK(result.data[1], this.gr1, 1);
    this.dulieuI = [...result.data[0], ...result.data[1]]
  }
  getNhomII(result) {
    this.sapxepXK(result.data[2], this.gr2, 1);
    this.sapxepNK(result.data[3], this.gr2, 1);
    this.dulieuII = [...result.data[2], ...result.data[3]]
  }
  getNhomIII(result) {
    this.sapxepXK(result.data[4], this.gr3, 2);
    this.sapxepNK(result.data[5], this.gr3, 2);
    this.dulieuIII = [...result.data[4], ...result.data[5]]
  }
  getNhomIV(result) {
    this.sapxepXK(result.data[6], this.gr4, 3);
    this.sapxepNK(result.data[7], this.gr4, 3);
    this.dulieuIV = [...result.data[6], ...result.data[7]]
  }
  getNhomV(result) {
    this.sapxepXK(result.data[8], this.gr5, 4);
    this.sapxepNK(result.data[9], this.gr5, 4);
    this.dulieuV = [...result.data[8], ...result.data[9]]
  }

  sapxepXK(resultDataXK, gr, ind) {
    let dataGroupIxk = this.xulysolieu(resultDataXK);
    resultDataXK.splice(0, 0, gr[0]);
    resultDataXK.splice(1, 0, gr[1]);
    // console.log(resultDataXK)
    resultDataXK.push(dataGroupIxk);
    switch (ind) {
      case 1:
        this.TongKimNgachThangNhomIxk += dataGroupIxk.kim_ngach
        break;
      case 2:
        this.TongKimNgachThangNhomIIxk += dataGroupIxk.kim_ngach
        break;
      case 3:
        this.TongKimNgachThangNhomIIIxk += dataGroupIxk.kim_ngach
        break;
      case 4:
        this.TongKimNgachThangNhomIVxk += dataGroupIxk.kim_ngach
        break;
      case 5:
        this.TongKimNgachThangNhomVxk += dataGroupIxk.kim_ngach
        break;
      default:
        break;
    }
    // this.TongKimNgachThangNhomIxk = dataGroupIxk.kim_ngach;
    // console.log(resultDataXK)

  }
  sapxepNK(resulDatatNK, gr, ind) {
    let dataGroupIxk = this.xulysolieu(resulDatatNK);
    resulDatatNK.push(dataGroupIxk);
    resulDatatNK.splice(0, 0, gr[2]);
    switch (ind) {
      case 1:
        this.TongKimNgachThangNhomInk += dataGroupIxk.kim_ngach
        break;
      case 2:
        this.TongKimNgachThangNhomIInk += dataGroupIxk.kim_ngach
        break;
      case 3:
        this.TongKimNgachThangNhomIIInk += dataGroupIxk.kim_ngach
        break;
      case 4:
        this.TongKimNgachThangNhomIVnk += dataGroupIxk.kim_ngach
        break;
      case 5:
        this.TongKimNgachThangNhomVnk += dataGroupIxk.kim_ngach
        break;
      default:
        break;
    }
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

  getYears() {
    return Array(5)
      .fill(1)
      .map((element, index) => new Date().getFullYear() - index);
  }

  applyGroupFilter(id_array) {
    console.log(id_array, this.Id_Array)
    this.dataSourceI = [];
    for (const iterator of id_array) {
      switch (iterator) {
        case 1:
          this.dataSourceI = this.dataSourceI.concat(this.dulieuI);
          break;
        case 2:
          this.dataSourceI = this.dataSourceI.concat(this.dulieuII);
          break;
        case 3:
          this.dataSourceI = this.dataSourceI.concat(this.dulieuIII);
          break;
        case 4:
          this.dataSourceI = this.dataSourceI.concat(this.dulieuIV);
          break;
        case 5:
          this.dataSourceI = this.dataSourceI.concat(this.dulieuV);
          break;
        default:
          break;
      }
    }
  }
}
