import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatAccordion, MatPaginator, MatTable, MatTableDataSource } from '@angular/material';
import { DistrictModel } from 'src/app/_models/APIModel/domestic-market.model';
import { HydroElectricManagementModel, SolarEneryManagementModel } from 'src/app/_models/APIModel/electric-management.module';
import { LinkModel } from 'src/app/_models/link.model';
import { BreadCrumService } from 'src/app/_services/injectable-service/breadcrums.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-solar-enery-management',
  templateUrl: './solor-enery-management.component.html',
  styleUrls: ['/../../special_layout.scss'],
})
export class SolarEneryManagementComponent implements OnInit {
  //ViewChild 
  @ViewChild(MatAccordion, { static: true }) accordion: MatAccordion;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('TABLE', { static: false }) table: ElementRef;

  exportExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Điện mặt trời');

    XLSX.writeFile(wb, 'Điện mặt trời.xlsx');

  }
  //Constant variable
  public readonly displayedColumns: string[] = ['index', 'ten_du_an', 'ten_doanh_nghiep', 'ten_huyen_thi', 'cong_xuat_thiet_ke', 'san_luong_6_thang', 'san_luong_nam', 'doanh_thu', 'trang_thai'];
  //TS & HTML Variable
  public dataSource: MatTableDataSource<SolarEneryManagementModel> = new MatTableDataSource<SolarEneryManagementModel>();
  public filteredDataSource: MatTableDataSource<SolarEneryManagementModel> = new MatTableDataSource<SolarEneryManagementModel>();
  public districts: DistrictModel[] = [{ id: 1, ten_quan_huyen: 'Thị xã Phước Long' },
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
  public data: Array<SolarEneryManagementModel> = [{ trang_thai: "Đang hoạt động", mst: '111', ten_doanh_nghiep: 'Công ty Cổ phần thủy điện Thác Mơ', ten_du_an: ' Nhà máy điện mặt trời Thác Mơ', ten_huyen_thi: 'huyện Bù Gia Mập', ma_huyen_thi: 4, cong_xuat_thiet_ke: 50, san_luong_6_thang: 10800, san_luong_nam: 4665600000000, doanh_thu: 9051264 },
  { trang_thai: "Đang hoạt động", mst: '222', ten_doanh_nghiep: 'Nhà máy điện mặt trời Lộc Ninh 1', ten_du_an: 'Nhà máy điện mặt trời Lộc Ninh 1', ten_huyen_thi: 'Xã Lộc Thạnh, huyện Lộc Ninh', ma_huyen_thi: 5, cong_xuat_thiet_ke: 200, san_luong_6_thang: 43200, san_luong_nam: 18662400000000, doanh_thu: 36205056 },
  { trang_thai: "Đang hoạt động", mst: '333', ten_doanh_nghiep: 'Nhà máy điện mặt trời Lộc Ninh 2', ten_du_an: 'Nhà máy điện mặt trời Lộc Ninh 2', ten_huyen_thi: 'Xã Lộc Thạnh, huyện Lộc Ninh', ma_huyen_thi: 5, cong_xuat_thiet_ke: 200, san_luong_6_thang: 43200, san_luong_nam: 18662400000000, doanh_thu: 36205056 },
  { trang_thai: "Đang hoạt động", mst: '444', ten_doanh_nghiep: 'Nhà máy điện mặt trời Lộc Ninh 3', ten_du_an: 'Nhà máy điện mặt trời Lộc Ninh 3', ten_huyen_thi: 'Xã Lộc Thạnh, huyện Lộc Ninh', ma_huyen_thi: 5, cong_xuat_thiet_ke: 150, san_luong_6_thang: 32400, san_luong_nam: 13996800000000, doanh_thu: 27153792 },
  { trang_thai: "Đang hoạt động", mst: '555', ten_doanh_nghiep: 'Nhà máy điện mặt trời Lộc Ninh 4', ten_du_an: 'Nhà máy điện mặt trời Lộc Ninh 4', ten_huyen_thi: 'Xã Lộc Thạnh, huyện Lộc Ninh', ma_huyen_thi: 5, cong_xuat_thiet_ke: 200, san_luong_6_thang: 43200, san_luong_nam: 18662400000000, doanh_thu: 36205056 },
  ]
  //Only TS Variable
  years: number[] = [];
  doanhThu: number;
  congXuat: number;
  sanluongnam: number;
  soLuongDoanhNghiep: number;
  isChecked: boolean;
  private _linkOutput: LinkModel = new LinkModel();
  constructor(private _breadCrumService: BreadCrumService) {
  }

  ngOnInit() {
    this.years = this.getYears();
    this.dataSource.data = this.data;
    this.filteredDataSource.data = [...this.dataSource.data];
    this.caculatorValue();
    this.paginatorAgain();
    this.autoOpen();
  }

  autoOpen() {
    setTimeout(() => this.accordion.openAll(), 1000);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredDataSource.filter = filterValue.trim().toLowerCase();
  }

  get(time_id: number) {

  }

  log(any) {
    console.log(any);
  }

  getYears() {
    return Array(5).fill(1).map((element, index) => new Date().getFullYear() - index);
  }
  getValueOfHydroElectric(value: any) {

  }
  applyDistrictFilter(event) {
    let filteredData = [];

    event.value.forEach(element => {
      this.dataSource.data.filter(x => x.ma_huyen_thi == element).forEach(x => filteredData.push(x));
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
    this.caculatorValue();
    this.paginatorAgain();
  }
  paginatorAgain() {
    if (this.filteredDataSource.data.length) {
      this.filteredDataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Số hàng';
      this.paginator._intl.firstPageLabel = "Trang Đầu";
      this.paginator._intl.lastPageLabel = "Trang Cuối";
      this.paginator._intl.previousPageLabel = "Trang Trước";
      this.paginator._intl.nextPageLabel = "Trang Tiếp";
    }
  }
  caculatorValue() {
    this.doanhThu = this.filteredDataSource.data.length ? this.filteredDataSource.data.map(x => x.doanh_thu).reduce((a, b) => a + b) : 0;
    this.soLuongDoanhNghiep = this.filteredDataSource.data.length;
    this.congXuat = this.filteredDataSource.data.length ? this.filteredDataSource.data.map(x => x.cong_xuat_thiet_ke).reduce((a, b) => a + b) : 0;
    this.sanluongnam = this.filteredDataSource.data.length ? this.filteredDataSource.data.map(x => x.san_luong_nam).reduce((a, b) => a + b) : 0;
  }
  // isHidden(row : any){
  //     return (this.isChecked)? (row.is_het_han) : false;
  // }

  applyActionCheck(event) {
    this.filteredDataSource.filter = (event.checked) ? "true" : "";
    this.caculatorValue();
    this.paginatorAgain();
  }
}