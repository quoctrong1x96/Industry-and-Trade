//Import library
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, QueryList, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
//Import service
import { ManagerService } from '../../../_services/APIService/manager.service';
import { MarketService } from 'src/app/_services/APIService/market.service';
import { KeyboardService } from './../../../shared/services/keyboard.service';
//Import model
import { ExportMarketModel } from 'src/app/_models/APIModel/domestic-market.model';
import { SAVE } from 'src/app/_enums/save.enum';
import { ProductManagerModelList, ExportManagerModel, MODE } from '../../../_models/APIModel/manager.model';
//Import Component
import { ExportTopCompanyManager } from '../export-top-company-manager/export-top-company-manager.component';
import { ManagerDirective } from './../../../shared/manager.directive';
import { InformationService } from 'src/app/shared/information/information.service';

//Moment
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { defaultFormat as _rollupMoment, Moment } from 'moment';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: {
        dateInput: 'MM/YYYY',
    },
    display: {
        dateInput: 'MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'app-export-manager',
    templateUrl: 'export-manager.component.html',
    styleUrls: ['export-manager.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },

        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
        { provide: MAT_DATE_LOCALE, useValue: 'vi' },
    ],
})

export class ExportManagerComponent implements OnInit {

    //Declare variable for HTML&TS
    private date = new FormControl(_moment());
    private columns: number = 1;
    private timeExportManager: string;
    private displayedColumns: string[] = ['index', 'ten_san_pham', 'san_luong', 'tri_gia', 'san_luong_ct', 'tri_gia_ct', 'top_xuat_khau'];
    private products: Array<ProductManagerModelList> = new Array<ProductManagerModelList>();
    private currentRow: number = 0;
    private dataSource: MatTableDataSource<ExportManagerModel> = new MatTableDataSource<ExportManagerModel>();
    private noData: boolean = true;
    private modeQuery: MODE = MODE.INSERT;
    //Declare variable for ONLY TS    
    private rows: number = 0;
    private theYear: number = 0;
    private theMonth: number = 0;

    //ViewChild
    @ViewChildren(ManagerDirective) inputs: QueryList<ManagerDirective>
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private _managerService: ManagerService,
        private changeDetectorRefs: ChangeDetectorRef,
        private _dialog: MatDialog,
        private keyboardservice: KeyboardService,
        private _infor: InformationService,
        private _marketService: MarketService) {
    }

    ngOnInit() {
        this.timeExportManager = this.getCurrentDate();
        this.getListProduct();
        this.theYear = this.getCurrentYear();
        this.theMonth = this.getCurrentMonth();
        // this.getDomesticMarketExport(this.getCurrentMonth(), this.getCurrentYear());
        this.getDomesticMarketExport(this.theMonth, this.theYear);
        this.keyboardservice.keyBoard.subscribe(res => {
            this.move(res)
        })
    }

    //Function for Process-Flow--------------------------------------------------------------------------------------
    //Get all Data
    private getDomesticMarketExport(month: number, year: number) {
        this._marketService.GetExportedValue(month, year).subscribe(
            allrecords => {
                this.dataSource = new MatTableDataSource<ExportMarketModel>(allrecords.data);
                this.rows = this.dataSource.filteredData.length;
                if (allrecords.data.length != 0) {
                    allrecords.data.forEach(element => {
                        element.san_luong = element.san_luong || 0;
                        element.tri_gia = element.tri_gia || 0;
                        element.san_luong_ct = element.san_luong_ct || 0;
                        element.tri_gia_ct = element.tri_gia_ct || 0;
                    });
                    this.noData = false;
                    this.modeQuery = MODE.UPDATE;
                }
                else {
                    this.createDefault();
                    this.noData = true;
                    this.modeQuery = MODE.INSERT;
                }
                this.dataSource.paginator = this.paginator;
                this.paginator._intl.itemsPerPageLabel = 'Số hàng';
                this.paginator._intl.firstPageLabel = "Trang Đầu";
                this.paginator._intl.lastPageLabel = "Trang Cuối";
                this.paginator._intl.previousPageLabel = "Trang Trước";
                this.paginator._intl.nextPageLabel = "Trang Tiếp";
            }
        );
    }
    //Get Product lit
    private getListProduct(): void {
        this._managerService.GetListProduct().subscribe(
            allrecords => {
                this.products = allrecords.data as ProductManagerModelList[];
            },
        );
    }
    //EVENT "Chọn năm"
    private chosenYearHandler(normalizedYear: Moment) {
        const ctrlValue = this.date.value;
        ctrlValue.year(normalizedYear.year());
        this.date.setValue(ctrlValue);
        this.theYear = normalizedYear.year();
        return this.theYear as number
    }
    //Event "Chọn tháng"
    private chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
        const ctrlValue = this.date.value;
        ctrlValue.month(normalizedMonth.month());
        this.date.setValue(ctrlValue);
        this.theMonth = normalizedMonth.month() + 1;
        datepicker.close();
        //
        this.getDomesticMarketExport(this.theMonth, this.theYear);
        return this.theMonth as number
    }
    //Function for HTML Event  --------------------------------------------------------------------------------------
    //Event "Lọc dữ liệu"
    private applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    //Event "Key arrown"
    private move(object) {
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
    //Event "Tạo dữ liệu mặc định"
    private createDefault() {
        const HAT_DIEU: number = 1;
        const HAT_TIEU: number = 3;
        const CAO_SU: number = 4;
        const CA_PHE: number = 5;
        const SAN_PHAM_KHAC: number = 23;
        // if (this.dataSource.data.length > 0)
        //     if (!confirm("Nếu bạn tạo mặc định sẽ xóa dữ liệu hiện tại! Bạn tiếp tục không?"))
        //         return;
        this.dataSource = new MatTableDataSource<ExportManagerModel>();;
        this.addRow();
        this.addRow();
        this.addRow();
        this.addRow();
        this.addRow();
        this.dataSource.data[0].ten_san_pham = this.products.filter(x => x.ma_san_pham == HAT_DIEU)[0].ten_san_pham;
        this.dataSource.data[1].ten_san_pham = this.products.filter(x => x.ma_san_pham == HAT_TIEU)[0].ten_san_pham;
        this.dataSource.data[2].ten_san_pham = this.products.filter(x => x.ma_san_pham == CAO_SU)[0].ten_san_pham;
        this.dataSource.data[3].ten_san_pham = this.products.filter(x => x.ma_san_pham == CA_PHE)[0].ten_san_pham;
        this.dataSource.data[4].ten_san_pham = this.products.filter(x => x.ma_san_pham == SAN_PHAM_KHAC)[0].ten_san_pham;
        this.dataSource.data[0].id_san_pham = this.products.filter(x => x.ma_san_pham == HAT_DIEU)[0].ma_san_pham;
        this.dataSource.data[1].id_san_pham = this.products.filter(x => x.ma_san_pham == HAT_TIEU)[0].ma_san_pham;
        this.dataSource.data[2].id_san_pham = this.products.filter(x => x.ma_san_pham == CAO_SU)[0].ma_san_pham;
        this.dataSource.data[3].id_san_pham = this.products.filter(x => x.ma_san_pham == CA_PHE)[0].ma_san_pham;
        this.dataSource.data[4].id_san_pham = this.products.filter(x => x.ma_san_pham == SAN_PHAM_KHAC)[0].ma_san_pham;
        this.rows = this.dataSource.filteredData.length;
    }
    //Event for "Thêm dòng"
    private addRow() {
        let newRow: ExportManagerModel = new ExportManagerModel();
        newRow.san_luong;
        newRow.tri_gia;
        newRow.don_vi_tinh = "";
        newRow.san_luong_ct;
        newRow.tri_gia_ct;
        newRow.thang = this.getCurrentMonth();
        newRow.nam = this.getCurrentYear();
        this.dataSource.data.push(newRow);
        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Số hàng';
        this.paginator._intl.firstPageLabel = "Trang Đầu";
        this.paginator._intl.lastPageLabel = "Trang Cuối";
        this.paginator._intl.previousPageLabel = "Trang Trước";
        this.paginator._intl.nextPageLabel = "Trang Tiếp";
        this.rows = this.dataSource.filteredData.length;
    }
    //Event for "Xóa dòng"
    deleteRow() {
        this.dataSource.data.splice(this.currentRow, 1);
        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.rows = this.dataSource.filteredData.length;
    }
    //Event for "Chen dòng"
    insertRow() {
        let data = this.dataSource.data.slice(this.currentRow);
        this.dataSource.data.splice(this.currentRow, this.dataSource.data.length - this.currentRow + 1);
        let newRow: ExportManagerModel = new ExportManagerModel();
        newRow.san_luong;
        newRow.tri_gia;
        newRow.don_vi_tinh = "";
        newRow.san_luong_ct;
        newRow.tri_gia_ct;
        newRow.thang = this.getCurrentMonth();
        newRow.nam = this.getCurrentYear();
        this.dataSource.data.push(newRow);
        data.forEach(element => {
            this.dataSource.data.push(element);
        });
        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.rows = this.dataSource.filteredData.length;
    }
    //Event for "Change row"
    private changeRow(index: number) {
        this.currentRow = index;
    }
    private changeProduct(element: any) {
        element.ten_san_pham = this.products.filter(x => x.ma_san_pham == element.id_san_pham)[0].ten_san_pham;
        element.thang = this.getCurrentMonth();
        element.nam = this.getCurrentYear();
    }
    //Event for "Top doanh nghiệp xuất khẩu"
    private openDialogSelectCompany(data: any) {
        const dialogRef = this._dialog.open(ExportTopCompanyManager, {
            data: {
                message: 'Nhập dữ liệu top doanh nghiệp xuất khẩu',
                buttonText: {
                    ok: 'Lưu',
                    cancel: 'Hủy bỏ'
                },
                product: data,
                typeOfSave: SAVE.EXPORT,
            }
        });

        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
            }
        });
    }
    //Event for "Lưu"
    private save() {
        let month = this.getCurrentMonth();
        let year = this.getCurrentYear();
        // console.log(this.dataSource.data);
        // let data: ExportManagerModel[] = this.dataSource.data.filter(x => x.id == 0);
        // console.log(data);
        this._managerService.PostExportManager(month, year, this.dataSource.data).subscribe(
            next => {
                console.log(next);
                if (next.id == -1) {
                    this._infor.msgError("Lưu lỗi! Lý do: " + next.message);
                }
                else {
                    this.modeQuery = MODE.UPDATE;
                    this._infor.msgSuccess("Dữ liệu được lưu thành công!");
                }
            },
            error => {
                this._infor.msgError("Không thể thực thi! Lý do: " + error.message);
            }
        );
    }
    //Function for Extention   --------------------------------------------------------------------------------------
    private getMonthAndYear(time: string) {
        let year = time.substr(0, 4);
        let month = time.substr(4, 2);
        let day = time.substr(6, 2);
        let result = month + "/" + year;
        return result as string;
    }

    private getCurrentDate() {
        let date = new Date;
        return this.getMonthAndYear(date.toISOString().replace('-', '').replace('-', ''));
    }

    private getCurrentMonth() {
        let date = new Date();
        return date.getMonth() + 1;
    }

    private getCurrentYear() {
        let date = new Date();
        return date.getFullYear();
    }
}
