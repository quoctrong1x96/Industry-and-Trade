import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable, MatAccordion, MatPaginator, MatSort } from '@angular/material';
import { ex_im_model } from 'src/app/_models/APIModel/export-import.model';
import { District } from 'src/app/_models/district.model';
import { SCTService } from 'src/app/_services/APIService/sct.service';
import { ModalComponent } from '../dialog-import-export/modal.component';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import {MarketService} from '../../../../../_services/APIService/market.service'
@Component({
  selector: 'app-import-management',
  templateUrl: './import-management.component.html',
  styleUrls: ['./import-management.component.scss']
})
export class ImportManagementComponent implements OnInit, AfterViewInit  {

  // displayedSumColumns: any[] = ['tong', 'tong_luong_thang', 'tong_gia_tri_thang', 'tong_luong_cong_don', 'tong_gia_tri_cong_don']
  displayedColumns: string[] = ['index', 'ten_san_pham', 'luong_thang', 'gia_tri_thang', 'luong_cong_don', 'gia_tri_cong_don', 'luong_thang_tc', 'gia_tri_thang_tc', 'danh_sach_doanh_nghiep'];
    dataSource: MatTableDataSource<ex_im_model> = new MatTableDataSource<ex_im_model>();
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
    TongLuongThangThucHien: number = 0;
    TongGiaTriThangThucHien: number = 0;
    TongLuongCongDon: number = 0;
    TongGiaTriCongDon: number = 0;
    isChecked: boolean;
    pagesize: number = 0;
    curentmonth: number = new Date().getMonth() + 1;
    @ViewChild('table', { static: false }) table: MatTable<ex_im_model>;
    @ViewChild(MatAccordion, { static: true }) accordion: MatAccordion;
    @ViewChild('paginator', { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    nhap_khau_chu_yeu = [1, 61, 98, 28, 4, 20, 33, 34, 31, 51]
    constructor(
      public sctService: SCTService,
      public matDialog: MatDialog,
      public marketService: MarketService
      ) {
    }

    initVariable(){
      this.TongLuongThangThucHien = 0;
      this.TongGiaTriThangThucHien = 0;
      this.TongLuongCongDon = 0;
      this.TongGiaTriCongDon = 0;
    }

    kiem_tra(id_mat_hang){
      if(this.nhap_khau_chu_yeu.includes(id_mat_hang))
        return true
      return false;
    }

    ngOnInit() {
        // this.years = this.getYears();
        this.getDanhSachNhapKhau(this.curentmonth);
        this.autoOpen();
        // this.filteredDataSource.filterPredicate = function (data: ex_im_model, filter): boolean {
        //     return String(data.is_het_han).includes(filter);
        // };
        
    }

    autoOpen(){
      setTimeout(() => this.accordion.openAll(), 1000)
    }

    // getTotalCost() {
    //   return this.dataSource.data.map(t => t.cost).reduce((acc, value) => acc + value, 0);
    // }

    getDanhSachNhapKhau(thang){
      this.isChecked = false;
      let tem = new Date().getFullYear()*100 + thang;
      if(thang !== this.curentmonth && thang){
        this.curentmonth = thang;
      }
        this.sctService.GetDanhSachNhapKhau(tem).subscribe(result => {
          this.dataSource = new MatTableDataSource<ex_im_model>(result.data[1]);
          this.log(this.dataSource)
          this.dataDialog = result.data[0];
          this.pagesize = this.dataSource.data.length/25
          this.tinh_tong(this.dataSource.data);
          this.filteredDataSource.data = [...this.dataSource.data];
          this.filteredDataSource.paginator = this.paginator;
          // this.paginator._intl.itemsPerPageLabel = 'Số hàng';
          // this.paginator._intl.firstPageLabel = "Trang Đầu";
          // this.paginator._intl.lastPageLabel = "Trang Cuối";
          // this.paginator._intl.previousPageLabel = "Trang Trước";
          // this.paginator._intl.nextPageLabel = "Trang Tiếp";
          this.dataSource.paginator = this.paginator;
      });
    }

    tinh_tong(data){
      this.initVariable();
      for (let item of data) {
        // console.log(item)
        this.TongLuongThangThucHien += item['luong_thang'];
        this.TongGiaTriThangThucHien += item['gia_tri_thang'];
        this.TongLuongCongDon += item['luong_cong_don'];
        this.TongGiaTriCongDon += item['gia_tri_cong_don'];
      }
    }

    ngAfterViewInit(): void {
      //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
      //Add 'implements AfterViewInit' to the class.
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }


    log(any) {
        console.log(any);
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    getYears() {
        return Array(5).fill(1).map((element, index) => new Date().getFullYear() - index);
    }

    applyDistrictFilter(event) {
    }

    // isHidden(row : any){
    //     return (this.isChecked)? (row.is_het_han) : false;
    // }

    applyExpireCheck(event) {
        console.log(event);
        let tem_data = [...this.dataSource.data]
        event.checked ? this.dataSource.data = tem_data.filter(item => this.nhap_khau_chu_yeu.includes(item.id_mat_hang)) : this.dataSource.data = this.filteredDataSource.data;
        this.tinh_tong(this.dataSource.data)
    }

  openDialog(id_mat_hang) {
    if(this.kiem_tra(id_mat_hang)){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        data: this.handelDataDialog(id_mat_hang),
        id: 1
      }
      console.log(this.handelDataDialog(id_mat_hang))
      // dialogConfig.panelClass = ['overflow-y: scroll;']
      this.matDialog.open(ModalComponent, dialogConfig);
    }
  }

  handelDataDialog(id_mat_hang){
    let data = this.dataDialog.filter(item => item.id_mat_hang === id_mat_hang);
    return data;
  }

  openDanh_sach_doanh_nghiep(id_mat_hang, ten_san_pham){
    this.marketService.GetTopImport(this.curentmonth, new Date().getFullYear(), id_mat_hang).subscribe(data => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        data: data['data'],
        id: 2, 
        ten_san_pham: ten_san_pham,
        thang: this.curentmonth
      }
      this.matDialog.open(ModalComponent, dialogConfig);
      })
  }
}
