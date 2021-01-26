"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CommecialManagementRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var conditional_business_line_component_1 = require("./conditional-business-line/conditional-business-line.component");
var liquor_business_component_1 = require("./conditional-business-line/liquor-business/liquor-business.component");
var lpg_business_component_1 = require("./conditional-business-line/lpg-business/lpg-business.component");
var petrol_business_component_1 = require("./conditional-business-line/petro-business/petrol-business.component");
var tobacco_business_component_1 = require("./conditional-business-line/tobacco-business/tobacco-business.component");
var common_commecial_component_1 = require("./infrastructure/common/common-commecial.component");
var market_commecial_component_1 = require("./infrastructure/market/market-commecial.component");
var supermarket_commecial_component_1 = require("./infrastructure/supermarket/supermarket-commecial.component");
var informed_ecommerce_website_component_1 = require("./e-commerce-managemant/informed-ecommerce-website/informed-ecommerce-website.component");
var total_retail_sales_component_1 = require("./infrastructure/total-retail-sales/total-retail-sales.component");
var import_management_component_1 = require("./export-import-management/import-management/import-management.component");
var export_management_component_1 = require("./export-import-management/export-management/export-management.component");
var registered_sale_website_component_1 = require("./e-commerce-managemant/registered-sale-website/registered-sale-website.component");
var multilevel_trade_component_1 = require("./multilevel-trade/multilevel-trade.component");
var retail_component_1 = require("./retail/retail.component");
var retail_month_component_1 = require("./retail/retail-month/retail-month.component");
var trade_fairs_exhibitions_component_1 = require("./trade-development/trade-fairs-exhibitions/trade-fairs-exhibitions.component");
var subscribe_discount_component_1 = require("./trade-development/subscribe-discount/subscribe-discount.component");
var border_trade_import_component_1 = require("./border-trade/border-trade-import/border-trade-import.component");
var border_trade_export_component_1 = require("./border-trade/border-trade-export/border-trade-export.component");
var routes = [
    {
        path: 'domestic',
        data: {
            title: 'Thương mại nội địa'
        },
        children: [
            {
                path: '',
                component: common_commecial_component_1.CommonCommecialComponent,
                data: {
                    title: 'Quản lý thương mại chung'
                }
            },
            {
                path: 'market',
                component: market_commecial_component_1.MarketCommecialManagementComponent,
                data: {
                    title: 'Quản lý chợ'
                }
            },
            {
                path: 'supermarket',
                component: supermarket_commecial_component_1.SuperMarketCommecialManagementComponent,
                data: {
                    title: 'Quản lý siêu thị'
                }
            },
            // {
            //   path: 'shoppingcentre',
            //   component:,
            //   data: {
            //     title: 'Quản lý TTTM',
            //   }
            // },
            {
                path: 'cbl',
                component: conditional_business_line_component_1.ConditionalBusinessLineComponent,
                data: {
                    title: 'Quản lý các mặt hàng KD có ĐK'
                }
            },
            {
                path: 'petrol',
                component: petrol_business_component_1.PetrolBusinessComponent,
                data: {
                    title: 'Quản lý cửa hàng bán lẻ xăng dầu'
                }
            },
            {
                path: 'tobacco',
                component: tobacco_business_component_1.TobaccoBusinessComponent,
                data: {
                    title: 'Quản lý bán buôn sản phẩm thuốc lá'
                }
            },
            {
                path: 'liquor',
                component: liquor_business_component_1.LiquorBusinessComponent,
                data: {
                    title: 'Quản lý bán buôn rượu'
                }
            },
            {
                path: 'lpg',
                component: lpg_business_component_1.LPGBusinessComponent,
                data: {
                    title: 'Quản lý mua bán LPG'
                }
            },
            {
                path: 'trs',
                component: total_retail_sales_component_1.TRSManagementComponent,
                data: {
                    title: 'Tổng mức bán lẻ HH&DV'
                }
            },
        ]
    },
    {
        path: 'trade-development',
        children: [
            {
                path: 'TFE',
                component: trade_fairs_exhibitions_component_1.TradeFairsExhibitionsComponent,
                data: {
                    title: 'Hội trợ triển lãm'
                }
            },
            {
                path: 'SD',
                component: subscribe_discount_component_1.SubscribeDiscountComponent,
                data: {
                    title: 'Đăng ký khuyến mãi'
                }
            },
        ]
    },
    {
        path: 'e-commerce',
        children: [
            {
                path: 'ecommerce-website',
                component: informed_ecommerce_website_component_1.InformedEcommerceWebsiteComponent
            },
            {
                path: 'sale-website',
                component: registered_sale_website_component_1.RegisteredSaleWebsiteComponent
            }
        ]
    },
    {
        path: 'retail',
        component: retail_component_1.RetailComponent
    },
    {
        path: 'retail/retail-detail',
        component: retail_month_component_1.RetailMonthComponent
    },
    {
        path: 'export_import',
        children: [
            {
                path: 'imported_products',
                component: import_management_component_1.ImportManagementComponent
            },
            {
                path: 'exported_products',
                component: export_management_component_1.ExportManagementComponent
            }
        ]
    },
    {
        path: 'border_trade',
        // component: BorderTradeComponent
        children: [
            {
                path: 'import',
                component: border_trade_import_component_1.BorderTradeImportComponent
            },
            {
                path: 'export',
                component: border_trade_export_component_1.BorderTradeExportComponent
            }
        ]
    },
    {
        path: 'multilevel_trade',
        component: multilevel_trade_component_1.MultilevelTradeComponent
    }
];
var CommecialManagementRoutingModule = /** @class */ (function () {
    function CommecialManagementRoutingModule() {
    }
    CommecialManagementRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], CommecialManagementRoutingModule);
    return CommecialManagementRoutingModule;
}());
exports.CommecialManagementRoutingModule = CommecialManagementRoutingModule;
