//Import Library
import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import * as XLSX from 'xlsx';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, isEmpty } from 'rxjs/operators';
import { MatTableFilter } from 'mat-table-filter';
//Import Component

//Import Model
import { HeaderMerge, ReportAttribute, ReportDatarow, ReportIndicator, ReportOject, ReportTable, ToltalHeaderMerge } from '../../../../../_models/APIModel/report.model';
//Import Service
import { ControlService } from '../../../../../_services/APIService/control.service';
import { ReportDirective } from 'src/app/shared/report.directive';
import { KeyboardService } from 'src/app/shared/services/keyboard.service';
import { InformationService } from 'src/app/shared/information/information.service';
import { ReportService } from 'src/app/_services/APIService/report.service';
import * as moment from 'moment';
import { CompanyDetailModel } from 'src/app/_models/APIModel/domestic-market.model';
import { TreeviewConfig, TreeviewItem, TreeviewModule } from 'ngx-treeview';
import { element } from 'protractor';
import { MarketCommonModel, SuperMarketCommonModel } from 'src/app/_models/APIModel/commecial-management.model';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { District } from 'src/app/_models/district.model';

interface HashTableNumber<T> {
  [key: string]: T;
}

@Component({
  selector: 'app-supermarket-commecial',
  templateUrl: './supermarket-commecial.component.html',
  styleUrls: ['../../../special_layout.scss'],
})

export class SuperMarketCommecialManagementComponent implements OnInit {
  //Constant-------------------------------------------------------------------------
  public readonly RANK_LABLE = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) { return `0 của ${length}`; }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} của ${length}`;
  }
  //
  private _conditionArray: HashTableNumber<string[]> = {};
  private _tableData: MatTableDataSource<SuperMarketCommonModel> = new MatTableDataSource<SuperMarketCommonModel>();
  
  public sieuThiTongHop: number;
  public sieuThiChuyenNganh: number;
  //
  public sieuThiHangI: number;
  public sieuThiHangII: number;
  public sieuThiHangIII: number;
  //
  public sieuThiDauTuTrongNam:number;
  public sieuThiNgungHoatDong: number;
  
  //Viewchild & Input-----------------------------------------------------------------------
  @ViewChildren(ReportDirective) inputs: QueryList<ReportDirective>
  @ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('TABLE', { static: false }) table: ElementRef;

  exportExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'HTTM - Siêu thị');

    XLSX.writeFile(wb, 'HTTM - Siêu thị.xlsx');

  }
  //Variable for HTML&TS-------------------------------------------------------------------------
  public readonly districts: District[] = [{ id: 1, ten_quan_huyen: 'Phước Long' },
  { id: 2, ten_quan_huyen: 'Đồng Xoài' },
  { id: 3, ten_quan_huyen: 'Bình Long' },
  { id: 4, ten_quan_huyen: 'Bù Gia Mập' },
  { id: 5, ten_quan_huyen: 'Lộc Ninh' },
  { id: 6, ten_quan_huyen: 'Bù Đốp' },
  { id: 7, ten_quan_huyen: 'Hớn Quản' },
  { id: 8, ten_quan_huyen: 'Đồng Phú' },
  { id: 9, ten_quan_huyen: 'Bù Đăng' },
  { id: 10, ten_quan_huyen: 'Chơn Thành' },
  { id: 11, ten_quan_huyen: 'Phú Riềng' }];
  public readonly phanloais: District[] =[{id: 1, ten_quan_huyen: "Loại I"}
,{id: 1, ten_quan_huyen: "Loại II"}
,{id: 1, ten_quan_huyen: "Loại III"}]

  headerArray = ['index', 'tenhuyenthi', 'ten_tttm', 'dientich', 'vondautu', 'namdautuxaydung', 'phanloai'];
  dataHuyenThi: Array<SuperMarketCommonModel> = [
    { huyen: "Đồng Xoài", ten_tttm: "Siêu thị Co.opMart Đồng Xoài", dientich: 3107, namdautuxaydung: "2009", phanloai: "II", vondautu: 0 },
    { huyen: "Đồng Xoài", ten_tttm: "Siêu thị điện máy nội thất Chợ Lớn, chi nhánh Bình Phước", dientich: 4000, namdautuxaydung: "2017", phanloai: "III", vondautu: 0 },
    { huyen: "Đồng Xoài", ten_tttm: "Siêu thị The Gold Mart ", dientich: 4500, namdautuxaydung: "2019", phanloai: "II", vondautu: 0 },
    { huyen: "Đồng Xoài", ten_tttm: "Siêu thị điện máy Nguyễn Kim", dientich: 400, namdautuxaydung: "2014", phanloai: "III", vondautu: 0 },
    { huyen: "Đồng Xoài", ten_tttm: "Siêu thị điện máy xanh Bình Phước", dientich: 3400, namdautuxaydung: "2016", phanloai: "III", vondautu: 0 },
    { huyen: "Bình Long", ten_tttm: "Siêu thị Bé Lan", dientich: 1000, namdautuxaydung: "2017", phanloai: "III", vondautu: 0 },
    { huyen: "Phước Long", ten_tttm: "Siêu thị Phương Lan", dientich: 800, namdautuxaydung: "2014", phanloai: "III", vondautu: 0 },
    { huyen: "Đồng Phú", ten_tttm: "Siêu thị Co.opMart Đồng Phú", dientich: 3000, namdautuxaydung: "2019", phanloai: "II", vondautu: 0 },
    { huyen: "Bù Đăng", ten_tttm: "Dự  án Siêu thị Co.opMart Bù Đăng", dientich: 0, namdautuxaydung: "", phanloai: "", vondautu: 0 },
    { huyen: "Bù Đăng", ten_tttm: "Dự án Siêu Thị Boobo và chợ đêm", dientich: 0, namdautuxaydung: "", phanloai: "", vondautu: 0 },
  ]
  //Variable for only TS-------------------------------------------------------------------------

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // this.accordion.openAll();
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Số hàng';
    this.paginator._intl.firstPageLabel = "Trang Đầu";
    this.paginator._intl.lastPageLabel = "Trang Cuối";
    this.paginator._intl.previousPageLabel = "Trang Trước";
    this.paginator._intl.nextPageLabel = "Trang Tiếp";
  }

  autoOpen() {
    setTimeout(() => this.accordion.openAll(), 1000);
  }

  items: TreeviewItem[] = [];
  values: number[] = [];
  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400
  });

  public tableMergeHader: Array<ToltalHeaderMerge> = [];
  public mergeHeadersColumn: Array<string> = [];
  public indexOftableMergeHader: number = 0;
  public dataSource: MatTableDataSource<SuperMarketCommonModel> = new MatTableDataSource<SuperMarketCommonModel>();
  columns: number = 1;

  //Angular FUnction --------------------------------------------------------------------
  constructor(
    public reportSevice: ReportService,
    public route: ActivatedRoute,
    public keyboardservice: KeyboardService,
    public info: InformationService
  ) { }

  ngOnInit(): void {
    let data: any = JSON.parse(localStorage.getItem('currentUser'));
    this.dataSource = new  MatTableDataSource<SuperMarketCommonModel>(this.dataHuyenThi);
    this._tableData = new MatTableDataSource<SuperMarketCommonModel>(this.dataHuyenThi);
    this.autoOpen();
  }
  

  //Xuất excel
  ExportTOExcel(filename: string, sheetname: string) {
    sheetname = sheetname.replace('/', '_');
    let excelFileName: string = filename + '.xlsx';
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetname);
    /* save to file */
    XLSX.writeFile(wb, excelFileName);
  }
  //FUNCTION FOR ONLY TS _------------------------------
  applyCondictionFilter(type, event: any) {
    this._conditionArray[type] = event.value;
    this._filterDataSource();
  }
  private _filterDataSource() {
    if (this._countCondition() > 0) {
      let dataFilterOriginal: SuperMarketCommonModel[] = [];
      let dataFilterFinal: SuperMarketCommonModel[] = [];
      dataFilterOriginal = [... this._tableData.data];
      Object.keys(this._conditionArray).forEach(key => {
        let array = this._conditionArray[key];
        switch (key) {
          case "1":
            array.forEach((element) => {
              dataFilterOriginal.filter((x) => x.huyen.includes(element)).forEach((item) => dataFilterFinal.push(item));
            });
            break;
          case "2":
            array.forEach((element) => {

              dataFilterOriginal.filter((x) => element.includes(x.phanloai)).forEach((item) => dataFilterFinal.push(item));
            });
            break;
    
          default:

            break;
        }
        dataFilterOriginal = [...dataFilterFinal];
        dataFilterFinal = [];
      });
      this.dataSource = new MatTableDataSource<SuperMarketCommonModel>(dataFilterOriginal);
    } else {
      this.dataSource = new MatTableDataSource<SuperMarketCommonModel>(this._tableData.data);
    }
    this._paginatorAgain();
    this._caculator(this.dataSource.data);
  }
  private _countCondition(): number {
    let countOfCondition = 0;
    Object.keys(this._conditionArray).forEach(key => {
      if (this._conditionArray[key])
        countOfCondition += this._conditionArray[key].length;
    });
    return countOfCondition;
  }
  private _autoOpenPanel() {
    setTimeout(() => this.accordion.openAll(), 1000);
  }
  private _caculator(data: Array<SuperMarketCommonModel>) {
      
  }
  private _paginatorAgain() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Số hàng';
    this.paginator._intl.firstPageLabel = "Trang Đầu";
    this.paginator._intl.lastPageLabel = "Trang Cuối";
    this.paginator._intl.previousPageLabel = "Trang Trước";
    this.paginator._intl.nextPageLabel = "Trang Tiếp";
    this.paginator._intl.getRangeLabel = this.RANK_LABLE;
  }
}
