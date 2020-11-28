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
import { MarketCommonModel, SuperMarketCommonModel, SuperMarketFilterModel } from 'src/app/_models/APIModel/commecial-management.model';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { District } from 'src/app/_models/district.model';

interface HashTableNumber<T> {
  [key: string]: T;
}

@Component({
  selector: 'app-shoppingcentre',
  templateUrl: './shoppingcentre.component.html',
  styleUrls: ['../../../special_layout.scss'],
})
export class ShoppingcentreComponent implements OnInit {
  //Constant-------------------------------------------------------------------------

  //Viewchild & Input-----------------------------------------------------------------------
  @ViewChildren(ReportDirective) inputs: QueryList<ReportDirective>
  @ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('TABLE', { static: false }) table: ElementRef;

  exportExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'HTTM - TTTM');

    XLSX.writeFile(wb, 'HTTM - TTTM.xlsx');

  }
  //Variable for HTML&TS-------------------------------------------------------------------------
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
  headerArray = ['index', 'tenhuyenthi', 'ten_tttm', 'dientich', 'vondautu', 'namdautuxaydung', 'phanloai'];
  dataHuyenThi: Array<SuperMarketCommonModel> = [
    { huyen: "Đồng Xoài", ten_tttm: "Trung tâm thương mại ITC Đồng Xoài", dientich: 9000, namdautuxaydung: "", phanloai: "III", id_quan_huyen : 2, vondautu: 150 },
    { huyen: "Đồng Xoài", ten_tttm: "Vincom Đồng Xoài", dientich: 33000, namdautuxaydung: "", phanloai: "", id_quan_huyen : 2, vondautu: 240 },
    { huyen: "Bình Long", ten_tttm: "Trung tâm thương mại An Lộc - Bình Long", dientich: 26000, namdautuxaydung: "", phanloai: "III", id_quan_huyen : 3, vondautu: 200 },
    { huyen: "Phước Long", ten_tttm: "Trung tâm thương mại Phước Binh", dientich: 10000, namdautuxaydung: "", phanloai: "III", id_quan_huyen : 1, vondautu: 50 },
    { huyen: "Phước Long", ten_tttm: "Trung tâm thương mại Sơn Thành - Phước Long", dientich: 12000, namdautuxaydung: "", phanloai: "Đang xây dựng", id_quan_huyen : 1, vondautu: 300 },
    { huyen: "Phước Long", ten_tttm: "Vincom Phước Long", dientich: 15000, namdautuxaydung: "", phanloai: "", id_quan_huyen : 1, vondautu: 190 },
    { huyen: "Bù Đốp", ten_tttm: "Trung tâm thương mại Thanh Bình - Bù Đốp", dientich: 61000, namdautuxaydung: "", phanloai: "III", id_quan_huyen : 6, vondautu: 100 },
    { huyen: "Chơn Thành", ten_tttm: "TTTM Đô Thành - Chơn Thành", dientich: 10000, namdautuxaydung: "", phanloai: "Đang xây dựng", id_quan_huyen : 10, vondautu: 300 },
    { huyen: "Chơn Thành", ten_tttm: "Vincom Chơn Thành", dientich: 31000, namdautuxaydung: "", phanloai: "III", id_quan_huyen : 10, vondautu: 220 },
  ]
  //Variable for only TS-------------------------------------------------------------------------

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceHuyenThi.filter = filterValue.trim().toLowerCase();
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

  columns: number = 1;
  //
  public tongTTTM: number;
  //
  public tttmHangI : number;
  public tttmHangII : number;
  public tttmHangIII : number;
  //
  public tttmDangXayDung : number;
  public tttmDauTuTrongNam : number;
  public tttmDauTuNamTruoc : number;
  
  year : number;
 

  public filterModel : SuperMarketFilterModel = new SuperMarketFilterModel();

  //Angular FUnction --------------------------------------------------------------------
  constructor(
    public reportSevice: ReportService,
    public route: ActivatedRoute,
    public keyboardservice: KeyboardService,
    public info: InformationService
  ) { }

  ngOnInit(): void {
    let data: any = JSON.parse(localStorage.getItem('currentUser'));
    this.dataSourceHuyenThi.data = this.dataHuyenThi;
    this.filteredDataSource.data = [...this.dataSourceHuyenThi.data];
    this._caculator(this.dataSourceHuyenThi.data);
    this.autoOpen()
  }

  autoOpen() {
    setTimeout(() => this.accordion.openAll(), 1000);
  }

  ngAfterViewInit(): void {
    this.dataSourceHuyenThi.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Số hàng';
    this.paginator._intl.firstPageLabel = "Trang Đầu";
    this.paginator._intl.lastPageLabel = "Trang Cuối";
    this.paginator._intl.previousPageLabel = "Trang Trước";
    this.paginator._intl.nextPageLabel = "Trang Tiếp";
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // this.accordion.openAll();
  }
  dataSourceHuyenThi: MatTableDataSource<SuperMarketCommonModel> = new MatTableDataSource<SuperMarketCommonModel>();
  filteredDataSource : MatTableDataSource<SuperMarketCommonModel> = new MatTableDataSource<SuperMarketCommonModel>();

  //Xuất excel
  ExportTOExcel(filename: string, sheetname: string) {
    // sheetname = sheetname.replace('/', '_');
    // let excelFileName: string = filename + '.xlsx';
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, sheetname);
    // /* save to file */
    // XLSX.writeFile(wb, excelFileName);
  }

  sortHeaderCondition(event) {

  }

  applyDistrictFilter(event) {

  }

  applyExpireCheck(event) {

  }

  private _caculator(data: SuperMarketCommonModel[]):void{
    this.tongTTTM = data.length;
    this.tttmHangI = data.filter(x => x.phanloai == "I").length;
    this.tttmHangII = data.filter(x => x.phanloai == "II").length;
    this.tttmHangIII = data.filter(x => x.phanloai == "III").length;
    this.tttmDangXayDung = data.length - this.tttmHangI - this.tttmHangII - this.tttmHangIII;
    this.year = new Date().getFullYear();
    
    this.tttmDauTuTrongNam = data.filter( x => x.namdautuxaydung == this.year.toString()).length;
    this.tttmDauTuNamTruoc= data.filter( x => x.namdautuxaydung == (this.year - 1).toString()).length;
  }
  

  public applyFilter():void {
    console.log(this.filterModel)
    let filteredData = this.filterArray(this.dataSourceHuyenThi.data, this.filterModel);
    this._caculator(filteredData);
    if (!filteredData.length) {
      if (this.filterModel)
        this.filteredDataSource.data = [];
      else
        this.filteredDataSource.data = this.dataSourceHuyenThi.data;
    }
    else {
      this.filteredDataSource.data = filteredData;
    }
    
  }

  filterArray(array, filters) {
    const filterKeys = Object.keys(filters);
    let temp = [...array];
    filterKeys.forEach(key => {
      let temp2 = [];
      if (filters[key].length) {
        filters[key].forEach(criteria => {
          temp2 = temp2.concat(temp.filter(x => x[key] == criteria));
        });
        temp = [...temp2];
      }
    })
    return temp;
  }
}