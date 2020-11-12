import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EneryManagementRoutingModule } from './enery-management.routing';
import { HydroelectricComponent } from './hydroelectric/hydroelectric.component';
import { CountrysideElectricComponent } from './countryside-electric/countryside-electric.component';
import { UseFocusedEnergyComponent } from './use-focused-energy/use-focused-energy.component';
import { CommonEnergyComponent } from './common-energy/common-energy.component'
import { ElectricManagementComponent } from './electric-management/electric-management.component';
import {SolarEneryManagementComponent} from './solar-enery-management/solor-enery-management.component'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,    
    EneryManagementRoutingModule,
  ],
  exports: [
  ],
  declarations: [
    HydroelectricComponent,
    CountrysideElectricComponent,
    ElectricManagementComponent,
    SolarEneryManagementComponent,
    UseFocusedEnergyComponent,
    CommonEnergyComponent,
],
  entryComponents: []
})
export class EneryManagementModule { }
