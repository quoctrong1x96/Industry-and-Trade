import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable, MatAccordion, MatPaginator } from '@angular/material';
import { District } from 'src/app/_models/district.model';
import { ConditionalBusinessLineModel } from 'src/app/_models/APIModel/conditional-business-line.model';
import { SCTService } from 'src/app/_services/APIService/sct.service';
import { ex_im_model } from 'src/app/_models/APIModel/export-import.model';
import { ModalService } from '../dialog-import-export/modal.service'

@Component({
  selector: 'app-export-management',
  templateUrl: './export-management.component.html',
  styleUrls: ['./export-management.component.scss']
})
export class ExportManagementComponent implements OnInit {

    displayedColumns: string[] = ['index', 'ten_san_pham', 'luong_thang', 'gia_tri_thang', 'luong_cong_don', 'gia_tri_cong_don'];
    dataSource: MatTableDataSource<ex_im_model> = new MatTableDataSource<ex_im_model>();
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
    sanLuongBanRa: number = 0;
    soLuongdoanhNghiep: number;
    isChecked: boolean;
    curentmonth: number = new Date().getMonth();
    @ViewChild('table', { static: false }) table: MatTable<ex_im_model>;
    @ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private sctService: SCTService, private modalService:ModalService) {
    }

    ngOnInit() {
        // this.years = this.getYears();
        this.getDanhSachNhapKhau(this.curentmonth);

        // this.filteredDataSource.filterPredicate = function (data: ex_im_model, filter): boolean {
        //     return String(data.is_het_han).includes(filter);
        // };
    }

    getDanhSachNhapKhau(thang){
      let tem = new Date().getFullYear()*100 + thang;
        this.sctService.GetDanhSachXuatKhau(202008).subscribe(result => {
          this.dataSource = new MatTableDataSource<ex_im_model>(result.data[1]);
          this.log(this.dataSource.data)
          // this.dataSource.data.forEach(element => {
          //     element.is_het_han = new Date(element.ngay_het_han) < new Date();
          //     result.data[1].forEach(businessman => {
          //         if (businessman.id_kd_co_dk === element.id)
          //             element.danh_sach_thuong_nhan += businessman.ten_thuong_nhan + '\n';
          //     });
          // });

          // this.filteredDataSource.data = [...this.dataSource.data];
          // this.sanLuongBanRa = this.filteredDataSource.data.length ? this.filteredDataSource.data.map(x => x.san_luong).reduce((a, b) => a + b) : 0;
          // this.soLuongdoanhNghiep = this.filteredDataSource.data.length;
          // this.filteredDataSource.paginator = this.paginator;
          this.paginator._intl.itemsPerPageLabel = 'Số hàng';
          this.paginator._intl.firstPageLabel = "Trang Đầu";
          this.paginator._intl.lastPageLabel = "Trang Cuối";
          this.paginator._intl.previousPageLabel = "Trang Trước";
          this.paginator._intl.nextPageLabel = "Trang Tiếp";
      })
    }

    log(any) {
        console.log(any);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.filteredDataSource.filter = filterValue.trim().toLowerCase();
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
        this.filteredDataSource.filter = (event.checked) ? "true" : "";
    }

    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

}
