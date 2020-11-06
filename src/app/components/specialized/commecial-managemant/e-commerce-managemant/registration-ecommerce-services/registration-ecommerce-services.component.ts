import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { registration_management } from "../../../../../_models/APIModel/ecommerce.model";
@Component({
  selector: 'app-registration-ecommerce-services',
  templateUrl: './registration-ecommerce-services.component.html',
  styles: []
})
export class RegistrationEcommerceServicesComponent implements OnInit {

  filteredDataSource: MatTableDataSource<registration_management> = new MatTableDataSource<registration_management>();
  dataSource: MatTableDataSource<registration_management> = new MatTableDataSource<registration_management>();
  constructor() { }

  ngOnInit() {
  }


  applyDistrictFilter(event) {
    let filteredData = [];
    event.value.forEach(element => {
        this.dataSource.data.filter(x => x.id_quan_huyen == element).forEach(x => filteredData.push(x));
    });
    
    if (!filteredData.length) {
        if (event.value.length)
            this.filteredDataSource.data = [];
        else
            this.filteredDataSource.data = this.dataSource.data;
    }
    else {
        this.filteredDataSource.data = filteredData;
    }
    // this.sanLuongBanRa = this.filteredDataSource.data.length ? this.filteredDataSource.data.map(x => x.san_luong).reduce((a, b) => a + b) : 0;
  }
}
