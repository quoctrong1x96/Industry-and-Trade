import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material';
import { LinkModel } from 'src/app/_models/link.model';
import { BreadCrumService } from 'src/app/_services/injectable-service/breadcrums.service';

@Component({
  selector: 'app-countryside-electric',
  templateUrl: './countryside-electric.component.html',
  styles: []
})
export class CountrysideElectricComponent implements OnInit {
  //Variable for only ts
  private _linkOutput: LinkModel = new LinkModel();
  constructor(private _breadCrumService: BreadCrumService) { }

  ngOnInit() {
    this._linkOutput.link = "/specialized/enery-management/countryside_electric";
    this._linkOutput.title = "Phát triển điện - Oninit";
    this._linkOutput.text = "Phát triển điện";
    this._breadCrumService.sendLink(this._linkOutput);
  }

  @ViewChild(MatAccordion,{ static: true }) accordion: MatAccordion;
}
