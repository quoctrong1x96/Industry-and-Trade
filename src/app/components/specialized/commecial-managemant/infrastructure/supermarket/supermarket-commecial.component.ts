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
  styleUrls: ['./supermarket-commecial.component.scss']
})

export class SuperMarketCommecialManagementComponent implements OnInit {
  //Constant-------------------------------------------------------------------------

  //Viewchild & Input-----------------------------------------------------------------------
  @ViewChildren(ReportDirective) inputs: QueryList<ReportDirective>
  @ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
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
    this.dataSourceHuyenThi.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // this.accordion.openAll();
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
  dataSourceHuyenThi: MatTableDataSource<SuperMarketCommonModel> = new MatTableDataSource<SuperMarketCommonModel>();

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
