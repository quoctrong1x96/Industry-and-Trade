import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion, MatPaginator, MatTable, MatTableDataSource } from '@angular/material';
import { DistrictModel } from 'src/app/_models/APIModel/domestic-market.model';
import { ElectricityDevelopmentModel, HydroElectricManagementModel, RuralElectricModel } from 'src/app/_models/APIModel/electric-management.module';


@Component({
  selector: 'rural-electric-management',
  templateUrl: './rural-electric-management.component.html',
  styleUrls: ['/../../special_layout.scss'],
})

export class RuralElectricManagementComponent implements OnInit {
  //ViewChild 
  @ViewChild(MatAccordion, { static: true }) accordion: MatAccordion;
  @ViewChild('table', { static: false }) table: MatTable<RuralElectricModel>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  //Constant variable
  public readonly displayedColumns: string[] = ['index', 'dia_ban', 'tong_so_ho', 'ho_co_dien', 'ho_chua_co_dien', 'ty_le', 'tieu_chi_41', 'tieu_chi_42', 'tieu_chi_43'];
  public readonly dsplayMergeColumns: string[] = ['indexM', 'dia_banM', 'so_ho_su_dung_dienM', 'ty_leM', 'tieu_chi_so_4M'];
  //TS & HTML Variable
  public dataSource: MatTableDataSource<RuralElectricModel> = new MatTableDataSource<RuralElectricModel>();
  public filteredDataSource: MatTableDataSource<RuralElectricModel> = new MatTableDataSource<RuralElectricModel>();
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
  public data: Array<RuralElectricModel> = [{ thu_tu: "I", ten_huyen_thi: 'Huyện Đồng Phú', ma_huyen_thi: 8, tong_ho_su_dung_dien: null, tong_ho_co_dien: null, tong_ho_khong_co_dien: null, ty_le: null, tieu_chi_1: null, tieu_chi_2: null, tieu_chi_3: null },
  { thu_tu: "1", ten_huyen_thi: 'Xã Thuận Lợi', ma_huyen_thi: 8, tong_ho_su_dung_dien: 2434, tong_ho_co_dien: 2430, tong_ho_khong_co_dien: 4, ty_le: 99.8, tieu_chi_1: "Đạt", tieu_chi_2: "Đạt", tieu_chi_3: "Đạt" },
  { thu_tu: "2", ten_huyen_thi: 'Xã Đồng Tâm', ma_huyen_thi: 8, tong_ho_su_dung_dien: 2108, tong_ho_co_dien: 2085, tong_ho_khong_co_dien: 423, ty_le: 98.9, tieu_chi_1: "Đạt", tieu_chi_2: "Đạt", tieu_chi_3: "Đạt" },
  { thu_tu: "II", ten_huyen_thi: 'Huyện Chơn Thành', ma_huyen_thi: 10, tong_ho_su_dung_dien: null, tong_ho_co_dien: null, tong_ho_khong_co_dien: null, ty_le: null, tieu_chi_1: null, tieu_chi_2: null, tieu_chi_3: null },
  { thu_tu: "1", ten_huyen_thi: 'Xã Nha Bích', ma_huyen_thi: 10, tong_ho_su_dung_dien: 1674, tong_ho_co_dien: 1670, tong_ho_khong_co_dien: 4, ty_le: 99.8, tieu_chi_1: "Đạt", tieu_chi_2: "Đạt", tieu_chi_3: "Đạt" },
  { thu_tu: "2", ten_huyen_thi: 'Xã Quang Minh', ma_huyen_thi: 10, tong_ho_su_dung_dien: 1249, tong_ho_co_dien: 1214, tong_ho_khong_co_dien: 35, ty_le: 97.2, tieu_chi_1: "Đạt", tieu_chi_2: "Chưa đạt", tieu_chi_3: "Chưa đạt" },
  { thu_tu: "III", ten_huyen_thi: 'Huyện Hớn Quản', ma_huyen_thi: 7, tong_ho_su_dung_dien: null, tong_ho_co_dien: null, tong_ho_khong_co_dien: null, ty_le: null, tieu_chi_1: null, tieu_chi_2: null, tieu_chi_3: null },
  { thu_tu: "1", ten_huyen_thi: 'Xã Tân Lợi', ma_huyen_thi: 7, tong_ho_su_dung_dien: 2579, tong_ho_co_dien: 2558, tong_ho_khong_co_dien: 21, ty_le: 99.2, tieu_chi_1: "Đạt", tieu_chi_2: "Đạt", tieu_chi_3: "Đạt" },
  { thu_tu: "2", ten_huyen_thi: 'Xã Tân Hưng', ma_huyen_thi: 7, tong_ho_su_dung_dien: 3318, tong_ho_co_dien: 3205, tong_ho_khong_co_dien: 113, ty_le: 96.6, tieu_chi_1: "Đạt", tieu_chi_2: "Chưa đạt", tieu_chi_3: "Chưa đạt" },

  ]
  //Only TS Variable
  years: number[] = [];
  tongSoHo: number;
  tongSoXa: number;
  tongHoKhongCoDien: number;
  tongHoCoDien: number;
  isChecked: boolean;

  constructor() {
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
    this.tongSoHo = this.filteredDataSource.data.length ? this.filteredDataSource.data.map(x => x.tong_ho_su_dung_dien).reduce((a, b) => a + b) : 0;
    this.tongSoXa = this.filteredDataSource.data.filter(x => x.tong_ho_su_dung_dien != null).length;
    this.tongHoKhongCoDien = this.filteredDataSource.data.length ? this.filteredDataSource.data.map(x => x.tong_ho_khong_co_dien).reduce((a, b) => a + b) : 0;
    this.tongHoCoDien = this.filteredDataSource.data.length ? this.filteredDataSource.data.map(x => x.tong_ho_co_dien).reduce((a, b) => a + b) : 0;
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