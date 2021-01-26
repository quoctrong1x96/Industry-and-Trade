"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SCTBossAuthGuardService = void 0;
var core_1 = require("@angular/core");
var SCTBossAuthGuardService = /** @class */ (function () {
    function SCTBossAuthGuardService(router, authenticationService, info) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.info = info;
        this.ROLE_ADMIN = 1;
        this.ROLE_DEPARTMENT = 2;
        this.MESSAGE_REJECT = "Chỉ Sở công thương mới có quyền! Vui lòng đăng nhập tài khoản của sở";
        this.REDIRECT_PAGE = "/public/dashboard";
    }
    SCTBossAuthGuardService.prototype.canActivate = function (route, state) {
        var user = this.authenticationService.userValue;
        if (user) {
            // console.log("SCTBossAuthGuardService", user);
            if (user.user_role == this.ROLE_ADMIN || user.user_role == this.ROLE_DEPARTMENT) {
                return true;
            }
            else {
                this.info.msgError(this.MESSAGE_REJECT);
                this.router.navigate([this.REDIRECT_PAGE], { queryParams: { returnUrl: state.url } });
                this.authenticationService.LogoutUser();
                return false;
            }
        }
        else {
            // not logged in so redirect to login page with the return url
            this.router.navigate([this.REDIRECT_PAGE], { queryParams: { returnUrl: state.url } });
            return false;
        }
    };
    SCTBossAuthGuardService = __decorate([
        core_1.Injectable()
    ], SCTBossAuthGuardService);
    return SCTBossAuthGuardService;
}());
exports.SCTBossAuthGuardService = SCTBossAuthGuardService;
