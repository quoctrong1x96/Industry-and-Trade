import { Component } from '@angular/Core';
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { DomesticMarketModel, CompanyDetailModel, ForeignMarketModel } from "../../_models/APIModel/domestic-market.model";
import { ExportMarketModel, ImportMarketModel, ProductValueModel, TopExportModel, TopImportModel, TopProductModel } from "../../_models/APIModel/domestic-market.model";
// import { environment } from "src/app/Shared/environment";
import { environment } from '../../../environments/environment';
import { error } from 'protractor';
import { LoginService } from './login.service';

@Injectable({
    providedIn: 'root'
})

export class SCTService {
    // declare variable
    private data: any;
    private apiSCT = environment.apiEndpoint + "api/sct";
    private urlDanhSachBuonBanThuocLa = "/danh-sach-buon-ban-thuoc-la";
    private urlDanhSachBanLeXangDau = "/danh-sach-buon-le-xang-dau";
    private urlDanhSachBuonBanRuou = "/danh-sach-buon-ban-ruou";
    private urlDanhSachBuonBanLPG = "/danh-sach-buon-ban-lpg";
    private urlDanhSachQuanLyHoaChat = "/danh-sach-quan-ly-hoa-chat";
    private urlDanhSachQuanLyChietNapLPG = "/danh-sach-quan-ly-chiet-nap-lpg";
    private urlDanhSachQuanLyCongNghiepThucPham = "/danh-sach-quan-ly-cong-nghiep-thuc-pham";
    private urlDanhSachQuanLyVatLieuNoCongNghiep = "/danh-sach-quan-ly-vat-lieu-no-cong-nghiep";
    private urlDanhSachQuanLyCumCongNghiep = "/danh-sach-quan-ly-cum-cong-nghiep";
    private urlDanhSachNhapKhau = "/danh-sach-nhap-khau";
    private urlDanhSachXuatKhau = "/danh-sach-xuat-khau";
    token: any;
    username: any;

    constructor(private http: HttpClient, private logOutService: LoginService) {
        // console.log("ReportService Contraction");
        this.data = JSON.parse(localStorage.getItem('currentUser'));
        this.token = this.data.token;
    }

    public GetDanhSachBuonBanThuocLa(time_id: number) {
        var apiUrl = this.apiSCT + this.urlDanhSachBuonBanThuocLa;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let params = new HttpParams().set('time_id', time_id.toString());
        console.log(params);
        return this.http.get<any>(apiUrl, { headers: headers, params: params }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public GetDanhSachBanLeXangDau(time_id: number) {
        var apiUrl = this.apiSCT + this.urlDanhSachBanLeXangDau;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let params = new HttpParams().set('time_id', time_id.toString());
        console.log(params);
        return this.http.get<any>(apiUrl, { headers: headers, params: params }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public GetDanhSachBuonBanRuou(time_id: number) {
        var apiUrl = this.apiSCT + this.urlDanhSachBuonBanRuou;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let params = new HttpParams().set('time_id', time_id.toString());
        console.log(params);
        return this.http.get<any>(apiUrl, { headers: headers, params: params }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public GetDanhSachBuonBanLPG(time_id: number) {
        var apiUrl = this.apiSCT + this.urlDanhSachBuonBanLPG;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let params = new HttpParams().set('time_id', time_id.toString());
        console.log(params);
        return this.http.get<any>(apiUrl, { headers: headers, params: params }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    
    public GetDanhSachQuanLyHoaChat(time_id: number) {
        var apiUrl = this.apiSCT + this.urlDanhSachQuanLyHoaChat;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let params = new HttpParams().set('time_id', time_id.toString());
        console.log(params);
        return this.http.get<any>(apiUrl, { headers: headers, params: params }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    
    public GetDanhSachQuanLyChietNapLPG(time_id: number) {
        var apiUrl = this.apiSCT + this.urlDanhSachQuanLyChietNapLPG;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let params = new HttpParams().set('time_id', time_id.toString());
        console.log(params);
        return this.http.get<any>(apiUrl, { headers: headers, params: params }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    
    public GetDanhSachQuanLyCongNghiepThucPham(time_id: number) {
        var apiUrl = this.apiSCT + this.urlDanhSachQuanLyCongNghiepThucPham;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let params = new HttpParams().set('time_id', time_id.toString());
        console.log(params);
        return this.http.get<any>(apiUrl, { headers: headers, params: params }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    
    public GetDanhSachQuanLyVatLieuNoCongNghiep(time_id: number) {
        var apiUrl = this.apiSCT + this.urlDanhSachQuanLyVatLieuNoCongNghiep;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let params = new HttpParams().set('time_id', time_id.toString());
        console.log(params);
        return this.http.get<any>(apiUrl, { headers: headers, params: params }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    
    public GetDanhSachQuanLyCumCongNghiep(time_id: number) {
        var apiUrl = this.apiSCT + this.urlDanhSachQuanLyCumCongNghiep;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let params = new HttpParams().set('time_id', time_id.toString());
        console.log(params);
        return this.http.get<any>(apiUrl, { headers: headers, params: params }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public GetDanhSachNhapKhau(time_id: number) {
        var apiUrl = this.apiSCT + this.urlDanhSachNhapKhau;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let params = new HttpParams().set('time_id', time_id.toString());
        console.log(params);
        return this.http.get<any>(apiUrl, { headers: headers, params: params }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public GetDanhSachXuatKhau(time_id: number) {
        var apiUrl = this.apiSCT + this.urlDanhSachXuatKhau;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let params = new HttpParams().set('time_id', time_id.toString());
        console.log(params);
        return this.http.get<any>(apiUrl, { headers: headers, params: params }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        console.log(error);
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Lỗi: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Mã lỗi: ${error.status}\nMessage: ${error.error.message}`;
        }
        return throwError(errorMessage);
    }
}
