(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-menu-menu-module"],{

/***/ "./src/app/pages/menu/menu.module.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/menu/menu.module.ts ***!
  \*******************************************/
/*! exports provided: MenuPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuPageModule", function() { return MenuPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _menu_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./menu.page */ "./src/app/pages/menu/menu.page.ts");







var routes = [
    {
        path: '',
        redirectTo: '/menu/main',
        pathMatch: 'full'
    },
    {
        path: '',
        component: _menu_page__WEBPACK_IMPORTED_MODULE_6__["MenuPage"],
        children: [
            {
                path: 'main',
                loadChildren: '../main/main.module#MainPageModule'
            },
            {
                path: 'add/:type',
                loadChildren: '../add-document/add-document.module#AddDocumentPageModule'
            },
            {
                path: 'document/:id',
                loadChildren: '../document/document.module#DocumentPageModule'
            }
        ]
    }
];
var MenuPageModule = /** @class */ (function () {
    function MenuPageModule() {
    }
    MenuPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_menu_page__WEBPACK_IMPORTED_MODULE_6__["MenuPage"]]
        })
    ], MenuPageModule);
    return MenuPageModule;
}());



/***/ }),

/***/ "./src/app/pages/menu/menu.page.html":
/*!*******************************************!*\
  !*** ./src/app/pages/menu/menu.page.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-menu contentId=\"content\">\n \n  <ion-header>\n    <ion-toolbar color=\"primary\">\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n \n  <ion-content>\n <div>\n  <ion-menu-toggle>\n    <ion-item>\n      <ion-avatar slot=\"start\">\n        <img src=\"{{picture}}\">\n      </ion-avatar>\n      \n      \n      <ion-label>\n        {{name}}\n      </ion-label>\n    </ion-item>\n  </ion-menu-toggle>\n </div>\n    <div *ngFor=\"let p of pages\">\n \n      <!-- Standard Menu Item -->\n      <ion-menu-toggle *ngIf=\"p.url\">\n        <ion-item [routerLink]=\"p.url\" routerDirection=\"root\" routerLinkActive=\"active\">\n          <ion-icon [name]=\"p.icon\" slot=\"start\"></ion-icon>\n          <ion-label>\n            {{ p.title }}\n          </ion-label>\n        </ion-item>\n      </ion-menu-toggle>\n      \n      <!-- Item with Children -->\n \n      <ion-item button *ngIf=\"p.children?.length > 0\" (click)=\"p.open = !p.open\" [class.parent-active]=\"p.open\" detail=\"false\">\n        <ion-icon slot=\"start\" name=\"arrow-forward\" *ngIf=\"!p.open\"></ion-icon>\n        <ion-icon slot=\"start\" name=\"arrow-down\" *ngIf=\"p.open\"></ion-icon>\n        <ion-label>{{ p.title }}</ion-label>\n      </ion-item>\n \n      <!-- Children List for clicked Item -->\n      <ion-list *ngIf=\"p.open\">\n        <ion-menu-toggle>\n          <ion-item *ngFor=\"let sub of p.children\" class=\"sub-item\" [routerLink]=\"sub.url\" routerDirection=\"root\"\n            routerLinkActive=\"active\">\n            <ion-icon [name]=\"sub.icon\" slot=\"start\"></ion-icon>\n            <ion-label>\n              {{ sub.title }}\n            </ion-label>\n          </ion-item>\n        </ion-menu-toggle>\n      </ion-list>\n \n    </div>\n    <div>\n      <ion-menu-toggle>\n        <ion-item [routerLink]=\"login\" routerDirection=\"root\" (click)=\"logOut()\">\n           \n          <ion-icon name=\"log-out\" slot=\"start\"></ion-icon>\n          <ion-label>\n            Log Out \n          </ion-label>\n        </ion-item>\n      </ion-menu-toggle>\n    </div>\n    \n  </ion-content>\n \n</ion-menu>\n \n<ion-router-outlet id=\"content\" main></ion-router-outlet>\n"

/***/ }),

/***/ "./src/app/pages/menu/menu.page.scss":
/*!*******************************************!*\
  !*** ./src/app/pages/menu/menu.page.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".active {\n  --ion-text-color: var(--ion-color-primary); }\n  .active ion-icon {\n    --ion-text-color-rgb: var(--ion-color-primary); }\n  .parent-active {\n  font-weight: 500; }\n  .sub-item {\n  padding-left: 20px;\n  font-size: small; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2RpYWEvRGVza3RvcC92aXNpb24xOV9wcm9qZWN0L3Zpc2lvbjE5X0FwcC9zcmMvYXBwL3BhZ2VzL21lbnUvbWVudS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSwwQ0FBaUIsRUFBQTtFQURyQjtJQUlRLDhDQUFxQixFQUFBO0VBSTdCO0VBQ0ksZ0JBQWdCLEVBQUE7RUFHcEI7RUFDSSxrQkFBa0I7RUFDbEIsZ0JBQWdCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9tZW51L21lbnUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmFjdGl2ZSB7XG4gICAgLS1pb24tdGV4dC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuIFxuICAgIGlvbi1pY29uIHtcbiAgICAgICAgLS1pb24tdGV4dC1jb2xvci1yZ2I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICB9XG59XG4gXG4ucGFyZW50LWFjdGl2ZSB7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cbiBcbi5zdWItaXRlbSB7XG4gICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xuICAgIGZvbnQtc2l6ZTogc21hbGw7XG59Il19 */"

/***/ }),

/***/ "./src/app/pages/menu/menu.page.ts":
/*!*****************************************!*\
  !*** ./src/app/pages/menu/menu.page.ts ***!
  \*****************************************/
/*! exports provided: MenuPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuPage", function() { return MenuPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/authentication.service */ "./src/app/services/authentication.service.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");




var MenuPage = /** @class */ (function () {
    function MenuPage(authservice, storage) {
        this.authservice = authservice;
        this.storage = storage;
        this.pages = [
            {
                title: 'Home',
                url: '/menu/main',
                icon: 'home'
            },
            {
                title: 'Add new document',
                children: [
                    {
                        title: 'National ID',
                        url: '/menu/add/Natinal ID',
                        icon: 'add'
                    },
                    {
                        title: 'Passport',
                        url: '/menu/add/Passport',
                        icon: 'add'
                    }
                ]
            },
        ];
        this.flag = true;
        this.name = '';
        this.picture = '';
    }
    MenuPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('user').then(function (res) {
            if (res) {
                console.log(res);
                if (res.name) {
                    console.log("hna");
                    console.log(res.name);
                    _this.name = res.name;
                }
                else {
                    _this.name = res.email;
                }
                if (res.picture) {
                    _this.picture = res.picture;
                }
                else {
                    _this.picture = "assets/man.svg";
                }
                console.log(res);
            }
        });
    };
    MenuPage.prototype.checkLogOut = function (p) {
        if (p.title == "Log Out" && this.flag) {
            this.flag = false;
            return true;
        }
        else {
            return false;
        }
    };
    MenuPage.prototype.logOut = function () {
        this.authservice.logout();
    };
    MenuPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-menu',
            template: __webpack_require__(/*! ./menu.page.html */ "./src/app/pages/menu/menu.page.html"),
            styles: [__webpack_require__(/*! ./menu.page.scss */ "./src/app/pages/menu/menu.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"], _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"]])
    ], MenuPage);
    return MenuPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-menu-menu-module.js.map