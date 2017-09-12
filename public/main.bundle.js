webpackJsonp(["main"],{

/***/ "../../../../../front/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../front/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../front/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_auth_auth_guard__ = __webpack_require__("../../../../../front/app/common/auth/auth-guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_login_page_login_page_component__ = __webpack_require__("../../../../../front/app/pages/login-page/login-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_users_page_users_page_component__ = __webpack_require__("../../../../../front/app/pages/users-page/users-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_owner_page_owner_page_component__ = __webpack_require__("../../../../../front/app/pages/owner-page/owner-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_owner_page_owner_login_component__ = __webpack_require__("../../../../../front/app/pages/owner-page/owner-login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_members_member_added_page_component__ = __webpack_require__("../../../../../front/app/pages/members/member-added-page.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var routes = [
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_3__pages_login_page_login_page_component__["a" /* LoginPageComponent */] },
    { path: 'users', component: __WEBPACK_IMPORTED_MODULE_4__pages_users_page_users_page_component__["a" /* UsersPageComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__common_auth_auth_guard__["a" /* AuthGuard */]] },
    { path: 'owner-login', component: __WEBPACK_IMPORTED_MODULE_6__pages_owner_page_owner_login_component__["a" /* OwnerLoginComponent */] },
    { path: 'owner', component: __WEBPACK_IMPORTED_MODULE_5__pages_owner_page_owner_page_component__["a" /* OwnerPageComponent */] },
    { path: 'members/added', component: __WEBPACK_IMPORTED_MODULE_7__pages_members_member_added_page_component__["a" /* MemberAddedPageComponent */] },
    { path: '**', redirectTo: '/login' } // Page not found, redirect to login
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../front/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: "<router-outlet></router-outlet>",
        styles: []
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../front/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_auth_auth_module__ = __webpack_require__("../../../../../front/app/common/auth/auth.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../front/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_routing_module__ = __webpack_require__("../../../../../front/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_page_login_page_component__ = __webpack_require__("../../../../../front/app/pages/login-page/login-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_users_page_users_page_component__ = __webpack_require__("../../../../../front/app/pages/users-page/users-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_owner_page_owner_page_component__ = __webpack_require__("../../../../../front/app/pages/owner-page/owner-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_owner_page_owner_login_component__ = __webpack_require__("../../../../../front/app/pages/owner-page/owner-login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_members_member_added_page_component__ = __webpack_require__("../../../../../front/app/pages/members/member-added-page.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




// auth services

// app components


// app pages





var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_7__pages_login_page_login_page_component__["a" /* LoginPageComponent */],
            __WEBPACK_IMPORTED_MODULE_8__pages_users_page_users_page_component__["a" /* UsersPageComponent */],
            __WEBPACK_IMPORTED_MODULE_9__pages_owner_page_owner_page_component__["a" /* OwnerPageComponent */],
            __WEBPACK_IMPORTED_MODULE_10__pages_owner_page_owner_login_component__["a" /* OwnerLoginComponent */],
            __WEBPACK_IMPORTED_MODULE_11__pages_members_member_added_page_component__["a" /* MemberAddedPageComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
            __WEBPACK_IMPORTED_MODULE_4__common_auth_auth_module__["a" /* AuthModule */],
            __WEBPACK_IMPORTED_MODULE_6__app_routing_module__["a" /* AppRoutingModule */],
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../front/app/common/api-urls.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return apiUrl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_environments_environment__ = __webpack_require__("../../../../../front/environments/environment.ts");

/**
 * apiUrl Get an api url and wrap it based on the environment
 * @param {string} pathName
 * @returns {string} The env-aware api url
 */
var apiUrl = function (pathName) { return ("" + __WEBPACK_IMPORTED_MODULE_0_environments_environment__["a" /* environment */].api.base + __WEBPACK_IMPORTED_MODULE_0_environments_environment__["a" /* environment */].api[pathName]); };
//# sourceMappingURL=api-urls.js.map

/***/ }),

/***/ "../../../../../front/app/common/auth/auth-guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__("../../../../../front/app/common/auth/auth-service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    /**
     * canActivate Check if user is authenticated, if not, redirect to login
     */
    AuthGuard.prototype.canActivate = function () {
        if (this.auth.loggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* Auth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* Auth */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], AuthGuard);

var _a, _b;
//# sourceMappingURL=auth-guard.js.map

/***/ }),

/***/ "../../../../../front/app/common/auth/auth-service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TOKEN_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getAuthToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Auth; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_jwt__ = __webpack_require__("../../../../angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_common_api_urls__ = __webpack_require__("../../../../../front/app/common/api-urls.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// Define a name for the stored auth token
var TOKEN_NAME = 'auth:token';
// Define a getter for the auth token
var getAuthToken = (function () { return sessionStorage.getItem(TOKEN_NAME); });
var Auth = (function () {
    function Auth(http) {
        this.http = http;
    }
    /**
     * setToken Store an auth token
     * @param {string} token The auth token
     */
    Auth.prototype.setToken = function (token) {
        sessionStorage.setItem(TOKEN_NAME, token);
    };
    /**
     * loggedIn Check if user is logged in
     * @returns {boolean}
     */
    Auth.prototype.loggedIn = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_4_angular2_jwt__["tokenNotExpired"])(TOKEN_NAME, getAuthToken());
    };
    /**
     * login Login user based on username & password
     * @param {string} username
     * @param {string} password
     */
    Auth.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post(Object(__WEBPACK_IMPORTED_MODULE_5_app_common_api_urls__["a" /* apiUrl */])('admin'), { username: username, password: password })
            .map(function (res) { return res.json(); })
            .map(function (data) { return (_this.setToken(data.token), { success: true }); });
    };
    return Auth;
}());
Auth = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], Auth);

var _a;
//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ "../../../../../front/app/common/auth/auth.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export authHttpServiceFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__ = __webpack_require__("../../../../angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_service__ = __webpack_require__("../../../../../front/app/common/auth/auth-service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_guard__ = __webpack_require__("../../../../../front/app/common/auth/auth-guard.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// Auth http service to make authenticated requests to api
function authHttpServiceFactory(http, options) {
    return new __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["AuthHttp"](new __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["AuthConfig"]({
        tokenName: __WEBPACK_IMPORTED_MODULE_3__auth_service__["b" /* TOKEN_NAME */],
        tokenGetter: __WEBPACK_IMPORTED_MODULE_3__auth_service__["c" /* getAuthToken */],
    }), http, options);
}
var AuthHttpProvider = {
    provide: __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["AuthHttp"],
    useFactory: authHttpServiceFactory,
    deps: [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]]
};
var AuthModule = (function () {
    function AuthModule() {
    }
    return AuthModule;
}());
AuthModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__auth_guard__["a" /* AuthGuard */],
            __WEBPACK_IMPORTED_MODULE_3__auth_service__["a" /* Auth */],
            AuthHttpProvider,
        ]
    })
], AuthModule);

//# sourceMappingURL=auth.module.js.map

/***/ }),

/***/ "../../../../../front/app/pages/login-page/login-page.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\n\theight: 100%;\n}\n\n.login-form {\n\t-webkit-box-flex: 1;\n\t    -ms-flex: 1 0 auto;\n\t        flex: 1 0 auto;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../front/app/pages/login-page/login-page.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container d-flex align-items-center\">\n  <form class=\"login-form\" (ngSubmit)=\"login(user.username, user.password)\">\n    <!-- show login error -->\n    <div class=\"form-error\">{{loginError||'&nbsp;'}}</div>\n    <div class=\"form-group\">\n      <label for=\"usernameInput\">Username</label>\n      <input type=\"text\" class=\"form-control\" id=\"usernameInput\" placeholder=\"Username\" name=\"username\" [(ngModel)]=\"user.username\" (keydown)=\"clear()\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"passwordInput\">Password</label>\n      <input type=\"password\" class=\"form-control\" id=\"passwordInput\" placeholder=\"Password\" name=\"password\" [(ngModel)]=\"user.password\" (keydown)=\"clear()\">\n    </div>\n    <button type=\"submit\" class=\"btn btn-primary\">Login</button>\n  </form>\n</div>\n"

/***/ }),

/***/ "../../../../../front/app/pages/login-page/login-page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_common_auth_auth_service__ = __webpack_require__("../../../../../front/app/common/auth/auth-service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginPageComponent = (function () {
    function LoginPageComponent(auth, router) {
        this.auth = auth;
        this.router = router;
        this.user = {};
        this.loginError = '';
    }
    /**
     * login Try to login an admin user based on username & password
     * @param {string} username User username
     * @param {string} password User password
     */
    LoginPageComponent.prototype.login = function (username, password) {
        var _this = this;
        this.clear();
        this.auth.login(username, password)
            .subscribe(function (d) { return d.success && _this.router.navigate(['/users']); }, function (r) {
            var err = r.json();
            // match username/password errors and display error
            if (err && ['UNAUTHORIZED', 'NOT_FOUND'].indexOf(err.code) > -1) {
                _this.loginError = 'Invalid username and/or password!';
            }
        });
    };
    /**
     * clear Clear login errors
     */
    LoginPageComponent.prototype.clear = function () {
        this.loginError = '';
    };
    return LoginPageComponent;
}());
LoginPageComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-login-page',
        template: __webpack_require__("../../../../../front/app/pages/login-page/login-page.component.html"),
        styles: [__webpack_require__("../../../../../front/app/pages/login-page/login-page.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_app_common_auth_auth_service__["a" /* Auth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_common_auth_auth_service__["a" /* Auth */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* Router */]) === "function" && _b || Object])
], LoginPageComponent);

var _a, _b;
//# sourceMappingURL=login-page.component.js.map

/***/ }),

/***/ "../../../../../front/app/pages/members/member-added-page.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\n  padding-top: 30px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../front/app/pages/members/member-added-page.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"jumbotron\">\n    <h3>You were successfully added to the team!</h3>\n    <p>An invitation email will be sent to you if you are not already in the team.</p>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../front/app/pages/members/member-added-page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MemberAddedPageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Page shown after a user was successfully added to a team by using the team url
 */
var MemberAddedPageComponent = (function () {
    function MemberAddedPageComponent() {
    }
    return MemberAddedPageComponent;
}());
MemberAddedPageComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-member-added-page',
        template: __webpack_require__("../../../../../front/app/pages/members/member-added-page.component.html"),
        styles: [__webpack_require__("../../../../../front/app/pages/members/member-added-page.component.css")]
    })
], MemberAddedPageComponent);

//# sourceMappingURL=member-added-page.component.js.map

/***/ }),

/***/ "../../../../../front/app/pages/owner-page/owner-login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OwnerLoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_common_api_urls__ = __webpack_require__("../../../../../front/app/common/api-urls.ts");
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Github login callback for owners
 */
var OwnerLoginComponent = (function () {
    function OwnerLoginComponent(http, activatedRoute, router) {
        this.http = http;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.state = {};
    }
    OwnerLoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        // subscribe to queryParams and check if there's a state and code params
        // If so, try auth, else redirect to owner page
        this.activatedRoute.queryParams.subscribe(function (params) {
            var code = params.code, state = params.state;
            if (code && state) {
                _this.tryAuth(code, state);
            }
            else {
                _this.redirect();
            }
        });
    };
    /**
     * tryAuth Try to authenticate the user based on code & state params
     * @param {string} code  from github oAuth
     * @param {string} state from github oAuth
     */
    OwnerLoginComponent.prototype.tryAuth = function (code, state) {
        var _this = this;
        this.http.get(Object(__WEBPACK_IMPORTED_MODULE_3_app_common_api_urls__["a" /* apiUrl */])('ownerLoginCB') + "?code=" + code + "&state=" + state).subscribe(function (d) {
            return _this.router.navigate(['owner']);
        }, function (err) {
            var res = err.json();
            // If no user/owner found, show error
            if (res && res.code === 'NOT_FOUND') {
                _this.state = __assign({}, (_this.state), { authErr: "User isn't an owner!" });
            }
            else {
                _this.redirect();
            }
        });
    };
    /**
     * redirect Navigate to owner page
     */
    OwnerLoginComponent.prototype.redirect = function () {
        this.router.navigate(['owner']);
    };
    return OwnerLoginComponent;
}());
OwnerLoginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-owner-login',
        template: "\n    <div class=\"container\">\n      <h3 *ngIf=\"state.authErr\">{{state.authErr}}</h3>\n    </div>",
        styles: [".container {padding-top: 30px;}"]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _c || Object])
], OwnerLoginComponent);

var _a, _b, _c;
//# sourceMappingURL=owner-login.component.js.map

/***/ }),

/***/ "../../../../../front/app/pages/owner-page/owner-page.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  padding-top: 30px;\n  display: block;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../front/app/pages/owner-page/owner-page.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" *ngIf=\"state.ready\">\n  <h3>Your managed teams</h3>\n  <p><small>(Select a team to see the registration url )</small></p>\n  <div class=\"list-group\">\n    <!-- list all teams and the register url -->\n    <ng-container *ngFor=\"let t of state.teams; let $i=index\">\n      <a href=\"javascript:;\" (click)=\"getSharableLink(t)\" class=\"list-group-item list-group-item-action\">{{$i+1}}. {{t.name}}</a>\n      <div class=\"list-group-item disabled\" *ngIf=\"state.team===t.id&&state.links[state.team]\">\n        Team url for <strong>{{t.name}}</strong> is: <code>{{state.links[state.team]}}</code>\n      </div>\n    </ng-container>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../front/app/pages/owner-page/owner-page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OwnerPageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_common_api_urls__ = __webpack_require__("../../../../../front/app/common/api-urls.ts");
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OwnerPageComponent = (function () {
    function OwnerPageComponent(http) {
        this.http = http;
        this.state = { teams: [], ready: false, links: {} };
        /**
         * auth Redirect user to authentication page when unauthorized error is given
         */
        this.auth = function (e) {
            var res = e.json();
            if (res && res.code === 'UNAUTHORIZED') {
                // external url, use location href to navigate
                window.location.href = Object(__WEBPACK_IMPORTED_MODULE_2_app_common_api_urls__["a" /* apiUrl */])('ownerLogin');
            }
        };
    }
    OwnerPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        // try to get the user/owner's teams
        this.http.get(Object(__WEBPACK_IMPORTED_MODULE_2_app_common_api_urls__["a" /* apiUrl */])('ownerTeams')).map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.state = __assign({}, (_this.state), { teams: data.teams, ready: true });
        }, this.auth);
    };
    /**
     * getSharableLink Get the register url for a team
     * @param {Object} team The team to get url for
     */
    OwnerPageComponent.prototype.getSharableLink = function (team) {
        var _this = this;
        // update state with active team
        this.state = __assign({}, (this.state), { team: team.id });
        // if url already available return it
        if (this.state.links[team.id]) {
            return;
        }
        // get the team url from api
        var url = Object(__WEBPACK_IMPORTED_MODULE_2_app_common_api_urls__["a" /* apiUrl */])('ownerTeamUrl').replace(':teamid:', team.id);
        this.http.get(url).map(function (res) { return res.json(); })
            .map(function (data) { return data.url; }).subscribe(function (data) { return _this.state.links[team.id] = data; });
    };
    return OwnerPageComponent;
}());
OwnerPageComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-owner-page',
        template: __webpack_require__("../../../../../front/app/pages/owner-page/owner-page.component.html"),
        styles: [__webpack_require__("../../../../../front/app/pages/owner-page/owner-page.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["Http"]) === "function" && _a || Object])
], OwnerPageComponent);

var _a;
//# sourceMappingURL=owner-page.component.js.map

/***/ }),

/***/ "../../../../../front/app/pages/users-page/users-page.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\n    height: 100%;\n}\n\n.users-form {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 0 auto;\n            flex: 1 0 auto;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../front/app/pages/users-page/users-page.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container d-flex align-items-center\">\n  <form class=\"users-form\" (ngSubmit)=\"addUser(user.username)\">\n    <h3>Add owner</h3>\n    <!-- Add owner notification message -->\n    <div class=\"form-success\">{{userAdded? 'User added!' : '&nbsp;'}}</div>\n    <!-- Add owner form -->\n    <div class=\"form-group\">\n      <input type=\"text\" class=\"form-control\" id=\"usernameInput\" placeholder=\"Username\" name=\"username\" [(ngModel)]=\"user.username\" (keydown)=\"clear()\">\n    </div>\n    <button type=\"submit\" class=\"btn btn-primary\">Add</button>\n  </form>\n</div>\n"

/***/ }),

/***/ "../../../../../front/app/pages/users-page/users-page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersPageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular2_jwt__ = __webpack_require__("../../../../angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_common_api_urls__ = __webpack_require__("../../../../../front/app/common/api-urls.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UsersPageComponent = (function () {
    function UsersPageComponent(http) {
        this.http = http;
        this.user = {};
        this.userAdded = false;
    }
    /**
     * addUser Add owner to db
     * @param {string} username The username to be added
     */
    UsersPageComponent.prototype.addUser = function (username) {
        var _this = this;
        this.clear();
        this.http.post(Object(__WEBPACK_IMPORTED_MODULE_2_app_common_api_urls__["a" /* apiUrl */])('users'), {
            username: username,
            "role": "owner",
            "type": "github",
        }).subscribe(function (res) {
            _this.userAdded = true;
            _this.user = {};
        });
    };
    /**
     * clear Clear the user-added state
     */
    UsersPageComponent.prototype.clear = function () {
        this.userAdded = false;
    };
    return UsersPageComponent;
}());
UsersPageComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-users-page',
        template: __webpack_require__("../../../../../front/app/pages/users-page/users-page.component.html"),
        styles: [__webpack_require__("../../../../../front/app/pages/users-page/users-page.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0_angular2_jwt__["AuthHttp"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0_angular2_jwt__["AuthHttp"]) === "function" && _a || Object])
], UsersPageComponent);

var _a;
//# sourceMappingURL=users-page.component.js.map

/***/ }),

/***/ "../../../../../front/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false,
    api: {
        base: 'http://localhost:3000/api/v1',
        admin: '/admin/login',
        users: '/admin/users',
        ownerLoginCB: '/github/owneruser/callback',
        ownerLogin: '/github/owneruser/login',
        ownerTeams: '/github/owneruser/teams',
        ownerTeamUrl: '/github/teams/:teamid:/registrationurl'
    }
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../front/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../front/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../front/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../front/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map