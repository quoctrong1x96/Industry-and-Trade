//Import library
import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { tap, startWith, map } from 'rxjs/operators';
import { MatTableFilter } from 'mat-table-filter';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
//Import service
import { MarketService } from '../../../../_services/APIService/market.service';
import { PaginationService } from '../../../../_services/PaginationService';
import { PagerService } from 'src/app/_services/pagination.service';
//Import model
import { CompanyDetailModel, ProductModel, ImportExportValueModel } from '../../../../_models/APIModel/domestic-market.model';
import { CareerModel, DistrictModel } from 'src/app/_models/APIModel/domestic-market.model';
import { formatDate } from '@angular/common';
import { LoginService } from 'src/app/_services/APIService/login.service';

//Interface
interface HashTableNumber<T> {
  [key: string]: T;
}

export class filterModel {
  ten_doanh_nghiep: string = '';
  ten_quan_huyen: string = '';
  ten_nganh_nghe: string = '';
}

@Component({
  selector: 'business-export-import',
  templateUrl: './business-export-import.component.html',
  styleUrls: ['./business-export-import.component.scss']
})

export class BusinessExportImportComponent implements OnInit {
  //Declare variable for CONSTANT
  private readonly SEPERATE_FILTER = ";";
  public readonly FORMAT = 'dd/MM/yyyy';
  public readonly LOCALE = 'en-GB';
  private readonly DEFAULT_IMAGE: string = '../../../../assets/img/brandlogo/company_ph01.jpg';
  private readonly DEFAULT_PERIOD = "6 Tháng";
  //Declare variable for TS & HTML
  private filterEntity;
  private tempFilter;
  private filterType: MatTableFilter;
  private dataSource: MatTableDataSource<CompanyDetailModel> = new MatTableDataSource();
  private dataSourceImport: MatTableDataSource<CompanyDetailModel> = new MatTableDataSource();
  private selectedCategory: string = "Tất cả";
  private selectedAddress: string = "Tất cả";
  private selectedName: string;
  private selected_Career: string = "";
  private selectedType: string = "Dạng bảng";
  public typeShow: number = 1;
  public displayedColumns: string[] = ['index', 'ten_doanh_nghiep', 'mst', 'san_luong', 'gia_tri', 'chi_tiet_doanh_nghiep'];
  private filteredCareerList: Observable<CareerModel[]>;
  private addresses: Array<any> = [null];
  private loading: boolean = false;
  private types = ['Dạng thẻ', 'Dạng bảng'];
  private page: number = 1;
  private pager: any = {};
  private selectedPeriod: string = "";
  private periods = ["Tháng", "Quý", "6 Tháng", "Năm"];
  private months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  private quarters: Object[] = [
    { ma_so: 1, ma_chu: "I" },
    { ma_so: 2, ma_chu: "II" },
    { ma_so: 3, ma_chu: "III" },
    { ma_so: 4, ma_chu: "IV" },
  ];
  private selectedHalf: number = 1;
  private selectedMonth: number = 1;
  private selectedQuarter: number = 0;
  private selectedYear: number = 2020;
  private years: Array<number> = [];
  private halfs: number[] = [1];

  //Declare variable for ONLU TS
  private control = new FormControl();
  private _marketService: MarketService;
  private errorMessage: any;
  private careerList: Array<CareerModel> = new Array<CareerModel>();
  private districtList: Array<DistrictModel> = new Array<DistrictModel>();
  private categories = [null];//['Tất cả', 'Hạt điều', 'Hạt tiêu', 'Hạt cà phê', 'Cao su'];
  private pagedItems: any[];
  private productList: any;
  private isSCT: boolean = false;
  //Viewchild
  @ViewChild('TABLE1', { static: false }) table: ElementRef;
  @ViewChild('scheduledOrdersPaginator', { static: true }) paginator: MatPaginator;
  @ViewChild('scheduledOrdersPaginator1', { static: true }) paginator1: MatPaginator;
  @ViewChild('selected_Career', { static: false }) careerEle: ElementRef;

  constructor(
    private marketService: MarketService,
    private paginationService: PaginationService,
    private _loginService: LoginService,
    private router: Router,
  ) {
    this._marketService = marketService;
  }
  ngOnInit(): void {
    this.filterEntity = new CompanyDetailModel();
    this.tempFilter = new CompanyDetailModel();
    this.filterType = MatTableFilter.ANYWHERE;
    this.selectedPeriod = this.DEFAULT_PERIOD;
    this.selectedYear = this.getCurrentYear();
    this.selectedMonth = this.getCurrentMonth();
    this.years = this.initialYears();
    this.isSCT = this._loginService.userValue.user_role < 3;
    console.log(this._loginService.userValue);
    this.getAllCompanyExport();
    this.getAllCompanyImport();
    this.getAllDistrict();
  }
  // ngAfterViewInit(): void {
  //   if (this.typeShow == 1)
  //     this.paginator.page
  //       .pipe(
  //         tap(() => this.loadLessonsPage())
  //       )
  //       .subscribe();
  // }
  //Function for PROCESS-FLOW   -------------------------------------------------------------------------------
  private getAllDistrict() {
    console.log("+ Function: GetAllDistrict()");
    this._marketService.GetAllDistrict().subscribe(
      allrecords => {
        this.districtList = allrecords.data as DistrictModel[];
        this.districtList.forEach(element => this.addresses.push(element.ten_quan_huyen));
      });
  }
  private getAllNganhNghe() {
    console.log("+ Function: GetAllNganhNghe()");
    this._marketService.GetAllCareer().subscribe(
      allrecords => {
        this.careerList = allrecords.data as CareerModel[];
        this.careerList.forEach(element => element.ma_nganh_nghe.length > 3 ? this.categories.push(element.ten_kem_ma) : 0);
      });

    this.filteredCareerList = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private getAllCompanyImport() {
    console.log("+ Function: getAllCompanyImport()");
    let valueOfPeriod: number = 0;
    let valueOfYear: number = 0;
    let valueOfPeriodDetail: number = 0;
    //
    if (this.selectedPeriod == "Tháng") {//"Tháng", "Quý", "6 Tháng", "Năm"{
      valueOfPeriod = 1;
      valueOfPeriodDetail = this.selectedMonth;
    } else if (this.selectedPeriod == 'Quý') {
      valueOfPeriod = 2;
      valueOfPeriodDetail = this.selectedQuarter;
    } else if (this.selectedPeriod == '6 Tháng') {
      valueOfPeriod = 3;
      valueOfPeriodDetail = this.selectedHalf;
    } else {
      valueOfPeriod = 4;
      valueOfPeriodDetail = 1;
    }
    valueOfYear = this.selectedYear;
    console.log(valueOfPeriod, valueOfYear, valueOfPeriodDetail);
    this._marketService.GetAllCompanyImport(valueOfPeriod, valueOfYear, valueOfPeriodDetail, this.isSCT).subscribe(
      allrecords => {
        if (allrecords.data.length > 0) {
          this.dataSourceImport = new MatTableDataSource<CompanyDetailModel>(allrecords.data[0]);
          if (this.dataSourceImport.data.length) {
            this.dataSourceImport.paginator = this.paginator1;
            this.paginator1._intl.itemsPerPageLabel = 'Số công ty mỗi trang';
            this.paginator1._intl.lastPageLabel = "Đến cuối";
            this.paginator1._intl.nextPageLabel = "Trang tiếp";
            this.paginator1._intl.previousPageLabel = "Trang trước";
          }
        }
      },
      error => this.errorMessage = <any>error
    );
  }
  private getAllCompanyExport() {
    console.log("+ Function: getAllCompanyExport()");
    let valueOfPeriod: number = 0;
    let valueOfYear: number = 0;
    let valueOfPeriodDetail: number = 0;
    //
    if (this.selectedPeriod == "Tháng") {//"Tháng", "Quý", "6 Tháng", "Năm"{
      valueOfPeriod = 1;
      valueOfPeriodDetail = this.selectedMonth;
    } else if (this.selectedPeriod == 'Quý') {
      valueOfPeriod = 2;
      valueOfPeriodDetail = this.selectedQuarter;
    } else if (this.selectedPeriod == '6 Tháng') {
      valueOfPeriod = 3;
      valueOfPeriodDetail = this.selectedHalf;
    } else {
      valueOfPeriod = 4;
      valueOfPeriodDetail = 1;
    }
    valueOfYear = this.selectedYear;
    console.log(valueOfPeriod, valueOfYear, valueOfPeriodDetail);
    this._marketService.GetAllCompanyExport(valueOfPeriod, valueOfYear, valueOfPeriodDetail, this.isSCT).subscribe(
      allrecords => {
        if (allrecords.data.length > 0) {
          this.dataSource = new MatTableDataSource<CompanyDetailModel>(allrecords.data[0]);
          if (this.dataSource.data.length) {
            this.dataSource.paginator = this.paginator;
            this.paginator._intl.itemsPerPageLabel = 'Số công ty mỗi trang';
            this.paginator._intl.lastPageLabel = "Đến cuối";
            this.paginator._intl.nextPageLabel = "Trang tiếp";
            this.paginator._intl.previousPageLabel = "Trang trước";
          }
        }
      },
      error => this.errorMessage = <any>error
    );
  }
  private getAllProduct(allrecords) {
    console.log("+ Function: GetAllProduct");
    this.productList = allrecords.data as Array<ProductModel>;
    if (this.typeShow == 1) {
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Số công ty mỗi trang';
      this.paginator._intl.lastPageLabel = "Đến cuối";
      this.paginator._intl.nextPageLabel = "Trang tiếp";
      this.paginator._intl.previousPageLabel = "Trang trước";
    }
  }
  //Function for EVENT HTML     -------------------------------------------------------------------------------
  private timKiem() {
    this.getAllCompanyExport();
    this.getAllCompanyImport();
  }
  //Xuất excel
  private exportToExcel(filename: string, sheetname: string, is_export: boolean) {

    let excelFileName: string;
    let newArray: any[] = [];

    //Format name of Excel will be export
    sheetname = sheetname.replace('/', '_');
    excelFileName = filename + '.xlsx';

    //Alias column name
    let data;
    if (is_export)
      data = Object.values(this.dataSource.data);
    else
      data = Object.values(this.dataSourceImport.data);
      
    Object.keys(data).forEach((key, index) => {
      newArray.push({
        'Tên doanh nghiệp': this.formatString(data[key].ten_doanh_nghiep),
        // 'Điện thoại': this.formatString(data[key].dien_thoai),
        'Mã số thuế': data[key].mst,
        'Sản lượng': data[key].tong_san_luong,
        'Trị giá': data[key].tong_tri_gia
      });
    });
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(newArray);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    /* save to file */
    XLSX.utils.book_append_sheet(wb, ws, sheetname);
    XLSX.writeFile(wb, excelFileName);
  }
  private _filter(value: string): CareerModel[] {
    const filterValue = this._normalizeValue(value);
    return this.careerList.filter(career => this._normalizeValue(career.ten_kem_ma).includes(filterValue));
  }
  private openDetailCompany(mst: string) {
    let url = this.router.serializeUrl(
      this.router.createUrlTree([encodeURI('#') + '/partner/search/' + mst]));
    window.open(url.replace('%23', '#'), "_blank");
  }
  private changeType() {
    if (this.selectedType == this.types[0]) {
      this.typeShow = 0;
    }
    else {
      this.typeShow = 1;
      //this.ngAfterViewInit();
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Số công ty mỗi trang';
      this.paginator._intl.lastPageLabel = "Đến cuối";
      this.paginator._intl.nextPageLabel = "Trang tiếp";
      this.paginator._intl.previousPageLabel = "Trang trước";
    }
  }
  private filter() {
    this.filterEntity = { ...this.tempFilter }
  }
  private cancel() {
    this.tempFilter = new filterModel();
    this.filterEntity = { ...filterModel };
  }
  changePeriod() {
    switch (this.selectedPeriod) {
      case "Tháng":
        this.selectedMonth = this.getCurrentMonth();
        this.selectedYear = this.getCurrentYear();
        break;
      case "Quý":
        this.selectedQuarter = this.getCurrentQuarter();
        this.selectedYear = this.getCurrentYear();
        break;
      case "Năm":
        this.selectedYear = this.getCurrentYear();
        break;
      case "6 Tháng":
        this.selectedYear = this.getCurrentYear();
        this.selectedHalf = 1;
        break;
      default:
        break;
    }
  }
  //Function for EXTENTION      -------------------------------------------------------------------------------
  private loadLessonsPage() {
    // this.dataSource;
    // this.setPage(1);
  }
  private unicodeToAZ(str: string) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
  }
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  private formatDateFromString(date: string) {
    if (!date) {
      return '';
    }
    return formatDate(date, this.FORMAT, this.LOCALE);
  }
  private formatString(value: string) {

    if (!value) {
      return '';
    }
    else if (value.trim().toLowerCase() === 'null') {
      return '';
    }
    else {
      return value.trim();
    }
  }

  private getCurrentMonth() {
    var currentDate = new Date();
    return currentDate.getMonth() + 1;
  }
  private getCurrentYear() {
    var currentDate = new Date();
    return currentDate.getFullYear();
  }
  private getCurrentQuarter() {
    let currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    return month <= 3 ? 1 : month <= 6 ? 2 : month <= 9 ? 3 : 4;
  }
  private initialYears() {
    let returnYear: Array<any> = [];
    let currentDate = new Date();
    let nextYear = currentDate.getFullYear() + 1;
    for (let index = 0; index < 11; index++) {
      returnYear.push(nextYear - index);
    }
    return returnYear;
  }
  // applyFilter(type: string, filterValue: string) {
  //   let newFilter = "";
  //   let checkAdded = false;
  //   if (this._currentFilter.length > 0) {

  //     let param = this._currentFilter.split(this.SEPERATE_FILTER);

  //     param.forEach(element => {
  //       if (element.length > 0) {
  //         let newValueFilter = "";
  //         let key = element.split("|")[0];
  //         if (type == key) {
  //           newValueFilter = key + "|" + filterValue;
  //           if (newFilter.length > 0) newFilter += ";" + newValueFilter;
  //           else newFilter = newValueFilter;
  //           checkAdded = true;
  //         }
  //         else {
  //           if (newFilter.length > 0) newFilter += ";" + element;
  //           else newFilter = element;
  //         }
  //       }
  //     });
  //   }
  //   if (!checkAdded) {
  //     let newValueFilter = type + "|" + filterValue;
  //     if (newFilter.length > 0) newFilter += ";" + newValueFilter;
  //     else newFilter = newValueFilter;
  //   }

  //   this._currentFilter = newFilter;
  //   // filterValue = type + '|' + filterValue;
  //   console.log(this._currentFilter);
  //   this.dataSource.filter = this._currentFilter;
  // }

  // removecompany(key: string) {
  //   console.log(key);
  // }

  // addFavourite(company: Company) {
  //   console.log(company);
  // }

  // addToCart(company: Company) {
  //   console.log(company);
  // }
}
