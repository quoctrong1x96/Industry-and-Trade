import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ChemicalManagementComponent } from './chemical-management/chemical-management.component';
import { ClusterManagementComponent } from './cluster-management/cluster-management.component';
import { FoodIndustryManagementComponent } from './food-industry/food-industry-management.component';
import { IndustrialExplosivesComponent } from './industrial-explosives/industrial-explosives.component';
import { IndustryManagementRoutingModule } from './industry-management.routing';
import { LPGManagementComponent } from './lpg-management/lpg-management.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        IndustryManagementRoutingModule,
      ],
      exports: [
      ],
      declarations: [
        ChemicalManagementComponent,
        LPGManagementComponent,
        FoodIndustryManagementComponent,
        IndustrialExplosivesComponent,
        ClusterManagementComponent
      ],
      entryComponents: []
})

export class IndustryManagement{

}