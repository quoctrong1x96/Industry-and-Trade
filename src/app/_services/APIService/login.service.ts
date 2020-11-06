import { Injectable } from '@angular/core';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs'
import { catchError, tap, map } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { UserModel } from '../../_models/APIModel/user.model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { RegisterModel } from '../../_models/APIModel/register.model';
import { user_model } from 'src/app/_models/user.model';
import { error } from 'protractor';

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    private readonly LOCALSTORAGE_USER: string = "currentUser";
    private readonly HOME_PAGE: string = "/dashboard";
    private loggedUser: string;

    public token: string;
    private userSubject: BehaviorSubject<UserModel>;
    public user: Observable<UserModel>;
    private refreshTokenTimeout;


    private apiUrl = environment.apiEndpoint + "api/dang-nhap/";
    private apiRegister = environment.apiEndpoint + "api/dang-ky";
    private apiGetUserInfor = environment.apiEndpoint + "api/tai-khoan";
    private apiUpdateUser = environment.apiEndpoint + "api/tai-khoan";
    private apiLogout = environment.apiEndpoint + "api/dang-xuat";
    private apiRefreshToken = environment.apiEndpoint + "api/cap-lai-token";// "api/cap-lai-token";

    /**
     * 
     * @param _http 
     * @param router 
     */
    constructor(private _http: HttpClient, private router: Router,) {
        this.userSubject = new BehaviorSubject<UserModel>(null);
        this.user = this.userSubject.asObservable();
    }

    /**
     * Get current User
     */
    public get userValue(): UserModel {
        if (!this.userSubject.value) {
            return this.getUserFromStorage();
        }
        return this.userSubject.value;
    }

    private getUserFromStorage(): UserModel {
        let user: UserModel = new UserModel();
        if (localStorage.getItem(this.LOCALSTORAGE_USER)) {
            let data = JSON.parse(localStorage.getItem(this.LOCALSTORAGE_USER));
            user.user_id = data.user_id;
            user.user_role = data.role;
            user.org_id = data.org_id;
            user.user_name = data.user_name;
            user.token = data.token;
            user.full_name = data.full_name;
            if (data.refresh_token != null) {
                user.refresh_token = data.refresh_token;
            }
            if (data.user_id != null) {
                user.imageUrl = data.user_id.toString();
            }
        }
        return user;
    }

    /**
     * 
     * @param loginmodel 
     */
    public validateLoginUser(loginmodel: UserModel, isBusiness) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let params = new HttpParams();
        params = params.append('isBusiness', isBusiness);
        return this._http.post<any>(this.apiUrl, loginmodel, { headers: headers, params: params })
            .pipe(tap(response => {
                if (response.data != null) {
                    if (response.data.token != null) {
                        let user = this.createUserFromRes(response.data);
                        this.updateUserToLocalstorage(user)
                        this.userSubject.next(user);
                        //this.startRefreshTokenTimer();
                        // return true to indicate successful login
                        return response;
                    }
                    else {
                        // return false to indicate failed login
                        return null;
                    }
                }
                else {
                    // return false to indicate failed login
                    return null;
                }
            }),
                catchError(this.handleError)
            );
    }

    public isLoggedIn() {
        return !!this.getJwtToken();
    }

    public getJwtToken() {
        return localStorage.getItem(this.LOCALSTORAGE_USER);
    }

    /**
     * Private
     * Map UserModel from response
     * @param response response from API Login server
     */
    private createUserFromRes(data: any): UserModel {
        let user: UserModel = new UserModel();
        user.user_id = data.user_id;
        user.user_role = data.user_role;
        user.org_id = data.org_id;
        user.user_name = data.user_name;
        user.token = data.token;
        user.full_name = data.full_name;
        if (data.refresh_token != null) {
            user.refresh_token = data.refresh_token.token;
        }
        if (data.user_id != null) {
            user.imageUrl = data.user_id.toString();
        }
        return user;
    }

    /**
     * Private
     * Write user infomation to localstored with title LOCALSTORAGE_USER
     */
    private updateUserToLocalstorage(user: UserModel): void {
        localStorage.setItem(this.LOCALSTORAGE_USER,
            JSON.stringify({
                token: user.token,
                role: user.user_role,
                user_id: user.user_id,
                user_name: user.user_name,
                org_id: user.org_id,
                full_name: user.full_name,
                refresh_token: user.refresh_token,
            }));
    }

    /**
     * Try register new user of bussiness. This account must be accept of SCT
     * @param registerModel User model from caller
     */
    public register(registerModel: RegisterModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.post<any>(
            this.apiRegister,
            registerModel,
            { headers: headers, observe: 'response' })
            .pipe(catchError(this.handleError));
    }

    /**
     * Logout
     */
    public LogoutUser(): void {
        console.log("+ LogoutUser()");
        localStorage.removeItem(this.LOCALSTORAGE_USER);
        //this._http.post<any>(this.apiLogout, {}, { withCredentials: true }).subscribe(); //Wait for API
        //this.stopRefreshTokenTimer();
        this.userSubject.next(null);
        //this.router.navigate([this.HOME_PAGE]);
    }

    /**
     * Get information of user from server
     * @param userName User name
     * @param token access token type JWT
     */
    public getUser(userName, token): any {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
        let params = new HttpParams();
        params = params.append('isBusiness', userName.includes('admin') ? 'false' : 'true');
        console.log(params);
        let url = `${this.apiGetUserInfor}/${userName}`;
        try {
            return this._http.get<any>(url, { headers: headers, params: params });
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * 
     * @param body 
     * @param token 
     */
    public updateUser(body, token) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
        let params = new HttpParams();
        params = params.append('isBusiness', body['user_name'] === 'admin' ? 'false' : 'true');
        let url = `${this.apiGetUserInfor}/${body['user_name']}`
        return this._http.post(url, body, { headers: headers, params: params });
    }

    /**
     * request server provider new access token from refreshtoken
     */
    public refreshToken() {
        let api = this.apiRefreshToken
        let data = { 'refresh_token': this.userValue.refresh_token, 'isBusiness': false };
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.userValue.token });
        return this._http.post<any>(api, data, { headers: headers })//withCredentials: true
            .pipe(tap((response) => {
                if (response)
                {
                //Kiểm tra response chỗ này, xem refresh có hết hạn luôn không. Nếu có thì báo hết hạn rồi logout.
                let user = this.createUserFromRes(response.data);
                this.userSubject.next(user);
                this.updateUserToLocalstorage(user)
                //this.startRefreshTokenTimer();
                return response;}
                else{
                    return throwError;
                }
            }));
    }

    /**
     * 
     */
    // private startRefreshTokenTimer() {
    //     // parse json object from base64 encoded jwt token
    //     const jwtToken = JSON.parse(atob(this.userValue.token.split('.')[1]));

    //     // set a timeout to refresh the token a minute before it expires
    //     const expires = new Date(jwtToken.exp * 1000);
    //     const timeout = expires.getTime() - Date.now() - (60 * 1000);
    //     this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    // }

    /**
     * 
     */
    private stopRefreshTokenTimer(): void {
        clearTimeout(this.refreshTokenTimeout);
    }

    /**
     * 
     * @param error 
     */
    private handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Lỗi: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Mã lỗi: ${error.status}\nMessage: ${error.error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}
