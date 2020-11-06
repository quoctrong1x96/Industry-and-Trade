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

interface HashTableNumber<T> {
  [key: string]: T;
}

@Component({
  selector: 'app-shoppingcentre',
  templateUrl: './shoppingcentre.component.html',
  styleUrls: ['./shoppingcentre.component.scss']
})
export class ShoppingcentreComponent implements OnInit {
  //Constant-------------------------------------------------------------------------

  //Viewchild & Input-----------------------------------------------------------------------
  @ViewChildren(ReportDirective) inputs: QueryList<ReportDirective>
  @ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  //Variable for HTML&TS-------------------------------------------------------------------------
  headerArray = ['index', 'tenhuyenthi', 'ten_tttm', 'dientich', 'vondautu', 'namdautuxaydung', 'phanloai'];
  dataHuyenThi: Array<SuperMarketCommonModel> = [
    { huyen: "Đồng Xoài", ten_tttm: "Trung tâm thương mại ITC Đồng Xoài", dientich: 9000, namdautuxaydung: "", phanloai: "III", vondautu: 150 },
    { huyen: "Đồng Xoài", ten_tttm: "Siêu thị Co.opMart Đồng Xoài", dientich: 3107, namdautuxaydung: "2009", phanloai: "II", vondautu: 0 },
    { huyen: "Đồng Xoài", ten_tttm: "Siêu thị điện máy nội thất Chợ Lớn, chi nhánh Bình Phước", dientich: 4000, namdautuxaydung: "2017", phanloai: "III", vondautu: 0 },
    { huyen: "Đồng Xoài", ten_tttm: "Siêu thị The Gold Mart ", dientich: 4500, namdautuxaydung: "2019", phanloai: "II", vondautu: 0 },
    { huyen: "Đồng Xoài", ten_tttm: "Siêu thị điện máy Nguyễn Kim", dientich: 400, namdautuxaydung: "2014", phanloai: "III", vondautu: 0 },
    { huyen: "Đồng Xoài", ten_tttm: "Vincom Đồng Xoài", dientich: 33000, namdautuxaydung: "", phanloai: "", vondautu: 240 },
    { huyen: "Bình Long", ten_tttm: "Trung tâm thương mại An Lộc - Bình Long", dientich: 26000, namdautuxaydung: "", phanloai: "III", vondautu: 200 },
    { huyen: "Đồng Xoài", ten_tttm: "Siêu thị điện máy xanh Bình Phước", dientich: 3400, namdautuxaydung: "2016", phanloai: "III", vondautu: 0 },
    { huyen: "Bình Long", ten_tttm: "Siêu thị Bé Lan", dientich: 1000, namdautuxaydung: "2017", phanloai: "III", vondautu: 0 },
    { huyen: "Phước Long", ten_tttm: "Trung tâm thương mại Phước Binh", dientich: 10000, namdautuxaydung: "", phanloai: "III", vondautu: 50 },
    { huyen: "Phước Long", ten_tttm: "Siêu thị Phương Lan", dientich: 800, namdautuxaydung: "2014", phanloai: "III", vondautu: 0 },
    { huyen: "Phước Long", ten_tttm: "Trung tâm thương mại Sơn Thành - Phước Long", dientich: 12000, namdautuxaydung: "", phanloai: "Đang xây dựng", vondautu: 300 },
    { huyen: "Phước Long", ten_tttm: "Vincom Phước Long", dientich: 15000, namdautuxaydung: "", phanloai: "", vondautu: 190 },
    { huyen: "Bù Đốp", ten_tttm: "Trung tâm thương mại Thanh Bình - Bù Đốp", dientich: 61000, namdautuxaydung: "", phanloai: "III", vondautu: 100 },
    { huyen: "Đồng Phú", ten_tttm: "Siêu thị Co.opMart Đồng Phú", dientich: 3000, namdautuxaydung: "2019", phanloai: "II", vondautu: 0 },
    { huyen: "Chơn Thành", ten_tttm: "TTTM Đô Thành - Chơn Thành", dientich: 10000, namdautuxaydung: "", phanloai: "Đang xây dựng", vondautu: 300 },
    { huyen: "Chơn Thành", ten_tttm: "Vincom Chơn Thành", dientich: 31000, namdautuxaydung: "", phanloai: "III", vondautu: 220 },
    { huyen: "Bù Đăng", ten_tttm: "Dự  án Siêu thị Co.opMart Bù Đăng", dientich: 0, namdautuxaydung: "", phanloai: "", vondautu: 0 },
    { huyen: "Bù Đăng", ten_tttm: "Dự án Siêu Thị Boobo và chợ đêm", dientich: 0, namdautuxaydung: "", phanloai: "", vondautu: 0 },
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