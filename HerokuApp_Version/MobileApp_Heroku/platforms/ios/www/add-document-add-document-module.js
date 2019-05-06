(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["add-document-add-document-module"],{

/***/ "./src/app/pages/add-document/add-document.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/add-document/add-document.module.ts ***!
  \***********************************************************/
/*! exports provided: AddDocumentPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddDocumentPageModule", function() { return AddDocumentPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _add_document_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./add-document.page */ "./src/app/pages/add-document/add-document.page.ts");







var routes = [
    {
        path: '',
        component: _add_document_page__WEBPACK_IMPORTED_MODULE_6__["AddDocumentPage"]
    }
];
var AddDocumentPageModule = /** @class */ (function () {
    function AddDocumentPageModule() {
    }
    AddDocumentPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_add_document_page__WEBPACK_IMPORTED_MODULE_6__["AddDocumentPage"]]
        })
    ], AddDocumentPageModule);
    return AddDocumentPageModule;
}());



/***/ }),

/***/ "./src/app/pages/add-document/add-document.page.html":
/*!***********************************************************!*\
  !*** ./src/app/pages/add-document/add-document.page.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title>Adding {{type}} </ion-title>\n  </ion-toolbar>\n</ion-header>\n \n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n     \n      <ion-col col-4>\n          <ion-button (click)=\"openCam()\"   >Open Camera</ion-button>\n      </ion-col>\n      <ion-col col-4></ion-col>\n      <ion-col col-4>\n          <ion-button (click)=\"openGallery()\"   >open gallery</ion-button>  \n      </ion-col>\n    </ion-row>\n     \n      </ion-grid>\n     \n\n  \n\n \n\n\n    <!--\n<ion-list lines=\"none\" *ngIf=\"data\">\n        <ion-list-header>\n            <ion-label>Results</ion-label>\n          </ion-list-header>\n          <ion-item>\n              <ion-label>ID</ion-label>\n              <ion-input type='text' [value]=\"data['id']\"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label>Name</ion-label>\n                <ion-input type='text' [value]=\"data['name']\"></ion-input>\n              </ion-item>\n              <ion-item>\n                  <ion-label>Address</ion-label>\n                  <ion-input type='text' [value]=\"data['address']\"></ion-input>\n                </ion-item>\n                <ion-item>\n                    <ion-label>code</ion-label>\n                    <ion-input type='text' [value]=\"data['code']\"></ion-input>\n                  </ion-item>\n        </ion-list>\n        <ion-card *ngIf=\"data\"   >\n        <img src=\"{{image}}\">\n        <ion-card-header>\n           \n          <ion-card-title>Results</ion-card-title>\n        </ion-card-header>\n      \n        <ion-card-content>\n            <form #idform=\"ngForm\" (ngSubmit)=\"saveData(idform)\" *ngIf=\"chechID()\">\n              <ion-row center>  \n                <ion-col text-center>   \n                   <ion-item>\n                    <ion-label>Title: </ion-label>\n                    <ion-input type='text' [value]=\"type\" name=\"title\" required [(ngModel)]=\"type\"></ion-input>\n                   </ion-item> \n                  \n                </ion-col> \n               </ion-row>\n              \n              <ion-item>\n                <ion-label>ID</ion-label>\n                <ion-input type='text' [value]=\"data['id']\" name=\"id\" required [(ngModel)]=\"data['id']\"></ion-input>\n              </ion-item>\n              <ion-item>\n                  <ion-label>Name</ion-label>\n                  <ion-textarea autosize type='text' [value]=\"data['name']\" rows=\"2\" name=\"name\" required [(ngModel)]=\"data['name']\"></ion-textarea>\n                </ion-item>\n                <ion-item>\n                    <ion-label>Address</ion-label>\n                    <ion-textarea autosize [value]=\"data['address']\" name=\"address\" required [(ngModel)]=\"data['address']\"></ion-textarea>\n                    \n                  </ion-item>\n                  <ion-item>\n                      <ion-label>code</ion-label>\n                      <ion-input type='text' [value]=\"data['code']\" name=\"code\" required [(ngModel)]=\"data['code']\"></ion-input>\n                    </ion-item>\n                    <ion-row center>  \n                        <ion-col text-center>   \n                          <br>  \n                         <ion-button type=\"submit\" block [disabled]=\"!idform.form.valid\" > Save</ion-button> \n                        </ion-col> \n                       </ion-row>\n                  </form>\n                  <form #form=\"ngForm\" (ngSubmit)=\"saveData(form)\" *ngIf=\"chechPassport()\">\n                     \n                      <ion-item>\n                        <ion-label>Nationality</ion-label>\n                        <ion-input type='text' [value]=\"data['Nationality']\"></ion-input>\n                      </ion-item>\n                      <ion-item>\n                          <ion-label>Name</ion-label>\n                          <ion-input type='text' [value]=\"data['Name']\"></ion-input>\n                        </ion-item>\n                        <ion-item>\n                            <ion-label>Passport_No</ion-label>\n                            <ion-input type='text' [value]=\"data['Passport_No']\"></ion-input>\n                          </ion-item>\n                          <ion-item>\n                              <ion-label>Country</ion-label>\n                              <ion-input type='text' [value]=\"data['Country']\"></ion-input>\n                            </ion-item>\n                            <ion-item>\n                                <ion-label>Sex</ion-label>\n                                <ion-input type='text' [value]=\"data['Sex']\"></ion-input>\n                              </ion-item>\n                              <ion-item>\n                                  <ion-label>Date_of_Birth</ion-label>\n                                  <ion-input type='text' [value]=\"data['Date_of_Birth']\"></ion-input>\n                                </ion-item>\n                                <ion-item>\n                                  <ion-label>Expiration_date</ion-label>\n                                  <ion-input type='text' [value]=\"data['Expiration_date']\"></ion-input>\n                                </ion-item>\n                            <ion-row center>  \n                                <ion-col text-center>   \n                                  <br>  \n                                 <ion-button type=\"submit\" block> Save</ion-button> \n                                </ion-col> \n                               </ion-row>\n                          </form>\n        </ion-card-content>\n      </ion-card>\n    -->\n     \n    <ion-card *ngIf=\"show\"   >\n      <img src=\"{{image}}\">\n      <ion-card-header>\n         \n        <ion-card-title>Results</ion-card-title>\n      </ion-card-header>\n    \n      <ion-card-content>\n          <form #idform=\"ngForm\" (ngSubmit)=\"saveData(idform)\">\n              <ion-row center>  \n                  <ion-col text-center>   \n                     <ion-item>\n                      <ion-label>Title: </ion-label>\n                      <ion-input  type='text' [value]=\"type\" name=\"title\" required [(ngModel)]=\"type\"></ion-input>\n                     </ion-item> \n                    \n                  </ion-col> \n                 </ion-row> \n                  <ion-item *ngFor=\"let k of keys\">\n                      <ion-label>{{k}}</ion-label>\n                      <ion-textarea rows=\"1\" autosize type='text' [(ngModel)]=\"data[k]\"  required name=\"{{k}}\"></ion-textarea>\n                    </ion-item> \n     <div *ngIf=\"!checkLicense()&&!checkCard()\">\n        <ion-row center>  \n            <ion-col text-center>   \n              <br>  \n             <ion-button type=\"submit\" block [disabled]=\"!idform.form.valid\" > Save</ion-button> \n            </ion-col> \n           </ion-row>\n     </div>\n     <div *ngIf=\"checkLicense()\">\n        <ion-row>\n     \n            <ion-col col-4>\n                <ion-button type=\"submit\" block [disabled]=\"!idform.form.valid\" > Save</ion-button>\n            </ion-col>\n            <ion-col col-4></ion-col>\n            <ion-col col-4>\n                <ion-button (click)=\"getFines()\" >Get Fines</ion-button>  \n            </ion-col>\n          </ion-row>\n     </div>\n     <div *ngIf=\"checkCard()\">\n        <ion-row>\n     \n            <ion-col col-4>\n                <ion-button type=\"submit\" block [disabled]=\"!idform.form.valid\" > Save</ion-button>\n            </ion-col>\n            <ion-col col-4></ion-col>\n            <ion-col col-4>\n                <ion-button (click)=\"saveContacts()\" >Save Contact</ion-button>  \n            </ion-col>\n          </ion-row>\n     </div>\n                    \n                  </form>\n                </ion-card-content>\n              </ion-card>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/pages/add-document/add-document.page.scss":
/*!***********************************************************!*\
  !*** ./src/app/pages/add-document/add-document.page.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-card {\n  display: flex;\n  flex-direction: column;\n  width: 100% !important;\n  margin: 0 !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2RpYWEvRG9jdW1lbnRzL1Zpc2lvbjE5L01vYmlsZUFwcC9zcmMvYXBwL3BhZ2VzL2FkZC1kb2N1bWVudC9hZGQtZG9jdW1lbnQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixzQkFBc0I7RUFDdEIsb0JBQW9CLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9hZGQtZG9jdW1lbnQvYWRkLWRvY3VtZW50LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1jYXJke1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xuICAgIG1hcmdpbjogMCAhaW1wb3J0YW50O1xuICB9Il19 */"

/***/ }),

/***/ "./src/app/pages/add-document/add-document.page.ts":
/*!*********************************************************!*\
  !*** ./src/app/pages/add-document/add-document.page.ts ***!
  \*********************************************************/
/*! exports provided: AddDocumentPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddDocumentPage", function() { return AddDocumentPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/camera/ngx */ "./node_modules/@ionic-native/camera/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_scan_services_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/scan-services.service */ "./src/app/services/scan-services.service.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _ionic_native_contacts_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/contacts/ngx */ "./node_modules/@ionic-native/contacts/ngx/index.js");











var AddDocumentPage = /** @class */ (function () {
    function AddDocumentPage(router, route, camera, loadingController, service, storage, alertController, contacts, toastController) {
        this.router = router;
        this.route = route;
        this.camera = camera;
        this.loadingController = loadingController;
        this.service = service;
        this.storage = storage;
        this.alertController = alertController;
        this.contacts = contacts;
        this.toastController = toastController;
        this.type = '';
        this.image = '';
        this.data = '';
        this.keys = [];
        this.values = [];
        this.show = false;
        this.doc_types = {
            "Natinal ID": 0,
            "Passport": 1,
            "Licence": 2,
            "Business Card": 3
        };
    }
    AddDocumentPage.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            console.log(params['type']);
            _this.type = params['type'];
        });
    };
    AddDocumentPage.prototype.presentAlert = function (header, err) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: header,
                            message: err,
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddDocumentPage.prototype.openCam = function () {
        var _this = this;
        if (this.show) {
            this.show = false;
        }
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            targetWidth: 1500,
            targetHeight: 1500,
            sourceType: 1
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            //alert(imageData)
            //this.image=(<any>window).Ionic.WebView.convertFileSrc(imageData);
            _this.image = 'data:image/jpeg;base64,' + imageData;
            //this.data=imageData
            console.log("diaa");
            _this.showLoader();
            if (_this.type == "Natinal ID") {
                _this.service.scanId({ 'img': imageData }).subscribe(function (res) {
                    _this.hideLoader();
                    _this.data = res;
                    _this.parseData(_this.data);
                    _this.show = true;
                    console.log(res);
                }, function (err) {
                    _this.hideLoader();
                    _this.presentAlert('Alert', err.error.error);
                });
            }
            else if (_this.type == "Passport") {
                _this.service.scanPassport({ 'img': imageData }).subscribe(function (res) {
                    _this.hideLoader();
                    _this.data = res;
                    _this.parseData(_this.data);
                    _this.show = true;
                    console.log(res);
                }, function (err) {
                    _this.hideLoader();
                    _this.presentAlert('Alert', err.error.error);
                });
            }
            else if (_this.type == "Licence") {
                _this.service.scanLicence({ 'img': imageData }).subscribe(function (res) {
                    _this.hideLoader();
                    _this.data = res;
                    _this.parseData(_this.data);
                    _this.show = true;
                    console.log(res);
                }, function (err) {
                    _this.hideLoader();
                    _this.presentAlert('Alert', err.error.error);
                });
            }
            else if (_this.type == "Business Card") {
                _this.service.scanBusinessCard({ 'img': imageData }).subscribe(function (res) {
                    _this.hideLoader();
                    _this.data = res;
                    _this.parseData(_this.data);
                    _this.show = true;
                    console.log(res);
                }, function (err) {
                    _this.hideLoader();
                    _this.presentAlert('Alert', err.error.error);
                });
            }
        }, function (err) {
            // Handle error
            //alert("error "+JSON.stringify(err))
        });
    };
    AddDocumentPage.prototype.openGallery = function () {
        var _this = this;
        if (this.show) {
            this.show = false;
        }
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            targetWidth: 1500,
            targetHeight: 1500,
            sourceType: 0
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            //alert(imageData)
            //this.image=(<any>window).Ionic.WebView.convertFileSrc(imageData);
            _this.image = 'data:image/jpeg;base64,' + imageData;
            //this.data=imageData
            console.log("diaa");
            _this.showLoader();
            if (_this.type == "Natinal ID") {
                _this.service.scanId({ 'img': imageData }).subscribe(function (res) {
                    _this.hideLoader();
                    _this.data = res;
                    _this.parseData(_this.data);
                    _this.show = true;
                    console.log(res);
                }, function (err) {
                    _this.hideLoader();
                    _this.presentAlert('Alert', err.error.error);
                });
            }
            else if (_this.type == "Passport") {
                _this.service.scanPassport({ 'img': imageData }).subscribe(function (res) {
                    _this.hideLoader();
                    _this.data = res;
                    _this.parseData(_this.data);
                    _this.show = true;
                    console.log(res);
                }, function (err) {
                    _this.hideLoader();
                    _this.presentAlert('Alert', err.error.error);
                });
            }
            else if (_this.type == "Licence") {
                _this.service.scanLicence({ 'img': imageData }).subscribe(function (res) {
                    _this.hideLoader();
                    _this.data = res;
                    _this.parseData(_this.data);
                    _this.show = true;
                    console.log(res);
                }, function (err) {
                    _this.hideLoader();
                    _this.presentAlert('Alert', err.error.error);
                });
            }
            else if (_this.type == "Business Card") {
                _this.service.scanBusinessCard({ 'img': imageData }).subscribe(function (res) {
                    _this.hideLoader();
                    _this.data = res;
                    _this.parseData(_this.data);
                    _this.show = true;
                    console.log(res);
                }, function (err) {
                    _this.hideLoader();
                    _this.presentAlert('Alert', err.error.error);
                });
            }
        }, function (err) {
            // Handle error
            //alert("error "+JSON.stringify(err))
        });
    };
    AddDocumentPage.prototype.showLoader = function () {
        this.loaderToShow = this.loadingController.create({
            message: 'Please wait'
        }).then(function (res) {
            res.present();
            res.onDidDismiss().then(function (dis) {
                console.log('Loading dismissed!');
            });
        });
        //
    };
    AddDocumentPage.prototype.hideLoader = function () {
        this.loadingController.dismiss();
    };
    AddDocumentPage.prototype.chechID = function () {
        if (this.type == "Natinal ID") {
            return true;
        }
        else {
            return false;
        }
    };
    AddDocumentPage.prototype.chechPassport = function () {
        if (this.type == "Passport") {
            return true;
        }
        else {
            return false;
        }
    };
    AddDocumentPage.prototype.checkLicense = function () {
        if (this.type == "Licence") {
            return true;
        }
        else {
            return false;
        }
    };
    AddDocumentPage.prototype.checkCard = function () {
        if (this.type == "Business Card") {
            return true;
        }
        else {
            return false;
        }
    };
    AddDocumentPage.prototype.getFines = function () {
        var _this = this;
        if (this.type == "Licence") {
            this.showLoader();
            this.service.getFines(this.data).subscribe(function (res) {
                _this.hideLoader();
                _this.presentAlert('Total Fines', 'Your Total Fines is : ' + res['Fines']);
            });
        }
    };
    AddDocumentPage.prototype.saveContacts = function () {
        var _this = this;
        if (this.type == "Business Card") {
            var contact_1 = this.contacts.create();
            contact_1.displayName = this.data['Name'];
            var keys_length = this.keys.length;
            var phone_fields = [];
            var email_fields = [];
            for (var i = 0; i < keys_length; i++) {
                if (this.keys[i].includes('Phone')) {
                    phone_fields.push(new _ionic_native_contacts_ngx__WEBPACK_IMPORTED_MODULE_8__["ContactField"](this.keys[i], this.values[i]));
                }
                if (this.keys[i].includes('Email')) {
                    email_fields.push(new _ionic_native_contacts_ngx__WEBPACK_IMPORTED_MODULE_8__["ContactField"](this.keys[i], this.values[i]));
                }
            }
            //contact.name = new ContactName(null, 'Smith', 'John');
            if (phone_fields.length != 0) {
                contact_1.phoneNumbers = phone_fields;
            }
            if (email_fields.length != 0) {
                contact_1.emails = email_fields;
            }
            contact_1.save().then(function () {
                console.log('Contact saved!', contact_1);
                _this.presentAlert('Success', 'Contact saved!');
            }, function (error) {
                console.error('Error saving contact.', error);
                _this.presentAlert('Error', 'Error saving contact.');
            });
        }
        /*let contact: Contact = this.contacts.create();
      
      contact.name = new ContactName(null, 'Smith', 'John');
      contact.phoneNumbers = [new ContactField('mobile', '6471234567')];
      contact.save().then(
        () => {console.log('Contact saved!', contact)
        this.presentAlert('Success','Contact saved!')
      },
        (error: any) =>{console.error('Error saving contact.', error)
        this.presentAlert('Error','Error saving contact.')
      }
      );*/
    };
    AddDocumentPage.prototype.parseData = function (data) {
        this.keys = [];
        this.values = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                console.log(key + " -> " + data[key]);
                this.keys.push(key);
                this.values.push(data[key]);
            }
        }
    };
    AddDocumentPage.prototype.saveData = function (form) {
        var _this = this;
        console.log(form.form.value);
        var form_data = form.form.value;
        var title = form.form.value['title'];
        delete form_data.title;
        var body = {
            "title": title,
            "docType": this.doc_types[this.type],
            "data": form_data
        };
        console.log(body);
        this.storage.get('auth-token').then(function (res) {
            if (res) {
                var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpHeaders"]().set('Authorization', 'Bearer ' + res);
                _this.service.saveData(body, headers).subscribe(function (res) {
                    console.log(res);
                    _this.presentToast('The Document is saved Successfully!');
                    _this.router.navigate(['/menu/main']);
                }, function (err) {
                    console.log(err);
                });
            }
        });
    };
    AddDocumentPage.prototype.presentToast = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: msg,
                            color: 'dark',
                            duration: 4000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddDocumentPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-add-document',
            template: __webpack_require__(/*! ./add-document.page.html */ "./src/app/pages/add-document/add-document.page.html"),
            styles: [__webpack_require__(/*! ./add-document.page.scss */ "./src/app/pages/add-document/add-document.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_3__["Camera"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["LoadingController"], _services_scan_services_service__WEBPACK_IMPORTED_MODULE_5__["ScanServicesService"], _ionic_storage__WEBPACK_IMPORTED_MODULE_6__["Storage"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"], _ionic_native_contacts_ngx__WEBPACK_IMPORTED_MODULE_8__["Contacts"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"]])
    ], AddDocumentPage);
    return AddDocumentPage;
}());



/***/ })

}]);
//# sourceMappingURL=add-document-add-document-module.js.map