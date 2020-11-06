//import Library ---------------------------------------------------------------------
import { Component, OnInit, Input, HostListener, Output } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
//Import Service---------------------------------------------------------------------
import { LoginAuthGuardService } from 'src/app/_authGuard/LoginAuthGuardService';
import { LoginService } from '../../_services/APIService/login.service';
import { EventService } from '../services/evenet.service';
//Import Model---------------------------------------------------------------------
import { TYPE_OF_NAV } from '../../_enums/typeOfUser.enum';
import { NGB_TIMEPICKER_I18N_FACTORY } from '@ng-bootstrap/ng-bootstrap/timepicker/timepicker-i18n';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  //Constant---------------------------------------------------------------------
  private readonly AVATAR_DEFAULT: string = "../../../assets/img/avatars/1.jpg";
  private readonly USERNAME_DEFAULT: string = "Tên người dùng";
  private readonly NOTIFICATION_DEFAULT: number = 0;
  private readonly COLOR_USER_DEFUALT: string = "#ffc107";
  //Variable for HTML & TS---------------------------------------------------------------------
  private img_avatar: string = this.AVATAR_DEFAULT;
  private userName: string = this.USERNAME_DEFAULT;
  private notificatios: number = this.NOTIFICATION_DEFAULT;
  private expression: boolean = true;
  private colorOfUser: string = this.COLOR_USER_DEFUALT;
  //Variable for only TS---------------------------------------------------------------------

  //Input & Viewchild---------------------------------------------------------------------
  @Input() open: boolean = this._eventService.open;
  @Input('typeOfUser') typeOfUser: TYPE_OF_NAV;
  @Input() sidebar: MatSidenav;
  //Contructor & Oninit---------------------------------------------------------------------
  constructor(
    private _loginAuthService: LoginAuthGuardService,
    private _loginService: LoginService,
    private _router: Router,
    private _eventService: EventService
  ) { }
  ngOnInit() {
    this.open = this._eventService.open;
    this.expression = this.typeOfUser == TYPE_OF_NAV.SPECICALIZED ? true : false;
    this.colorOfUser = this._getColorOfUser(this.typeOfUser);
  }
  ngAfterViewChecked(): void {

  }
  //Functin for HTML event---------------------------------------------------------------------
  //Login
  private loginClick() {
    this._router.navigate(['login'], { queryParams: { returnUrl: this._router.url } });
  }
  private checkLogin() {
    if (localStorage.getItem('currentUser')) {
      let data: any = JSON.parse(localStorage.getItem('currentUser'));
      this.userName = data.full_name;
      return true;
    }
    else return
    false;
  }
  private openAccountDropdown() {
    this._eventService.setvalue(!this.open);
    this.open = this._eventService.getValue();
  }
  private openForm() {
    this._router.navigate(['/update_user']);
    this._eventService.setvalue(false);
    this.open = this._eventService.getValue();
  }
  private openDataSCTModule() {
    this._router.navigate(['/sct/report/view-all']);
    this._eventService.setvalue(false);
    this.open = this._eventService.getValue();
  }

  private openHome() {
    this._router.navigate(['/specialized/commecial-management/domestic']);
    this._eventService.setvalue(false);
    this.open = this._eventService.getValue();
  }

  private openDropdown() {
    document.getElementById('account-dropdown').setAttribute('style', 'display: block');
  }

  private closeDropdown() {
    document.getElementById('account-dropdown').setAttribute('style', 'display: none');
  }

  private logout(){
    this._router.navigate(['/logout']);
  }
  //Function in TS---------------------------------------------------------------------
  private _getColorOfUser(type: number): string {
    let resultColor: string = "";
    switch (type) {
      case TYPE_OF_NAV.NONE:
        resultColor = this.COLOR_USER_DEFUALT;
        break;
      case TYPE_OF_NAV.MANAGER:
        resultColor = "#52e0eb";
        break;
      case TYPE_OF_NAV.PUBLIC:
        resultColor = "#379c08";
        break;
      case TYPE_OF_NAV.SPECICALIZED:
        resultColor = "#bd2bb3";
        break;
      default:
        resultColor = this.COLOR_USER_DEFUALT;
        break;
    }
    return resultColor;
  }
}
