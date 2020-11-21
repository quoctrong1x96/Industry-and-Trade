import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChemicalManagementComponent } from './chemical-management/chemical-management.component';
import { ClusterManagementComponent } from './cluster-management/cluster-management.component';
import { DetailClusterManagementComponent } from './cluster-management/detail-cluster-management/detail-cluster-management.component';
import { FoodIndustryManagementComponent } from './food-industry/food-industry-management.component';
import { IndustrialExplosivesComponent } from './industrial-explosives/industrial-explosives.component';
import { LPGManagementComponent } from './lpg-management/lpg-management.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Quản lý công nghiệp',
        },
        children: [
            {
                path: 'chemical',
                component: ChemicalManagementComponent,
                data: {
                    title: 'Hóa chất',
                }
            },
            {
                path: 'lpg',
                component: LPGManagementComponent,
                data: {
                    title: 'Chiết nạp khí hóa lỏng',
                }
            },
            {
                path: 'food',
                component: FoodIndustryManagementComponent,
                data: {
                    title: 'Công nghiệp thực phẩm',
                }
            },
            {
                path: 'explosives',
                component: IndustrialExplosivesComponent,
                data: {
                    title: 'Vật liệu nổ CN',
                }
            },
            {
                path: 'cluster',
                component: ClusterManagementComponent,
                data: {
                    title: 'Quản lý Cụm Công nghiệp',
                }
            },
            {
                path: 'cluster/:id',
                component: DetailClusterManagementComponent,
                data: {
                    title: 'Cụm công nghiệp A',
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IndustryManagementRoutingModule { }
