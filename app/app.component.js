System.register(['rxjs/add/operator/share', 'rxjs/add/operator/map', 'angular2/core', 'angular2/router', './component/ListaTodo', "./component/SocketComponent", 'primeng/primeng', 'angular2-jwt'], function(exports_1, context_1) {
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
    var core_1, router_1, ListaTodo_1, SocketComponent_1, primeng_1, angular2_jwt_1;
    var AppComponent;
    return {
        setters:[
            function (_1) {},
            function (_2) {},
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (ListaTodo_1_1) {
                ListaTodo_1 = ListaTodo_1_1;
            },
            function (SocketComponent_1_1) {
                SocketComponent_1 = SocketComponent_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            }],
        execute: function() {
            // -- Enable production module -------------------------------------------------
            core_1.enableProdMode();
            AppComponent = (function () {
                function AppComponent(location) {
                    this.lock = new Auth0Lock('Iwkmtdobw2OZqRdPkgnTrjAIu1EGswKX', 'unrn.auth0.com');
                    this.jwtHelper = new angular2_jwt_1.JwtHelper();
                    this.location = location;
                }
                AppComponent.prototype.login = function () {
                    var _this = this;
                    var self = this;
                    this.lock.show(function (err, profile, id_token) {
                        if (err) {
                            throw new Error(err);
                        }
                        localStorage.setItem('profile', JSON.stringify(profile));
                        localStorage.setItem('id_token', id_token);
                        console.log(_this.jwtHelper.decodeToken(id_token), _this.jwtHelper.getTokenExpirationDate(id_token), _this.jwtHelper.isTokenExpired(id_token));
                        self.loggedIn();
                    });
                };
                AppComponent.prototype.logout = function () {
                    localStorage.removeItem('profile');
                    localStorage.removeItem('id_token');
                    this.loggedIn();
                };
                AppComponent.prototype.loggedIn = function () {
                    return angular2_jwt_1.tokenNotExpired();
                };
                AppComponent.prototype.isActive = function (path) {
                    return this.location.path() === path;
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        directives: [router_1.ROUTER_DIRECTIVES, primeng_1.Menu],
                        template: "\n    \n    <!-- Menu Bar -->\n    <div class=\"ui menu\">\n      <div class=\"ui container\">\n        <p-menu>\n            <ul>\n                <li><h3>Menu</h3></li>\n                <li><a data-icon=\"fa-plus\" [routerLink]=\"['ListaTodo']\"><span>Todo</span></a></li>\n                <li><a data-icon=\"fa-refresh\" [routerLink]=\"['SocketTodo']\"><span>IO</span></a></li>\n            </ul>\n        </p-menu>\n        <div class=\"header item borderless\">\n          <h1 class=\"ui header\">\n            Angular 2 Ejemplo\n          </h1>\n            <div>\n                <a href=\"#\" *ngIf=\"!loggedIn()\" (click)=\"login()\">Login</a>\n                <a href=\"#\" *ngIf=\"loggedIn()\" (click)=\"logout()\">Logout</a>\n              </div>  \n        </div>\n      </div>\n    </div>\n\n    <div class=\"ui main text container\">\n      <router-outlet></router-outlet><!-- <--- Our app loads here! -->\n    </div>  \n  "
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/home',
                            name: 'SocketTodo',
                            component: SocketComponent_1.SocketComponent,
                            useAsDefault: true
                        },
                        { path: '/lista', name: 'ListaTodo', component: ListaTodo_1.ListaTodo }
                    ]), 
                    __metadata('design:paramtypes', [router_1.Location])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map