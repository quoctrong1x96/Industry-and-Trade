import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import * as XLSX from "xlsx";
import {
  MatTableDataSource,
  MatTable,
  MatAccordion,
  MatPaginator,
  MatDialog,
  MatDialogConfig,
} from "@angular/material";
import { ex_im_model } from "src/app/_models/APIModel/export-import.model";
import { ExcelServicesService } from "src/app/shared/services/excel-services.service";

type AOA = any[][];
@Component({
  selector: "app-import-data",
  templateUrl: "./import-data.component.html",
  styleUrls: ["../../../special_layout.scss"],
})
export class ImportDataComponent implements OnInit {
  displayedColumns = [
    "index",
    "ten_san_pham",
    "luong_thang",
    "gia_tri_thang",
    "uoc_th_so_cungky_tht",
    "uoc_th_so_thg_truoc_tht",

    "luong_cong_don",
    "gia_tri_cong_don",
    "uoc_th_so_cungky_cong_don",
    "uoc_th_so_thg_truoc_cong_don",
    "danh_sach_doanh_nghiep",
    "chi_tiet_doanh_nghiep",
  ];
  displayRow1Header = [
    "index",
    "ten_san_pham",
    "thuc_hien_bao_cao_thang",
    "cong_don_den_ky_bao_cao",

    "danh_sach_doanh_nghiep",
    "chi_tiet_doanh_nghiep",
  ];
  displaRow2Header = [
    "luong_thang",
    "gia_tri_thang",
    "uoc_th_so_cungky_tht",
    "uoc_th_so_thg_truoc_tht",
    "luong_cong_don",
    "gia_tri_cong_don",
    "uoc_th_so_cungky_cong_don",
    "uoc_th_so_thg_truoc_cong_don",
  ];
  data: AOA = [];
  years: number[] = this.getYears();
  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  dataTargets: any[] = [
    { id: 1, unit: "Cục hải quan" },
    { id: 2, unit: "Tổng cục hải quan" },
  ];
  dataTargetId = [2];
  currentmonth: number = new Date().getMonth() + 1;
  currentYear: number = new Date().getFullYear();
  @ViewChild(MatAccordion, { static: true }) accordion: MatAccordion;
  constructor(
    private excelService: ExcelServicesService,
  ) {}
  dataSource: MatTableDataSource<ex_im_model>;
  ngOnInit() {
    this.autoOpen();
  }

  getYears() {
    return Array(5)
        .fill(1)
        .map((element, index) => new Date().getFullYear() - index);
  }

  autoOpen() {
    setTimeout(() => this.accordion.openAll(), 1000);
  }

    onFileChange(e: any) {

    }

    arrayBuffer:any;
    file:File;
    incomingfile(event){
        this.file= event.target.files[0]; 
    }

    handleFile(e) {

        /* wire up file reader */
      const target: any = <any>(e.target);
      if (target.files.length !== 1) {
        throw new Error('Cannot use multiple files');
      }
      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(target.files[0]);
      reader.onload = (e: any) => {
        /* create workbook */
        const binarystr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

        /* selected the first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
        console.log(data); // Data will be logged in array format containing objects
        this.mapData(data);
      };
    }

    mapData(data){
      this.dataSource = new MatTableDataSource<ex_im_model>(data.map(item => {
        let tem = new ex_im_model();
        tem.ten_san_pham = item['Sản phẩm'];
        tem.luong_thang = item['Sản lượng (Nghìn tấn)'];
        tem.gia_tri_thang = item['Trị giá (Triệu USD)'];
        tem.uoc_th_so_cungky_tht = item['ƯTH so với 1 tháng cùng kỳ'];
        tem.uoc_th_so_thg_truoc_tht = item['ƯTH so với tháng trước'];

        tem.luong_cong_don= item['Sản lượng (Nghìn tấn)_1'];
        tem.gia_tri_cong_don = item['Trị giá (Triệu USD)_1'];
        tem.uoc_th_so_cungky_cong_don = item['ƯTH so với 1 tháng cùng kỳ'];
        tem.uth_so_khn = item['ƯTH so với kế hoạch năm'];
        return tem;
      }));
    }

    save(){
      let date_time = this.currentYear*100 + this.currentmonth;
      if(this.dataSource.data.length){
        this.excelService.sharingdata(this.dataSource, date_time);
        alert('Lưu dữ liệu thành công !!');
      }else{
        alert('Chưa có dữ liệu !!');
      }
    }
}
