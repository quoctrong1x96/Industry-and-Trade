import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountrysideElectricComponent } from './countryside-electric/countryside-electric.component';
import { UseFocusedEnergyComponent } from './use-focused-energy/use-focused-energy.component';
import { CommonEnergyComponent } from './common-energy/common-energy.component';
import { ElectricManagementComponent } from './electric-management/electric-management.component';

const routes: Routes = [
  
  {
    path: '',
    data:{
      title: 'Quản lý năng lượng'
    },
    children:[
      {
        path: 'common',
        data: {
          title: 'Quản lý năng lượng'
        },
        component: CommonEnergyComponent,
      },
      {
        path: 'hydroelectric',
        data: {
          title: 'Năng lượng',
        },
        component: ElectricManagementComponent
      },
      {
        path: 'countryside_electric',
        data: {
          title: 'Phát triển điện',
        },
        component: CountrysideElectricComponent
      },
      {
        path: 'focused_energy',
        data: {
          title: 'Tiết kiệm năng lượng',
        },
        component: UseFocusedEnergyComponent
      },
    
    ],
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EneryManagementRoutingModule { }
