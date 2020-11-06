import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material';

@Component({
  selector: 'app-use-focused-energy',
  templateUrl: './use-focused-energy.component.html',
  styles: []
})
export class UseFocusedEnergyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild(MatAccordion,{ static: true }) accordion: MatAccordion;

}
