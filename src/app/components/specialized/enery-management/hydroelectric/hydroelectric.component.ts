import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material';

@Component({
  selector: 'app-hydroelectric',
  templateUrl: './hydroelectric.component.html',
  styles: []
})
export class HydroelectricComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild(MatAccordion,{ static: true }) accordion: MatAccordion;
}
