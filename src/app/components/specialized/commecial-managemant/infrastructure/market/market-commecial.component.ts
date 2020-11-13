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
import { MarketCommonModel } from 'src/app/_models/APIModel/commecial-management.model';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { District } from 'src/app/_models/district.model';

interface HashTableNumber<T> {
  [key: string]: T;
}

@Component({
  selector: 'app-market-commecial',
  templateUrl: './market-commecial.component.html',
  styleUrls: ['./market-commecial.component.scss']
})

export class MarketCommecialManagementComponent implements OnInit {
  //Constant-------------------------------------------------------------------------
  public readonly OBJ_ID: number = 10592419;
  public readonly TIME_ID: number = 2020;
  public readonly ORG_ID: number = 1;
  public readonly TYPE_INDICATOR_INPUT: number = 1;
  public readonly ATTRIBUTE_CODE: string = 'IND_NAME';
  public readonly UNIT_CODE: string = 'IND_UNIT';
  public readonly ATTRIBUTE_DEFAULT: number = 1;
  //Viewchild & Input-----------------------------------------------------------------------
  @ViewChildren(ReportDirective) inputs: QueryList<ReportDirective>
  @ViewChild('new_element', { static: false }) ele: ElementRef;
  @ViewChild('form', { static: false }) ngForm: NgForm;
  @ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceHuyenThi.filter = filterValue.trim().toLowerCase();
  }
  //Variable for HTML&TS-------------------------------------------------------------------------
  public options: any = []
  public model = {
    tatca: true, dongxoai: false, phuoclong: false,
    binhlong: false, budang: false, budop: false,
    phurieng: false, dongphu: false, bugiamap: false,
    locninh: false, hongquan: false, chonthanh: false
  }
  public formChangesSubscription;
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
  dataHuyenThi: Array<MarketCommonModel> = [{ huyen: "Đồng Xoài", tongsocho: 10, chohang1: 2, chohang2: 6, chohang3: 2 },
  { huyen: "Phước Long", tongsocho: 10, chohang1: 2, chohang2: 6, chohang3: 2 },
  { huyen: "Chơn Thành", tongsocho: 10, chohang1: 2, chohang2: 6, chohang3: 2 },
  { huyen: "Bình Long", tongsocho: 10, chohang1: 2, chohang2: 6, chohang3: 2 },
  { huyen: "Lộc Ninh", tongsocho: 10, chohang1: 2, chohang2: 6, chohang3: 2 },
  { huyen: "Hớn Quản", tongsocho: 10, chohang1: 2, chohang2: 6, chohang3: 2 },
  { huyen: "Đồng Phú", tongsocho: 10, chohang1: 2, chohang2: 6, chohang3: 2 },
  { huyen: "Bù Đăng", tongsocho: 10, chohang1: 2, chohang2: 6, chohang3: 2 },
  { huyen: "Bù Dốp", tongsocho: 10, chohang1: 2, chohang2: 6, chohang3: 2 },
  { huyen: "Bù Gia Mập", tongsocho: 10, chohang1: 2, chohang2: 6, chohang3: 2 },
  { huyen: "Phú Riềng", tongsocho: 10, chohang1: 2, chohang2: 6, chohang3: 2 },
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
    public reportSevice: ReportService,
    public route: ActivatedRoute,
    public keyboardservice: KeyboardService,
    public info: InformationService
  ) { }

  ngOnInit(): void {
    let data: any = JSON.parse(localStorage.getItem('currentUser'));
    this.org_id = parseInt(data.org_id);
    this.filterEntity = new CompanyDetailModel();
    this.tempFilter = new CompanyDetailModel();
    this.filterType = MatTableFilter.ANYWHERE;
    this.obj_id = this.OBJ_ID;
    this.time_id = this.TIME_ID;
    this.GetReportById(this.obj_id, this.time_id, this.org_id);
    this.keyboardservice.keyBoard.subscribe(res => {
      this.move(res)
    })
    // this.formChangesSubscription = this.ngForm.form.valueChanges.subscribe();
    this.dataSourceHuyenThi.data = this.dataHuyenThi;
    console.log(this.dataSourceHuyenThi.data);
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.accordion.openAll();
    this.dataSourceHuyenThi.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Số hàng';
    this.paginator._intl.firstPageLabel = "Trang Đầu";
    this.paginator._intl.lastPageLabel = "Trang Cuối";
    this.paginator._intl.previousPageLabel = "Trang Trước";
    this.paginator._intl.nextPageLabel = "Trang Tiếp";
  }
  arrayTextHeader = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
    'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG',
    'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AV',
    'AW', 'AX', 'AY', 'AZ', 'BA', 'BB', 'BC', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BK', 'BL',
    'BM', 'BN', 'BO', 'BP', 'BQ', 'BR', 'BS', 'BT', 'BU', 'BV', 'AW', 'BX', 'BY', 'BZ', 'CA',
    'CB', 'CC', 'CD', 'CE', 'CF', 'CG', 'CH', 'CI', 'CJ', 'CK', 'CL', 'CM', 'CN', 'CO', 'CP',
    'CQ', 'CR', 'CS', 'CT', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ'];

  headerArray = ['index', 'tenhuyenthi', 'tongsocho', 'chohang1', 'chohang2', 'chohang3']

  obj_id: number;
  time_id: number;
  org_id: number = 0;
  rows: number = 0;
  is_sent: boolean = false;

  thoigianbaocao: string = "";
  tenbaocao: string = "";
  ngaybatdaubaocao: string = "";
  ngayketthucbaocao: string = "";


  attributes: Array<ReportAttribute> = [];
  attributeHeaders: Array<any>;
  indicators: Array<ReportIndicator> = []
  datarows: Array<ReportDatarow> = []
  object: ReportOject[] = [];
  dataSource: MatTableDataSource<ReportTable> = new MatTableDataSource<ReportTable>();
  tableData: MatTableDataSource<ReportTable> = new MatTableDataSource<ReportTable>();
  public filterEntity;
  public tempFilter;
  public filterType: MatTableFilter;
  dataSourceHuyenThi: MatTableDataSource<MarketCommonModel> = new MatTableDataSource<MarketCommonModel>();
  ///
  isSearch_Advanced: boolean = true;
  countNumberCondition: any[] = [{ id: 1, filed_name: 'ten_doanh_nghiep', filed_value: '' }];
  count: number = 1;
  public displayedFields1: string[];
  ///
  soChoHang1: number = 0;
  soChoHang2: number = 0;
  soChoHang3: number = 0;
  tongVonDauTu: number = 0;
  soLuongCho: number = 0;

  add_condition() {
    this.count++;
    let new_ob = { id: this.count, filed_name: 'ten_doanh_nghiep', filed_value: '' }
    this.countNumberCondition.push(new_ob);
    // console.log(this.countNumberCondition)
  }
  ///
  saveOptions(x: any[]) {
    x.forEach(element => {
      this.options.push(element);
    });
  }

  move(object) {
    const inputToArray = this.inputs.toArray()
    let index = inputToArray.findIndex(x => x.element == object.element);
    switch (object.action) {
      case "UP":
        index -= this.columns;
        break;
      case "DOWN":
        index += this.columns;
        break;
      case "LEFT":
        index -= this.rows;
        break;
      case "RIGHT":
        index += this.rows;
        break;
    }

    if (index >= 0 && index < this.inputs.length) {
      inputToArray[index].element.nativeElement.focus();
      // inputToArray[index].element.nativeElement.style.backgroundColor = '#5789D8';
    }
  }

  checkAccessObj() {
    var ret = 0;
    if (ret > 0) {
      return true;
    }
    switch (ret) {
      case -2:
        //alertify.error('Đã trình lãnh đạo!');
        break;
      case -3:
        //alertify.error('Đã trình đơn vị giao!');
        break;
      case -4:
        //alertify.error('Đơn vị giao đã phê duyệt!');
        break;
      case -7:
        //alertify.error('Đã gửi yêu cầu đính chính đến đơn vị giao!');
        break;
      case -9:
        //alertify.error('Đơn vị giao từ chối yêu cầu đính chính!');
        break;
      case -10:
        //alertify.error('Không hoàn thành!');
        break;
      case -19:
        //alertify.error('Báo cáo không tồn tại!');
        break;
      case -20:
        //alertify.error('Báo cáo chưa được giao!');
        break;
      case -21:
        //alertify.error('Báo cáo đã hết hạn!');
        break;
      case -22:
        //alertify.error('Báo cáo là nhóm báo cáo!');
        break;
      case -23:
        //alertify.error('Báo cáo chưa được kích hoạt!');
        break;
      case -24:
        //alertify.error('Tài khoản không có quyền thực hiện báo cáo!');
        break;
      case -25:
        //alertify.error('Báo cáo không phải là báo cáo số liệu, báo cáo danh sách!');
        break;
      case -26:
        //alertify.error('Báo cáo đột xuất không được thực hiện liên kết báo cáo!');
        break;
      case -99:
        //alertify.error('Có lỗi xảy ra!');
        break;
    }
    return false;
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
  cols: Array<any> = [];
  filteredOptions: any[];
  getListString(list: any[]) {
    return list.map(x => x.name);
  }
  public filter() {
    this.filterEntity = { ...this.tempFilter }
  }
  Xoa_dong() {
    if (this.countNumberCondition.length === 1) {
      return;
    } else {
      let cloneArray = [...this.countNumberCondition];
      this.countNumberCondition = cloneArray.filter(item => item.id !== parseInt(this.ele.nativeElement.id));
      // console.log(this.ele.nativeElement.id, this.countNumberCondition, this.ele);
    }

  }
  GetReportById(obj_id: number, time_id: number, org_id: number) {
    console.log("+ Function: GetReportById(obj_id:", + obj_id + ",time_id: ", +time_id + ", org_id:" + org_id + ")");
    this.reportSevice.GetReportByKey(obj_id, time_id, org_id).subscribe(
      allRecord => {

        this.cols = [];
        allRecord.data[1].forEach(element => {
          if (element.attr_code != 'IND_NAME')
            this.cols.push({ field: element.fld_code, header: element.attr_name });
          else
            this.cols.push({ field: element.attr_code, header: element.attr_name });
        });

        this.attributes = allRecord.data[1] as ReportAttribute[];
        this.attributes.sort((a, b) => a.attr_code.localeCompare(b.attr_code));
        // this.attributes.forEach(item => this.displayedFields1.push(item.attr_code.toString()));
        this.indicators = allRecord.data[2] as ReportIndicator[];
        this.indicators.sort((a, b) => a.ind_code.toLocaleString().localeCompare(b.ind_code.toLocaleString()));
        // console.log("Bảng indicator: ", this.displayedFields1);
        this.datarows = allRecord.data[3] as ReportDatarow[];
        this.object = allRecord.data[0];
        // console.log(this.indicators);
        // console.log(this.datarows);
        this.is_sent = !(allRecord.data[0][0].state_id == 101 || allRecord.data[0][0].state_id == 401);
        if (this.object[0]) {
          this.formatFrameReport(this.object[0]);
        }
        //this.indicators.forEach(e => { console.log(e.ind_unit) });
        this.CreateMergeHeaderTable(this.attributes);

        this.CreateReportTable();

        this.items = this.getNestedChildren(this.indicators, null);
        this.items[0].children.forEach(x => x.children = null);
      }
    )
  }
  formatFrameReport(report: ReportOject) {
    this.tenbaocao = report.obj_name;
    this.thoigianbaocao = this.convertTimeIdToTimePeriod(parseInt(report.time_id));
    this.ngaybatdaubaocao = moment(report.start_date).format('DD/MM/YYYY');
    this.ngayketthucbaocao = moment(report.end_date).format('DD/MM/YYYY');
  }

  convertTimeIdToTimePeriod(time_id: number): string {
    let time: string = time_id.toString();
    switch (time.length) {
      case 4:
        return "Năm " + time;
      case 6:
        return "Tháng " + time.substr(4, 2) + " năm " + time.slice(0, 4);
      case 5:
        return "Quý " + time.substr(4, 1) + " năm " + time.slice(0, 4);
      default:
        return time;
    }
  }

  countChildNode(attr_id: number, attributes: ReportAttribute[]): number {
    var temp = attributes.filter(x => x.parent_id == attr_id);
    if (temp.length == 0)
      return 1;
    else {
      let sum = 0;
      temp.forEach(attr => {
        sum += this.countChildNode(attr.attr_id, attributes);
      })
      return sum;
    }
  }

  CreateMergeHeaderTable(attributesValue: ReportAttribute[]) {
    let attributes: ReportAttribute[] = [];
    attributesValue.forEach(val => attributes.push(Object.assign({}, val)));
    let hashTableParentLength: HashTableNumber<number> = {};
    attributes = attributes.filter(a => a.attr_code.toLowerCase() != 'rn');

    attributes.forEach(element => {
      // if (element.parent_id != null){
      //   if (!hashTableParentLength[element.parent_id]){
      //     hashTableParentLength[element.parent_id] = 0;
      //   }
      //   hashTableParentLength[element.parent_id]  +=1;
      // }
      hashTableParentLength[element.attr_id] = this.countChildNode(element.attr_id, attributes);
    });
    let loopCount: number = 0;
    while (attributes.length > 3) {
      loopCount += 1;
      this.indexOftableMergeHader += 1;
      let totlmerge: ToltalHeaderMerge = new ToltalHeaderMerge();
      let mergerHaders: HeaderMerge[] = [];
      let layerTop: ReportAttribute[] = attributes.filter(element => element.parent_id == null);
      let lengthBeforeOfAttributes: number = attributes.length;
      attributes = attributes.filter(e => e.parent_id != null || e.is_default == 1 || hashTableParentLength[e.attr_id] == 1);
      attributes.forEach(attribute => {
        //if (attribute.is_default == 1) {
        attribute.attr_code = attribute.attr_code + loopCount.toString();
        //}
      });
      layerTop.forEach(layer => {
        let mergeHeader: HeaderMerge = new HeaderMerge();
        mergeHeader.colLenght = hashTableParentLength[layer.attr_id] ? hashTableParentLength[layer.attr_id] : 1;
        mergeHeader.colName = (layer.attr_code + "_TEST").toLowerCase();
        mergeHeader.colText = hashTableParentLength[layer.attr_id] > 1 && hashTableParentLength[layer.attr_id] ? layer.attr_name : "";
        mergeHeader.colDefault = layer.is_default;
        mergerHaders.push(mergeHeader);
      });
      this.mergeHeadersColumn = mergerHaders.sort((a, b) => b.colDefault - a.colDefault)
        .map(c => c.colName.toLowerCase());
      totlmerge.headerColName = this.mergeHeadersColumn;
      this.mergeHeadersColumn = [];
      totlmerge.headerMerge = mergerHaders;
      this.tableMergeHader.push(totlmerge);
      attributes.forEach(element => {
        layerTop.forEach(layer => {
          if (element.parent_id == layer.attr_id) {
            element.parent_id = null;
          }
        });
      });
      if (lengthBeforeOfAttributes == attributes.length) {
        break;
      }
    }
    this.tableMergeHader.pop();
  }

  CreateReportTable() {
    this.attributes = this.attributes.filter(a => a.fld_code && a.fld_code.toLowerCase() != 'null'
      && a.attr_code.toLowerCase() != 'ind_code'
      && a.attr_code.toLowerCase() != 'rn');
    this.attributeHeaders = this.attributes.sort((a, b) => b.is_default - a.is_default)
      .filter(a => a.fld_code.toLowerCase() != null)
      .map(c => c.is_default == 1 ? c.attr_code.toLowerCase() : c.fld_code.toLowerCase());
    this.attributeHeaders = this.attributeHeaders.filter(a => a.toLowerCase() != 'ind_code' && a.toLowerCase() != 'rn')
    this.attributeHeaders.unshift('index');
    for (let index = 0; index < this.indicators.length; index++) {
      const elementIndicator = this.indicators[index];
      const elementDatarow = this.datarows.find(e => e.ind_id == elementIndicator.ind_id);

      let tableRow: ReportTable = new ReportTable();
      tableRow.ind_formula = elementIndicator.formula;
      tableRow.ind_id = elementIndicator.ind_id;
      tableRow.ind_name = elementIndicator.ind_name;
      tableRow.ind_type = elementIndicator.ind_type;
      tableRow.ind_unit = elementIndicator.ind_unit;
      tableRow.ind_parent_id = elementIndicator.parent_id;
      if (elementDatarow) {
        tableRow.fc01 = elementDatarow.fc01 ? elementDatarow.fc01 : "";
        tableRow.fc02 = elementDatarow.fc02 ? elementDatarow.fc02 : "";
        tableRow.fc03 = elementDatarow.fc03 ? elementDatarow.fc03 : "";
        tableRow.fc04 = elementDatarow.fc04 ? elementDatarow.fc04 : "";
        tableRow.fc05 = elementDatarow.fc05 ? elementDatarow.fc05 : "";
        tableRow.fc06 = elementDatarow.fc06 ? elementDatarow.fc06 : "";
        tableRow.fc07 = elementDatarow.fc07 ? elementDatarow.fc07 : "";
        tableRow.fc08 = elementDatarow.fc08 ? elementDatarow.fc08 : "";
        tableRow.fc09 = elementDatarow.fc09 ? elementDatarow.fc09 : "";
        tableRow.fc10 = elementDatarow.fc10 ? elementDatarow.fc10 : "";
        tableRow.fn01 = elementDatarow.fn01 ? elementDatarow.fn01 : null;
        tableRow.fn01 = elementDatarow.fn01 ? elementDatarow.fn01 : null;
        tableRow.fn02 = elementDatarow.fn02 ? elementDatarow.fn02 : null;
        tableRow.fn03 = elementDatarow.fn03 ? elementDatarow.fn03 : null;
        tableRow.fn04 = elementDatarow.fn04 ? elementDatarow.fn04 : null;
        tableRow.fn05 = elementDatarow.fn05 ? elementDatarow.fn05 : null;
        tableRow.fn06 = elementDatarow.fn06 ? elementDatarow.fn06 : null;
        tableRow.fn07 = elementDatarow.fn07 ? elementDatarow.fn07 : null;
        tableRow.fn08 = elementDatarow.fn08 ? elementDatarow.fn08 : null;
        tableRow.fn09 = elementDatarow.fn09 ? elementDatarow.fn09 : null;
        tableRow.fn10 = elementDatarow.fn10 ? elementDatarow.fn10 : null;
        tableRow.fn11 = elementDatarow.fn11 ? elementDatarow.fn11 : null;
        tableRow.fn12 = elementDatarow.fn12 ? elementDatarow.fn12 : null;
        tableRow.fn13 = elementDatarow.fn13 ? elementDatarow.fn13 : null;
        tableRow.fn14 = elementDatarow.fn14 ? elementDatarow.fn14 : null;
        tableRow.fn15 = elementDatarow.fn15 ? elementDatarow.fn15 : null;
        tableRow.fn16 = elementDatarow.fn16 ? elementDatarow.fn16 : null;
        tableRow.fn17 = elementDatarow.fn17 ? elementDatarow.fn17 : null;
        tableRow.fn18 = elementDatarow.fn18 ? elementDatarow.fn18 : null;
        tableRow.fn19 = elementDatarow.fn19 ? elementDatarow.fn19 : null;
        tableRow.fn20 = elementDatarow.fn20 ? elementDatarow.fn20 : null;
        tableRow.fd01 = elementDatarow.fd01 ? elementDatarow.fd01 : new Date();
        tableRow.fd02 = elementDatarow.fd02 ? elementDatarow.fd02 : new Date();
        tableRow.fd03 = elementDatarow.fd03 ? elementDatarow.fd03 : new Date();
        tableRow.fd04 = elementDatarow.fd04 ? elementDatarow.fd04 : new Date();
        tableRow.fd05 = elementDatarow.fd05 ? elementDatarow.fd05 : new Date();
      } else {
        tableRow.fc01 = '';
        tableRow.fc02 = '';
        tableRow.fc03 = '';
        tableRow.fc04 = '';
        tableRow.fc05 = '';
        tableRow.fc06 = '';
        tableRow.fc07 = '';
        tableRow.fc08 = '';
        tableRow.fc09 = '';
        tableRow.fc10 = '';
        tableRow.fn01 = null;
        tableRow.fn01 = null;
        tableRow.fn02 = null;
        tableRow.fn03 = null;
        tableRow.fn04 = null;
        tableRow.fn05 = null;
        tableRow.fn06 = null;
        tableRow.fn07 = null;
        tableRow.fn08 = null;
        tableRow.fn09 = null;
        tableRow.fn10 = null;
        tableRow.fn11 = null;
        tableRow.fn12 = null;
        tableRow.fn13 = null;
        tableRow.fn14 = null;
        tableRow.fn15 = null;
        tableRow.fn16 = null;
        tableRow.fn17 = null;
        tableRow.fn18 = null;
        tableRow.fn19 = null;
        tableRow.fn20 = null;
        tableRow.fd01 = new Date();
        tableRow.fd02 = new Date();
        tableRow.fd03 = new Date();
        tableRow.fd04 = new Date();
        tableRow.fd05 = new Date();
      }
      this.tableData.data.push(tableRow);
      // console.log(tableRow);
    }
    this.tableData.data.forEach(element => {
      if (element.ind_formula == null && element.ind_type == 1) this.rows++;
    });
    this.dataSource.data = [...this.tableData.data];

    this.dataSource.data.forEach(element => {
      if (element["fn03"])
        this.soChoHang1++;
      if (element["fn07"])
        this.soChoHang2++;
      if (element["fn09"])
        this.soChoHang3++;
      if (element["ind_unit"])
        this.soLuongCho++;
      if (element["fn14"])
        this.tongVonDauTu += element["fn14"];
    });
  }

  applyFilter(event) {
    let filteredData = [];

    let temp = [];
    event.forEach(element => {
      temp.push(element);
      this.indicators.filter(x => x.parent_id == element).map(y => y.ind_id).forEach(z => temp.push(z));
    });

    temp.forEach(element => {
      this.tableData.data.filter(item => {
        if (item.ind_id == element)
          filteredData.push(item);
      })
    })

    if (filteredData.length == 0) {
      this.dataSource.data = this.tableData.data;
    } else {
      this.dataSource.data = filteredData;
    }
    this.soChoHang1 = 0;
    this.soChoHang2 = 0;
    this.soChoHang3 = 0;
    this.tongVonDauTu = 0;
    this.soLuongCho = 0;

    this.dataSource.data.forEach(element => {
      if (element["fn03"])
        this.soChoHang1++;
      if (element["fn07"])
        this.soChoHang2++;
      if (element["fn09"])
        this.soChoHang3++;
      if (element["ind_unit"])
        this.soLuongCho++;
      if (element["fn14"])
        this.tongVonDauTu += element["fn14"];
    });
  }

  SaveReport() {
    console.log(this.dataSource.data);
    this.reportSevice.PostReportData(this.obj_id, this.time_id, this.org_id, this.dataSource.data).subscribe(response => {
      this.info.msgSuccess("Đã lưu thành công!");
    },
      error => {
        this.info.msgError("Xảy ra lỗi: " + error.message);
      })
  }

  SendReport() {
    this.reportSevice.SendReport(this.obj_id, this.org_id, this.time_id.toString()).subscribe(response => {
      this.info.msgSuccess("Đã trình lãnh đạo thành công!");
    },
      error => {
        this.info.msgError("Xảy ra lỗi: " + error.message);
      })
    this.is_sent = true;
  }

  Back() {
    //this.location.back();
  }


  getNestedChildren(indicators: Array<ReportIndicator>, parent: number) {
    var out = []
    for (var i in indicators) {
      if (indicators[i].parent_id == parent) {
        let temp = new TreeviewItem({ text: indicators[i].ind_name, value: indicators[i].ind_id });
        var children = this.getNestedChildren(indicators, indicators[i].ind_id)
        if (children.length) {
          temp.children = children;
        }
        out.push(temp);
      }
    }
    return out
  }

  isSticky(column): boolean {
    return column.attr_code.toLowerCase() === 'ind_unit' ? true : false;
  }
  sortHeaderCondition(event) {

   }
   
  applyDistrictFilter(event) {
    
   }
}
