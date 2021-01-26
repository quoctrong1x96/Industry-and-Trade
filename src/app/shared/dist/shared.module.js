"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SharedModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var progressspinner_1 = require("primeng/progressspinner");
var topbar_component_1 = require("./topbar/topbar.component");
var footer_component_1 = require("./footer/footer.component");
var page_not_found_component_1 = require("./page-not-found/page-not-found.component");
var loader_component_1 = require("./loader/loader.component");
var material_module_1 = require("../material.module");
var form_field_1 = require("@angular/material/form-field");
var router_1 = require("@angular/router");
var sidebar_component_1 = require("./sidebar/sidebar.component");
var sidebar_service_1 = require("../_services/sidebar.service");
var simplebar_angular_1 = require("simplebar-angular");
var filterByText_pipe_1 = require("./pipes/filterByText.pipe");
var header_component_1 = require("./header/header.component");
var excel_services_service_1 = require("./services/excel-services.service");
// import { FlexLayoutModule } from '@angular/flex-layout';
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            declarations: [
                topbar_component_1.TopbarComponent,
                header_component_1.HeaderComponent,
                footer_component_1.FooterComponent,
                page_not_found_component_1.PageNotFoundComponent,
                loader_component_1.LoaderComponent,
                sidebar_component_1.SidebarComponent,
                filterByText_pipe_1.FilterByTextPipe
            ],
            imports: [
                common_1.CommonModule,
                progressspinner_1.ProgressSpinnerModule,
                material_module_1.MaterialModule,
                router_1.RouterModule,
                simplebar_angular_1.SimplebarAngularModule
                // FlexLayoutModule
            ],
            exports: [
                topbar_component_1.TopbarComponent,
                header_component_1.HeaderComponent,
                footer_component_1.FooterComponent,
                page_not_found_component_1.PageNotFoundComponent,
                loader_component_1.LoaderComponent,
                sidebar_component_1.SidebarComponent
            ],
            bootstrap: [topbar_component_1.TopbarComponent],
            providers: [
                { provide: form_field_1.MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
                sidebar_service_1.SidebarService,
                excel_services_service_1.ExcelServicesService
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
