import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HydroelectricComponent } from './hydroelectric/hydroelectric.component';
import { CountrysideElectricComponent } from './countryside-electric/countryside-electric.component';
import { UseFocusedEnergyComponent } from './use-focused-energy/use-focused-energy.component';
import { CommonEnergyComponent } from './common-energy/common-energy.component';

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
          title: 'Năng lượng - Thủy điện',
        },
        component: HydroelectricComponent
      },
      {
        path: 'countryside_electric',
        data: {
          title: 'Điện nông thôn',
        },
        component: CountrysideElectricComponent
      },
      {
        path: 'focused_energy',
        data: {
          title: 'Cơ sở sử dụng năng lượng trọng điểm',
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
