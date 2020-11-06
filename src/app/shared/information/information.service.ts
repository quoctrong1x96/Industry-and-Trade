import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { InformationComponent } from './information.component';

@Injectable()
export class InformationService {
  private readonly DURING_SECOND = 2;
  private readonly PANEL_SUCCESS ="success";
  private readonly PANEL_WARNING ="warning";
  private readonly PANEL_ERROR = "error";
  message: string;

  constructor(private _snackBar: MatSnackBar) {
  }

  private openSnackBar(message: string, panelClass: string) {
    this.message = message;
    const snackBar = this._snackBar.openFromComponent(InformationComponent, {
      duration: this.DURING_SECOND * 1000,
      panelClass:[panelClass]
    });
    snackBar.instance.message = message;
  }

  public msgSuccess(message){
    this.openSnackBar(message,this.PANEL_SUCCESS);
  }

  public msgWaring(message){
    this.openSnackBar(message,this.PANEL_WARNING);
  }

  public msgError(message){
    this.openSnackBar(message,this.PANEL_ERROR);
  }
}
