(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main-main-module"],{

/***/ "./src/app/pages/main/main.module.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/main/main.module.ts ***!
  \*******************************************/
/*! exports provided: MainPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainPageModule", function() { return MainPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _main_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./main.page */ "./src/app/pages/main/main.page.ts");







var routes = [
    {
        path: '',
        component: _main_page__WEBPACK_IMPORTED_MODULE_6__["MainPage"],
    }
];
/*children: [
      {
        path: 'document/:id',
        loadChildren: '../document/document.module#DocumentPageModule'
      }
       
    ]*/
var MainPageModule = /** @class */ (function () {
    function MainPageModule() {
    }
    MainPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_main_page__WEBPACK_IMPORTED_MODULE_6__["MainPage"]]
        })
    ], MainPageModule);
    return MainPageModule;
}());



/***/ }),

/***/ "./src/app/pages/main/main.page.html":
/*!*******************************************!*\
  !*** ./src/app/pages/main/main.page.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title>Home</ion-title>\n  </ion-toolbar>\n</ion-header>\n \n<ion-content padding>\n  <div *ngIf=\"checkData()\" text-center>\n<h2>\n  No Documents Available\n</h2>\n  </div>\n    <div *ngFor=\"let d of documents\">\n    <ion-card (click)=\"selectDocument(d.id)\">\n        <ion-card-header>\n           \n          <ion-card-title>{{d.title}}</ion-card-title>\n        </ion-card-header>\n      \n        <ion-card-content>\n          <div *ngIf=\"d.docType==0\">{{d.data.id}}</div>\n          <div *ngIf=\"d.docType==1\">{{d.data.ID}}</div>\n        </ion-card-content>\n      </ion-card>\n      </div>\n      \n</ion-content>\n\n<ion-footer >\n    <ion-toolbar position=\"bottom\">\n      <ion-button  expand=\"full\" color=\"primary\" (click)=\"showSheet()\">Add Document</ion-button>\n    </ion-toolbar>\n  </ion-footer>"

/***/ }),

/***/ "./src/app/pages/main/main.page.scss":
/*!*******************************************!*\
  !*** ./src/app/pages/main/main.page.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL21haW4vbWFpbi5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/main/main.page.ts":
/*!*****************************************!*\
  !*** ./src/app/pages/main/main.page.ts ***!
  \*****************************************/
/*! exports provided: MainPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainPage", function() { return MainPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_scan_services_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/scan-services.service */ "./src/app/services/scan-services.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");







var MainPage = /** @class */ (function () {
    function MainPage(storage, service, router, actionSheetController) {
        this.storage = storage;
        this.service = service;
        this.router = router;
        this.actionSheetController = actionSheetController;
        this.documents = [];
    }
    MainPage.prototype.ngOnInit = function () {
        /*this.storage.get('auth-token').then(res => {
          if (res) {
            const headers = new HttpHeaders().set('Authorization', 'Bearer '+res)
            this.service.getData(headers).subscribe(res=>{
              console.log(res)
              this.documents=res
            },err=>{
              console.log(err)
            })
          }
        })*/
    };
    MainPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log("diaa ya nas");
        this.storage.get('auth-token').then(function (res) {
            if (res) {
                var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]().set('Authorization', 'Bearer ' + res);
                _this.service.getData(headers).subscribe(function (res) {
                    console.log(res);
                    _this.documents = res;
                }, function (err) {
                    console.log(err);
                });
            }
        });
    };
    MainPage.prototype.selectDocument = function (id) {
        this.router.navigate(['/menu/document/' + id]);
    };
    MainPage.prototype.showSheet = function () {
        this.presentActionSheet();
    };
    MainPage.prototype.presentActionSheet = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            header: 'Type of Documents',
                            buttons: [{
                                    text: 'National ID',
                                    handler: function () {
                                        _this.router.navigate(['/menu/add/Natinal ID']);
                                    }
                                }, {
                                    text: 'Passport',
                                    handler: function () {
                                        _this.router.navigate(['/menu/add/Passport']);
                                    }
                                }, {
                                    text: 'Car Licence',
                                    handler: function () {
                                        _this.router.navigate(['/menu/add/Licence']);
                                    }
                                }, {
                                    text: 'Business Card',
                                    handler: function () {
                                        _this.router.navigate(['/menu/add/Business Card']);
                                    }
                                }, {
                                    text: 'Cancel',
                                    icon: 'close',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel clicked');
                                    }
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MainPage.prototype.checkData = function () {
        if (this.documents.length == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    MainPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-main',
            template: __webpack_require__(/*! ./main.page.html */ "./src/app/pages/main/main.page.html"),
            styles: [__webpack_require__(/*! ./main.page.scss */ "./src/app/pages/main/main.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"], _services_scan_services_service__WEBPACK_IMPORTED_MODULE_2__["ScanServicesService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ActionSheetController"]])
    ], MainPage);
    return MainPage;
}());



/***/ })

}]);
//# sourceMappingURL=main-main-module.js.map