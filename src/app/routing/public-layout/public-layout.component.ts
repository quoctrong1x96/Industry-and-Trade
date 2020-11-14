import { Component, OnInit, HostListener } from '@angular/core';
import { onMainContentChange } from 'src/app/_animations/animation-sidebar';
import { MODULE_CONTROL } from 'src/app/_enums/module-control.enum';
import { SidebarService } from 'src/app/_services/sidebar.service';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styles: ['public-layout.component.scss'],
  animations:[onMainContentChange]
})
export class PublicLayoutComponent  implements OnInit {
  public readonly MODULE01: MODULE_CONTROL = MODULE_CONTROL.MODULE01;
  public onSideNavChange: boolean;
   constructor(public _sidenavService: SidebarService) {
    this._sidenavService.sideBarState$.subscribe( res => {
      //console.log(res)
      this.onSideNavChange = res;
    })
  }

  ngOnInit() {
  }

  numberOfClicks = 0;

  @HostListener('click', ['$event.target'])
  onClick(btn) {
    // console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
 }

}