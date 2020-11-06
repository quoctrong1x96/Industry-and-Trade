import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../_services/sidebar.service';
import { onMainContentChange } from 'src/app/_animations/animation-sidebar';

@Component({
  selector: 'app-specialized-layout',
  templateUrl: './specialized-layout.component.html',
  styleUrls: ['./specialized-layout.component.scss'],
  animations: [ onMainContentChange ]
})
export class SpecializedLayoutComponent {

  name = 'Angular';
  public onSideNavChange: boolean;

  constructor(private _sidenavService: SidebarService) {
    this._sidenavService.sideBarState$.subscribe( res => {
      //console.log(res)
      this.onSideNavChange = res;
    })
  }

}
