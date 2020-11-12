import { CommonModule, formatNumber } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommecialManagementRoutingModule } from './commecial-management.routing';
import { MarketCommecialManagementComponent } from './infrastructure/market/market-commecial.component';
import { CommonCommecialComponent } from './infrastructure/common/common-commecial.component';
import { TobaccoBusinessComponent } from './conditional-business-line/tobacco-business/tobacco-business.component';
import { ConditionalBusinessLineComponent } from './conditional-business-line/conditional-business-line.component';
import { SuperMarketCommecialManagementComponent } from './infrastructure/supermarket/supermarket-commecial.component';
import { LiquorBusinessComponent } from './conditional-business-line/liquor-business/liquor-business.component';
import { StoreManagementComponent } from './infrastructure/stores/stores-commecial.component';
import { FoodManagementComponent } from './infrastructure/food/food-commecial.component';
import { PetrolBusinessComponent } from './conditional-business-line/petro-business/petrol-business.component';
import { LPGBusinessComponent } from './conditional-business-line/lpg-business/lpg-business.component';
import { InformedEcommerceWebsiteComponent } from './e-commerce-managemant/informed-ecommerce-website/informed-ecommerce-website.component';
import { RegistrationEcommerceServicesComponent } from './e-commerce-managemant/registration-ecommerce-services/registration-ecommerce-services.component';
import { PipeModule } from 'src/app/shared/pipe.module';
import { ShoppingcentreComponent } from './infrastructure/shoppingcentre/shoppingcentre.component';
import { TRSManagementComponent } from './infrastructure/total-retail-sales/total-retail-sales.component';
import { ImportManagementComponent } from './export-import-management/import-management/import-management.component';
import { ExportManagementComponent } from './export-import-management/export-management/export-management.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './export-import-management/dialog-import-export/modal.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { TranslatePipe } from 'src/app/_pipe/translate';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    CommecialManagementRoutingModule,
    PipeModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  exports: [
    // FormatNumberReportPipe, 
    TranslatePipe,
    MatPaginatorModule

  ],
  declarations: [
    MarketCommecialManagementComponent,
    TranslatePipe,
    CommonCommecialComponent,
    TobaccoBusinessComponent,
    ConditionalBusinessLineComponent,
    SuperMarketCommecialManagementComponent,
    CommonCommecialComponent,
    LiquorBusinessComponent,
    StoreManagementComponent,
    FoodManagementComponent,
    ImportManagementComponent,
    PetrolBusinessComponent,
    InformedEcommerceWebsiteComponent,
    RegistrationEcommerceServicesComponent,
    ShoppingcentreComponent,
    LPGBusinessComponent,
    ExportManagementComponent,
    ModalComponent,
    TRSManagementComponent],
  entryComponents: [
    ModalComponent
  ],
})
export class CommecialManagementModule { }
