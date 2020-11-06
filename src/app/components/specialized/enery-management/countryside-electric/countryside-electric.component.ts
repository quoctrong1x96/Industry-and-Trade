import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material';

@Component({
  selector: 'app-countryside-electric',
  templateUrl: './countryside-electric.component.html',
  styles: []
})
export class CountrysideElectricComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild(MatAccordion,{ static: true }) accordion: MatAccordion;
}
