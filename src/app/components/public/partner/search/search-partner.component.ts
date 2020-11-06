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
import { CompanyDetailModel, ProductModel } from '../../../../_models/APIModel/domestic-market.model';
import { CareerModel, DistrictModel } from 'src/app/_models/APIModel/domestic-market.model';

//Interface
interface HashTableNumber<T> {
  [key: string]: T;
}

export class filterModel{
  ten_doanh_nghiep: string = '';
  ten_quan_huyen: string = '';
  ten_nganh_nghe: string = '';
}

@Component({
  selector: 'app-search-partner',
  templateUrl: './search-partner.component.html',
  styleUrls: ['./search-partner.component.scss']
})

export class SearchPartnerComponent implements AfterViewInit, OnInit {
  //Declare variable for CONSTANT
  private readonly SEPERATE_FILTER = ";";
  private readonly DEFAULT_IMAGE: string = '../../../../assets/img/brandlogo/company_ph01.jpg';
  //Declare variable for TS & HTML
  private filterEntity;
  private tempFilter;
  private filterType: MatTableFilter;
  private dataSource = new MatTableDataSource<any>();
  private selectedCategory: string = "Tất cả";
  private selectedAddress: string = "Tất cả";
  private selectedName: string;
  private selected_Career: string = "";
  private selectedType: string = "Dạng bảng";
  public typeShow: number = 1;
  public displayedColumns: string[] = ['index', 'ten_doanh_nghiep', 'mst', 'dia_chi', 'dien_thoai', 'ten_nganh_nghe', 'chi_tiet_doanh_nghiep'];
  private filteredCareerList: Observable<CareerModel[]>;
  private addresses: Array<any> = [null];
  private loading:boolean = false;
  private types = ['Dạng thẻ', 'Dạng bảng'];
  private page:number = 1;
  private pager: any = {};
  //Declare variable for ONLU TS
  private control = new FormControl();
  private _marketService: MarketService;
  private errorMessage: any; 
  private careerList: Array<CareerModel> = new Array<CareerModel>();
  private districtList: Array<DistrictModel> = new Array<DistrictModel>();
  private categories = [null];//['Tất cả', 'Hạt điều', 'Hạt tiêu', 'Hạt cà phê', 'Cao su'];
  private pagedItems: any[];
  private pagerService: PagerService;
  private productList:any;
  //Viewchild
  @ViewChild('TABLE', { static: false }) table: ElementRef;
  @ViewChild('scheduledOrdersPaginator', {static: true}) paginator: MatPaginator;
  @ViewChild('selected_Career', {static: false}) careerEle : ElementRef;

  constructor(
    private marketService: MarketService,
    private paginationService: PaginationService,
    private router: Router,
    private _pagerService: PagerService
  ) {
    this._marketService = marketService;
    this.pagerService = _pagerService;
  }
  ngOnInit(): void {
    this.filterEntity = new CompanyDetailModel();
    this.tempFilter = new CompanyDetailModel();
    this.filterType = MatTableFilter.ANYWHERE;
    this.getAllCompany();
    this.getAllDistrict();
  }
  ngAfterViewInit(): void {
    if (this.typeShow == 1)
      this.paginator.page
        .pipe(
          tap(() => this.loadLessonsPage())
        )
        .subscribe();
  }
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
  private getAllCompany() {
    console.log("+ Function: GetAllCompany()");
    this._marketService.GetAllCompany().subscribe(
      allrecords => {
        console.log(allrecords);
        this.dataSource = new MatTableDataSource<CompanyDetailModel>(allrecords.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator = this.paginator;
          this.paginator._intl.itemsPerPageLabel = 'Số công ty mỗi trang';
          this.paginator._intl.lastPageLabel = "Đến cuối";
          this.paginator._intl.nextPageLabel = "Trang tiếp";
          this.paginator._intl.previousPageLabel = "Trang trước";
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
  //Xuất excel
  private exportTOExcel(filename: string, sheetname: string) {
    
    let excelFileName: string;
    let hashKeyDataSource: HashTableNumber<number> = {};
    let newArray:any[]=[];
   
    //Format name of Excel will be export
    sheetname = sheetname.replace('/', '_');
    excelFileName = filename + '.xlsx';

     //Get key of current filter table in table html
     const elements = this.table.nativeElement.querySelectorAll('.cdk-column-mst');
     elements.forEach(e => {
       hashKeyDataSource[e.textContent.trim()] = 10;
     });
     let outputDataExcel = this.dataSource.data.filter( data => hashKeyDataSource[data.mst] == 10);
    
     //Alias column name
    let data = Object.values(outputDataExcel);
      Object.keys(data).forEach((key, index)=>{
        newArray.push({
          'Tên doanh nghiệp': data[key].ten_doanh_nghiep,
          'Ngành nghề': data[key].ten_nganh_nghe,
          'Địa chỉ': data[key].dia_chi_day_du,
          'Ngành nghề Kinh doanh': data[key].nganh_nghe_kd,
          'Người đại diện pháp lý': data[key].nguoi_dai_dien,
          'Điện thoại': data[key].dien_thoai,
          'Mã số thuế': data[key].mst,
          'Số GPKD': data[key].so_giay_cndkkd,
          'Ngày cấp GPKD': data[key].ngay_cap_gcndkkd,
          'Loại hình kinh doanh': data[key].loai_hinh_doanh_nghiep,
          'Vốn kinh doanh': data[key].von_kinh_doanh,
          'Ngày bắt đầu kinh doanh': data[key].ngay_bat_dau_kd,
          'Email': data[key].email,
          'Số lao động': data[key].so_lao_dong,
          'Công suất thiết kế': data[key].cong_suat_thiet_ke,
          'Sản lượng': data[key].san_luong,
          'Tiêu chuẩn sản phẩm': data[key].tieu_chuan_san_pham,
          'Doanh thu': data[key].doanh_thu,
          'Quy mô tài sản': data[key].quy_mo_tai_san,
          'Lợi nhuận': data[key].loi_nhuan,
          'Nhu cầu bán': data[key].nhu_cau_ban,
          'Nhu cầu mua': data[key].nhu_cau_mua,
          'Nhu cầu hợp tác': data[key].nhu_cau_hop_tac
        });
      });
    const ws: XLSX.WorkSheet= XLSX.utils.json_to_sheet(newArray);
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
      this.router.createUrlTree([encodeURI('#') + '/public/partner/search/' + mst]));    
    window.open(url.replace('%23','#'), "_blank");
  }
  private setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.dataSource.data.length, page);
    // get current page of items
    this.pagedItems = this.dataSource.data.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  private changeType() {
    if (this.selectedType == this.types[0]) {
      this.typeShow = 0;
      this.setPage(1);
    }
    else {
      this.typeShow = 1;
      this.ngAfterViewInit();
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Số công ty mỗi trang';
      this.paginator._intl.lastPageLabel = "Đến cuối";
      this.paginator._intl.nextPageLabel = "Trang tiếp";
      this.paginator._intl.previousPageLabel = "Trang trước";
    }
  }
  private filter() {
    // this.filterEntity.ten_doanh_nghiep = this.selectedName? this.selectedName : null;
    // this.filterEntity.dia_chi_day_du = this.selectedAddress == 'Tất cả'? null : this.selectedAddress;
    // this.filterEntity.nganh_nghe_kd = this.selectedCategory == 'Tất cả'? null : this.selectedCategory;
    // this.tempFilter.ten_nganh_nghe = (document.getElementById('selected_Career') as HTMLInputElement).value.toString();
    // this.tempFilter.ten_nganh_nghe = document.getElementById('selected_Career')
    this.filterEntity = {...this.tempFilter}
  }
  private change() {

  }
  private cancel() {
    this.tempFilter = new filterModel();
    this.filterEntity = {...filterModel};
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
