import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountrysideElectricComponent } from './countryside-electric/countryside-electric.component';
import { UseFocusedEnergyComponent } from './use-focused-energy/use-focused-energy.component';
import { CommonEnergyComponent } from './common-energy/common-energy.component';
import { ElectricManagementComponent } from './electric-management/electric-management.component';
import { ElectricalPlanComponent } from './electrical-plan/electrical-plan.component';
import { BlockElectricComponent } from './block-electric/block-electric.component';
import { ManageApproveHddlComponent } from './manage-approve-hddl/manage-approve-hddl.component';
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
      {
        path: 'electrical_plan',
        data: {
          title: 'QH lưới điện 110 trở lên',
        },
        component: ElectricalPlanComponent
      },
      {
        path: 'block_electric',
        data: {
          title: 'Điện sinh khối',
        },
        component: BlockElectricComponent
      },
      {
        path: 'manage_aprove_hddl',
        data: {
          title: 'Điện sinh khối',
        },
        component: ManageApproveHddlComponent
      },
    ],
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EneryManagementRoutingModule { }
