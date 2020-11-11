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
import { AnnualReportRow } from 'src/app/_models/APIModel/annual-report-row.model';

interface HashTableNumber<T> {
  [key: string]: T;
}



@Component({
  selector: 'total-retail-sales-commecial',
  templateUrl: './total-retail-sales.component.html',
  styleUrls: ['./total-retail-sales.component.scss']
})

export class TRSManagementComponent implements OnInit {
  //Constant-------------------------------------------------------------------------

  //Viewchild & Input-----------------------------------------------------------------------
  @ViewChildren(ReportDirective) inputs: QueryList<ReportDirective>
  //Variable for HTML&TS-------------------------------------------------------------------------
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

  dataSource: MatTableDataSource<AnnualReportRow>;

  public tableMergeHader: Array<ToltalHeaderMerge> = [];
  public mergeHeadersColumn: Array<string> = [];
  public indexOftableMergeHader: number = 0;

  columns: number = 1;
  displayedColumns: string[] = ['index', 'ind_name', 'thang_1', 'thang_2', 'thang_3', 'thang_4', 'thang_5', 'thang_6', 'thang_7', 'thang_8', 'thang_9', 'thang_10', 'thang_11', 'thang_12', 'tong'];

  //Angular FUnction --------------------------------------------------------------------
  constructor(
    private reportSevice: ReportService
  ) { }

  ngOnInit(): void {
    let data: any = JSON.parse(localStorage.getItem('currentUser'));
    this.get12MonthData();
  }

  get12MonthData() {
    this.reportSevice.Get12MonthReports(10588757, 2020, 'THTKBC').subscribe(
      response => {
        let tempData: AnnualReportRow[] = [];
        for (var i = 0; i < response.data[0].length; i++) {
          let tempRow: AnnualReportRow = new AnnualReportRow();
          tempRow.ind_id = response.data[0][i].ind_id;
          tempRow.ind_name = response.data[0][i].ind_name;
          for (var j = 1; j < 13; j++) {
            tempRow['thang_' + j] = (response.data[j].length != 0) ? response.data[j][i]['thang_' + j] : null;
          }
          tempData.push(tempRow);
        }
        this.dataSource = new MatTableDataSource<AnnualReportRow>(tempData);
      }
    )
  }

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

  applyFilter(event) {

  }
}

