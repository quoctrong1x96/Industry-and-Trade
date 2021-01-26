"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CommecialManagementModule = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_module_1 = require("../../../material.module");
var forms_2 = require("@angular/forms");
var commecial_management_routing_1 = require("./commecial-management.routing");
var market_commecial_component_1 = require("./infrastructure/market/market-commecial.component");
var common_commecial_component_1 = require("./infrastructure/common/common-commecial.component");
var tobacco_business_component_1 = require("./conditional-business-line/tobacco-business/tobacco-business.component");
var conditional_business_line_component_1 = require("./conditional-business-line/conditional-business-line.component");
var supermarket_commecial_component_1 = require("./infrastructure/supermarket/supermarket-commecial.component");
var liquor_business_component_1 = require("./conditional-business-line/liquor-business/liquor-business.component");
var stores_commecial_component_1 = require("./infrastructure/stores/stores-commecial.component");
var food_commecial_component_1 = require("./infrastructure/food/food-commecial.component");
var petrol_business_component_1 = require("./conditional-business-line/petro-business/petrol-business.component");
var lpg_business_component_1 = require("./conditional-business-line/lpg-business/lpg-business.component");
var informed_ecommerce_website_component_1 = require("./e-commerce-managemant/informed-ecommerce-website/informed-ecommerce-website.component");
var shoppingcentre_component_1 = require("./infrastructure/shoppingcentre/shoppingcentre.component");
var total_retail_sales_component_1 = require("./infrastructure/total-retail-sales/total-retail-sales.component");
var import_management_component_1 = require("./export-import-management/import-management/import-management.component");
var export_management_component_1 = require("./export-import-management/export-management/export-management.component");
var dialog_1 = require("@angular/material/dialog");
var modal_component_1 = require("./export-import-management/dialog-import-export/modal.component");
var paginator_1 = require("@angular/material/paginator");
var border_trade_component_1 = require("./border-trade/border-trade.component");
var registered_sale_website_component_1 = require("./e-commerce-managemant/registered-sale-website/registered-sale-website.component");
var dich_pipe_1 = require("../commecial-managemant/border-trade/dich.pipe");
var multilevel_trade_component_1 = require("./multilevel-trade/multilevel-trade.component");
var retail_month_component_1 = require("./retail/retail-month/retail-month.component");
var retail_component_1 = require("./retail/retail.component");
var formatNumber_pipe_1 = require("src/app/shared/pipes/formatNumber.pipe");
var material_1 = require("@angular/material");
var pipe_module_1 = require("src/app/pipe.module");
var trade_fairs_exhibitions_component_1 = require("./trade-development/trade-fairs-exhibitions/trade-fairs-exhibitions.component");
var subscribe_discount_component_1 = require("./trade-development/subscribe-discount/subscribe-discount.component");
var common_functions_service_1 = require("./conditional-business-line/common-functions.service");
var common_2 = require("@angular/common");
var vi_1 = require("@angular/common/locales/vi");
common_2.registerLocaleData(vi_1["default"], 'vi');
var border_trade_export_component_1 = require("./border-trade/border-trade-export/border-trade-export.component");
var border_trade_import_component_1 = require("./border-trade/border-trade-import/border-trade-import.component");
var import_data_component_1 = require("./export-import-management/import-data/import-data.component");
var excel_services_service_1 = require("src/app/shared/services/excel-services.service");
var CommecialManagementModule = /** @class */ (function () {
    function CommecialManagementModule() {
    }
    CommecialManagementModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                material_module_1.MaterialModule,
                forms_2.ReactiveFormsModule,
                commecial_management_routing_1.CommecialManagementRoutingModule,
                dialog_1.MatDialogModule,
                paginator_1.MatPaginatorModule,
                pipe_module_1.PipeModule,
            ],
            exports: [
                paginator_1.MatPaginatorModule,
                material_1.MatSortModule,
                formatNumber_pipe_1.FormatNumberReportPipe
            ],
            declarations: [
                market_commecial_component_1.MarketCommecialManagementComponent,
                common_commecial_component_1.CommonCommecialComponent,
                tobacco_business_component_1.TobaccoBusinessComponent,
                conditional_business_line_component_1.ConditionalBusinessLineComponent,
                supermarket_commecial_component_1.SuperMarketCommecialManagementComponent,
                common_commecial_component_1.CommonCommecialComponent,
                liquor_business_component_1.LiquorBusinessComponent,
                stores_commecial_component_1.StoreManagementComponent,
                food_commecial_component_1.FoodManagementComponent,
                import_management_component_1.ImportManagementComponent,
                petrol_business_component_1.PetrolBusinessComponent,
                informed_ecommerce_website_component_1.InformedEcommerceWebsiteComponent,
                registered_sale_website_component_1.RegisteredSaleWebsiteComponent,
                shoppingcentre_component_1.ShoppingcentreComponent,
                lpg_business_component_1.LPGBusinessComponent,
                export_management_component_1.ExportManagementComponent,
                modal_component_1.ModalComponent,
                total_retail_sales_component_1.TRSManagementComponent,
                border_trade_component_1.BorderTradeComponent,
                retail_month_component_1.RetailMonthComponent,
                retail_component_1.RetailComponent,
                dich_pipe_1.dich,
                multilevel_trade_component_1.MultilevelTradeComponent,
                formatNumber_pipe_1.FormatNumberReportPipe,
                trade_fairs_exhibitions_component_1.TradeFairsExhibitionsComponent,
                subscribe_discount_component_1.SubscribeDiscountComponent,
                border_trade_export_component_1.BorderTradeExportComponent,
                border_trade_import_component_1.BorderTradeImportComponent,
                import_data_component_1.ImportDataComponent
            ],
            entryComponents: [
                modal_component_1.ModalComponent,
                import_data_component_1.ImportDataComponent
            ],
            providers: [
                common_functions_service_1.CommonFuntions,
                excel_services_service_1.ExcelServicesService
            ]
        })
    ], CommecialManagementModule);
    return CommecialManagementModule;
}());
exports.CommecialManagementModule = CommecialManagementModule;
