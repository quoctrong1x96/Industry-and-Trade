import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion, MatPaginator, MatTable, MatTableDataSource } from '@angular/material';
import { DistrictModel } from 'src/app/_models/APIModel/domestic-market.model';
import { ElectricityDevelopmentModel, HydroElectricManagementModel, PowerProductionModel } from 'src/app/_models/APIModel/electric-management.module';

@Component({
  selector: 'app-power-production',
  templateUrl: './power-production.component.html',
  styleUrls: ['./power-production.component.scss']
})
export class PowerProductionManagementComponent implements OnInit {
  //ViewChild 
  @ViewChild(MatAccordion, { static: true }) accordion: MatAccordion;
  @ViewChild('table', { static: false }) table: MatTable<PowerProductionModel>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  //Constant variable
  private readonly displayedColumns: string[] = ['index', 'chi_tieu', 'san_luong_nam_truoc', 'san_luong_nam_thuc_hien', 'so_sanh_cung_ky'];
  //TS & HTML Variable
  private dataSource: MatTableDataSource<PowerProductionModel> = new MatTableDataSource<PowerProductionModel>();
  private filteredDataSource: MatTableDataSource<PowerProductionModel> = new MatTableDataSource<PowerProductionModel>();
  private data: Array<PowerProductionModel> = [{ chi_tieu: "Điện phục vụ sản xuất",san_luong_nam_truoc: 1235, san_luong_nam_thuc_hien: 1398 , so_sanh_cung_ky: 113.20},
  { chi_tieu: "Điện sinh hoạt + Kinh doanh dịch vụ",san_luong_nam_truoc: 736, san_luong_nam_thuc_hien: 817 , so_sanh_cung_ky: 110.96},
  { chi_tieu: "Nhu cầu khác (chiếu sáng công cộng)",san_luong_nam_truoc: 249, san_luong_nam_thuc_hien: 256 , so_sanh_cung_ky: 102.92},  ]
  //Only TS Variable
  years: number[] = [];
  year:number =0;
  trung_ap_3p: number;
  tongSoXa: number;
  trung_ap_1p: number;
  ha_ap_1p: number;
  ha_ap_3p: number;
  so_tram_bien_ap: number;
  cong_xuat_bien_ap: number;
  isChecked: boolean;

  constructor() {
  }

  ngOnInit() {
    this.years = this.getYears();
  }
  ngAfterViewInit(): void {
    this.accordion.openAll();
    this.year = this.getCurrentSelectedYear()
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
  getCurrentSelectedYear(){
    return 2020;
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
    this.year = value;

  }
  applyDistrictFilter(event) {
   
  }
  paginatorAgain() {
    if (this.filteredDataSource.data.length) {
      this.filteredDataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Số công ty mỗi trang';
      this.paginator._intl.lastPageLabel = "Đến cuối";
      this.paginator._intl.nextPageLabel = "Trang tiếp";
      this.paginator._intl.previousPageLabel = "Trang trước";
    }
  }
  caculatorValue() {
    
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