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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    CommecialManagementRoutingModule,
    PipeModule
  ],
  exports: [
  ],
  declarations: [
    MarketCommecialManagementComponent,
    CommonCommecialComponent,
    TobaccoBusinessComponent,
    ConditionalBusinessLineComponent,
    SuperMarketCommecialManagementComponent,
    CommonCommecialComponent,
    LiquorBusinessComponent,
    StoreManagementComponent,
    FoodManagementComponent,
    PetrolBusinessComponent,
    InformedEcommerceWebsiteComponent,
    RegistrationEcommerceServicesComponent,
    ShoppingcentreComponent,
    LPGBusinessComponent,
    TRSManagementComponent],
  entryComponents: []
})
export class CommecialManagementModule { }
