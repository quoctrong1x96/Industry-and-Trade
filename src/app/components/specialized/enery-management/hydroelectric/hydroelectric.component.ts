import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion, MatPaginator, MatTable, MatTableDataSource } from '@angular/material';
import { DistrictModel } from 'src/app/_models/APIModel/domestic-market.model';
import { HydroElectricManagementModel } from 'src/app/_models/APIModel/electric-management.module';

@Component({
  selector: 'app-hydroelectric',
  templateUrl: './hydroelectric.component.html',
  styleUrls: ['./hydroelectric.component.scss']
})
export class HydroelectricComponent implements OnInit {
  //ViewChild 
  @ViewChild(MatAccordion, { static: true }) accordion: MatAccordion;
  @ViewChild('table', { static: false }) table: MatTable<HydroElectricManagementModel>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  //Constant variable
  public readonly displayedColumns: string[] = ['index', 'mst', 'ten_doanh_nghiep', 'ten_phuong_xa', 'ten_huyen_thi', 'cong_xuat_thiet_ke', 'luong_nuoc_xa', 'dung_tich_ho', 'san_luong_6_thang', 'san_luong_nam', 'doanh_thu', 'trang_thai'];
  //TS & HTML Variable
  public dataSource: MatTableDataSource<HydroElectricManagementModel> = new MatTableDataSource<HydroElectricManagementModel>();
  public filteredDataSource: MatTableDataSource<HydroElectricManagementModel> = new MatTableDataSource<HydroElectricManagementModel>();
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
  public data: Array<HydroElectricManagementModel> = [{ trang_thai: "Đang hoạt động", mst: '111', ten_doanh_nghiep: 'Thủy điện Thác Mơ', ten_phuong_xa: 'Phường Thác Mơ', ten_huyen_thi: 'Thị xã Phước Long', ma_huyen_thi: 1, cong_xuat_thiet_ke: 150, luong_nuoc_xa: 65, dung_tich_ho: 1360, san_luong_6_thang: 313.7, san_luong_nam: 627.4, doanh_thu: 442.68 },
  { trang_thai: "Đang hoạt động", mst: '222', ten_doanh_nghiep: 'Thủy điện Thác Mơ', ten_phuong_xa: 'Thị trấn Thanh Bình', ten_huyen_thi: 'Huyện Bù Đốp', ma_huyen_thi: 6, cong_xuat_thiet_ke: 72, luong_nuoc_xa: 60, dung_tich_ho: 165.49, san_luong_6_thang: 155.094, san_luong_nam: 310.189, doanh_thu: 348.00 },
  { trang_thai: "Đang hoạt động", mst: '333', ten_doanh_nghiep: 'Thủy điện Srok Phu Mieng', ten_phuong_xa: 'Xã Long Bình', ten_huyen_thi: 'Huyện Phú riềng', ma_huyen_thi: 11, cong_xuat_thiet_ke: 51, luong_nuoc_xa: 65, dung_tich_ho: 99.3, san_luong_6_thang: 95, san_luong_nam: 199.5, doanh_thu: 229.68 },]
  //Only TS Variable
  years: number[] = [];
  doanhThu: number;
  congXuat: number;
  sanluongnam: number;
  soLuongDoanhNghiep: number;
  isChecked: boolean;

  constructor() {
  }

  ngOnInit() {
    this.years = this.getYears();
  }
  ngAfterViewInit(): void {
    this.accordion.openAll();

    this.dataSource.data = this.data;
    console.log(this.dataSource);
    this.filteredDataSource.data = [...this.dataSource.data];
    this.caculatorValue();
    this.paginatorAgain();
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