import { Component, OnInit, HostListener } from '@angular/core';
import { onMainContentChange } from 'src/app/_animations/animation-sidebar';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styles: ['public-layout.component.scss'],
  animations:[onMainContentChange]
})
export class PublicLayoutComponent  implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  numberOfClicks = 0;

  @HostListener('click', ['$event.target'])
  onClick(btn) {
    // console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
 }

}