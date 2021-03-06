System.register(['angular2/core', '../services/user.service', "angular2/router"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, user_service_1, router_1;
    var ProtectedDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            // TODO выпилено за ненадобностью
            ProtectedDirective = (function () {
                function ProtectedDirective(userService, router, location) {
                    this.userService = userService;
                    this.router = router;
                    this.location = location;
                    this.sub = null;
                    if (!userService.isAuthenticated()) {
                        this.location.replaceState('/'); // clears browser history so they can't navigate with back button
                        this.router.navigate(['PublicPage']);
                    }
                    //
                    // this.sub = this.userService.subscribe((val) => {
                    //     if ( !val.authenticated) {
                    //         this.location.replaceState('/'); // clears browser history so they can't navigate with back button
                    //         this.router.navigate(['LoggedoutPage']); // tells them they've been logged out (somehow)
                    //     }
                    // });
                }
                ProtectedDirective.prototype.ngOnDestroy = function () {
                    if (this.sub != null) {
                        this.sub.unsubscribe();
                    }
                };
                ProtectedDirective = __decorate([
                    core_1.Directive({
                        selector: '[protected]'
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router, router_1.Location])
                ], ProtectedDirective);
                return ProtectedDirective;
            }());
            exports_1("ProtectedDirective", ProtectedDirective);
        }
    }
});
//# sourceMappingURL=protected-directive.js.map