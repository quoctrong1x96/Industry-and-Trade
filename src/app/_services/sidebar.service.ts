import { Injectable } from '@angular/core';
import { Component } from '@angular/Core';
import { Observable, throwError, Subject } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { INavItem } from '../_models/_nav.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SidebarService {
  public data: any;
  token: any;
  username: any;
  public apisidebar = environment.apiEndpoint + "api/dang-nhap/tai-giao-dien/1"


  // With this subject you can save the sidenav state and consumed later into other pages.
  public sideBarState$: Subject<boolean> = new Subject();

  constructor(public http: HttpClient) {
    console.log("MarketService Contraction");
    // this.data = JSON.parse(localStorage.getItem('NormalUser'));
    // this.token = this.data.token;
  }

  public GetMenu() {
    var apiUrl = this.apisidebar;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this.http.get<any>(apiUrl, { headers: headers }).pipe(tap(data => data),
      catchError(this.handleError)
    );
  }

  public handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Lỗi: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Mã lỗi: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}