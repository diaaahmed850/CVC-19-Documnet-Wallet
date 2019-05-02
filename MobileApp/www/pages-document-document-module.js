(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-document-document-module"],{

/***/ "./src/app/pages/document/document.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/document/document.module.ts ***!
  \***************************************************/
/*! exports provided: DocumentPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentPageModule", function() { return DocumentPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _document_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./document.page */ "./src/app/pages/document/document.page.ts");







var routes = [
    {
        path: '',
        component: _document_page__WEBPACK_IMPORTED_MODULE_6__["DocumentPage"]
    }
];
var DocumentPageModule = /** @class */ (function () {
    function DocumentPageModule() {
    }
    DocumentPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_document_page__WEBPACK_IMPORTED_MODULE_6__["DocumentPage"]]
        })
    ], DocumentPageModule);
    return DocumentPageModule;
}());



/***/ }),

/***/ "./src/app/pages/document/document.page.html":
/*!***************************************************!*\
  !*** ./src/app/pages/document/document.page.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n    <ion-toolbar>\n        <ion-title>{{document.title}}</ion-title>\n      <ion-buttons slot=\"start\">\n        <ion-back-button></ion-back-button>\n      </ion-buttons>\n    </ion-toolbar>\n  </ion-header>\n<ion-content padding>\n    <ion-list>\n        <ion-list-header>\n            <ion-label>Results</ion-label>\n          </ion-list-header>\n          \n          <ion-item *ngFor=\"let k of keys\">\n              <ion-label>{{k}}</ion-label>\n              <ion-input type='text' [value]=\"document.data[k]\" readonly=\"true\"></ion-input>\n            </ion-item>\n             \n        </ion-list>\n\n</ion-content>"

/***/ }),

/***/ "./src/app/pages/document/document.page.scss":
/*!***************************************************!*\
  !*** ./src/app/pages/document/document.page.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2RvY3VtZW50L2RvY3VtZW50LnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/document/document.page.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/document/document.page.ts ***!
  \*************************************************/
/*! exports provided: DocumentPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentPage", function() { return DocumentPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_scan_services_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/scan-services.service */ "./src/app/services/scan-services.service.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");






var DocumentPage = /** @class */ (function () {
    function DocumentPage(storage, service, router, route) {
        this.storage = storage;
        this.service = service;
        this.router = router;
        this.route = route;
        this.keys = [];
        this.values = [];
    }
    DocumentPage.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            console.log(params['id']);
            _this.id = params['id'];
            _this.storage.get('auth-token').then(function (res) {
                if (res) {
                    var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]().set('Authorization', 'Bearer ' + res);
                    _this.service.getDocument(headers, _this.id).subscribe(function (res) {
                        console.log(res);
                        _this.document = res;
                        for (var key in _this.document.data) {
                            if (_this.document.data.hasOwnProperty(key)) {
                                console.log(key + " -> " + _this.document.data[key]);
                                _this.keys.push(key);
                                _this.values.push(_this.document.data[key]);
                            }
                        }
                    }, function (err) {
                        console.log(err);
                    });
                }
            });
        });
    };
    DocumentPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-document',
            template: __webpack_require__(/*! ./document.page.html */ "./src/app/pages/document/document.page.html"),
            styles: [__webpack_require__(/*! ./document.page.scss */ "./src/app/pages/document/document.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"], _services_scan_services_service__WEBPACK_IMPORTED_MODULE_2__["ScanServicesService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]])
    ], DocumentPage);
    return DocumentPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-document-document-module.js.map