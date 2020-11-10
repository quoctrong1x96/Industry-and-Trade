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
import { FoodCommonModel, MarketCommonModel, StoreCommonModel, SuperMarketCommonModel } from 'src/app/_models/APIModel/commecial-management.model';
import { Data } from 'src/app/components/data-sct/data-sct-type';
import { Time } from 'highcharts';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';

interface HashTableNumber<T> {
  [key: string]: T;
}

@Component({
  selector: 'app-food-commecial',
  templateUrl: './food-commecial.component.html',
  styleUrls: ['./food-commecial.component.scss']
})

export class FoodManagementComponent implements OnInit {
  //Constant-------------------------------------------------------------------------

  //Viewchild & Input-----------------------------------------------------------------------
  @ViewChildren(ReportDirective) inputs: QueryList<ReportDirective>
  @ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceHuyenThi.filter = filterValue.trim().toLowerCase();
  }
  //Variable for HTML&TS-------------------------------------------------------------------------
  displayedColumns = ['index', 'tendoanhnghiep', 'diachi', 'scndkkd', 'ngaycap', 'noicap', 'tennddpl', 'sdtnddpl', 'sanphamkinhdoanh'];
  dataHuyenThi: Array<FoodCommonModel> = [
    { diachi: 'Địa chỉ', ngaycap: new Date(), noicap: 'Bình Phước', sanphamkinhdoanh: "Sản phẩm kinh doanh", scndkkd: "Số 10", sdtnddpl: "0949412112", tendoanhnghiep: "Cửa hàng Phan Trị", tennddpl: "Nguyễn Văn A" },
  ]
  //Variable for only TS-------------------------------------------------------------------------

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

  //Angular FUnction --------------------------------------------------------------------
  constructor(
    private reportSevice: ReportService,
    private route: ActivatedRoute,
    private keyboardservice: KeyboardService,
    private info: InformationService
  ) { }

  ngOnInit(): void {
    let data: any = JSON.parse(localStorage.getItem('currentUser'));
    this.dataSourceHuyenThi.data = this.dataHuyenThi;
    console.log(this.dataSourceHuyenThi.data);
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.accordion.openAll();
}
  dataSourceHuyenThi: MatTableDataSource<FoodCommonModel> = new MatTableDataSource<FoodCommonModel>();

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
}
