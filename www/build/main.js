webpackJsonp([6],{

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_fire_auth__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_database__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { Observable } from 'rxjs';
let LoginProvider = class LoginProvider {
    constructor(afAuth, db) {
        this.afAuth = afAuth;
        this.db = db;
        afAuth.authState.subscribe(user => {
            this.userF = user;
        });
    }
    setUserInfo(authInfo, userVars) {
        console.log(authInfo.uid);
        this.newUserInfo = {
            admin: false,
            anon: false,
            displayName: userVars.displayName,
            email: authInfo.email,
            verifiedEmail: false,
            profilePicture: userVars.profilePicture,
            provider: userVars.provider,
            verifiedUser: false
        };
        console.log(this.newUserInfo);
    }
    signUpWithGoogle(userVars) {
        console.log(userVars);
        console.log('Signing up with google');
        return this.oauthSignIn(new __WEBPACK_IMPORTED_MODULE_2_firebase_app___default.a.auth.GoogleAuthProvider(), 'google', userVars, true, this.db);
    }
    signUpWithFacebook(userVars) {
        console.log(userVars);
    }
    signInWithFacebook() {
        console.log('Sign in with facebook');
        return this.oauthSignIn(new __WEBPACK_IMPORTED_MODULE_2_firebase_app___default.a.auth.FacebookAuthProvider(), 'facebook', {}, false, this.db);
    }
    signInWithGoogle() {
        console.log('Sign in with google');
        return this.oauthSignIn(new __WEBPACK_IMPORTED_MODULE_2_firebase_app___default.a.auth.GoogleAuthProvider(), 'google', {}, false, this.db);
    }
    oauthSignIn(provider, signInProvider, userDBInfo, signup, db) {
        if (!window.cordova) {
            return this.afAuth.auth.signInWithPopup(provider)
                .then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // var token = result.credential.accessToken;
                var myProp = 'accessToken';
                let token;
                if (result.credential.hasOwnProperty(myProp)) {
                    token = result.credential[myProp];
                }
                // The signed-in user info.
                var user = result.user;
                console.log(token, user);
                let currentuser = user.uid;
                window.localStorage.setItem('currentuser', currentuser);
                let provider = signInProvider;
                window.localStorage.setItem('provider', provider);
                if (signup == true) {
                    let userRef = db.database.ref('/users/' + user.uid);
                    userDBInfo.displayName = user.displayName;
                    userRef.set(userDBInfo);
                }
            }).catch(function (error) {
                // Handle Errors here.
                // var errorCode = error.code;
                var errorMessage = error.message;
                // var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                // var credential = error.credential;
                console.log(errorMessage);
            });
        }
        else {
            return this.afAuth.auth.signInWithRedirect(provider)
                .then(() => {
                return this.afAuth.auth.getRedirectResult().then(result => {
                    var myProp = 'accessToken';
                    let token;
                    if (result.credential.hasOwnProperty(myProp)) {
                        token = result.credential[myProp];
                    }
                    // The signed-in user info.
                    let user = result.user;
                    console.log(token, user);
                }).catch(function (error) {
                    // Handle Errors here.
                    alert(error.message);
                });
            });
        }
    }
};
LoginProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_fire_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_3__angular_fire_database__["a" /* AngularFireDatabase */]])
], LoginProvider);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_auth__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_database__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__random_random__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__all_all__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__form_form__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login_login__ = __webpack_require__(86);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








let HomePage = class HomePage {
    constructor(navCtrl, afAuth, db) {
        this.navCtrl = navCtrl;
        this.afAuth = afAuth;
        this.db = db;
        this.forms = this.db.list('/forms').valueChanges();
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
        //        this.afAuth.authState.subscribe((user) => {
        //            var ref = this.db.database.ref("users/" + user.uid);
        //            ref.once("value")
        //            .then(function(snapshot) {
        //                var id = snapshot.child("displayName").val();
        //                this.afAuth.auth.currentUser.updateProfile({
        //                    displayName: id,
        //                    photoURL: user.photoURL
        //                }).then((response) => {
        //                    console.log('good to go');
        //                });
        //            });
        //        });
    }
    allPoems() {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__all_all__["a" /* AllPage */], {}, { animate: true, animation: 'wp-transition', direction: 'forward' });
    }
    randomPoem() {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__random_random__["a" /* RandomPage */], {}, { animate: true, animation: 'wp-transition', direction: 'forward' });
    }
    seeFormType(formType) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__form_form__["a" /* FormPage */], { formType: formType }, { animate: true, animation: 'wp-transition', direction: 'forward' });
    }
    logout() {
        this.afAuth.auth.signOut();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__login_login__["a" /* LoginPage */], {}, { animate: true, animation: 'wp-transition', direction: 'forward' });
    }
};
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/lazaryo/apps/poetry-v3/src/pages/home/home.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button icon-only menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n\n        <ion-title>Poetry</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <div *ngIf="afAuth.user | async as user; else showLogin">\n        <h4>Hello, {{ user.displayName }}!</h4>\n    </div>\n\n    <ion-grid>\n        <ion-row>\n            <ion-col col-6 *ngFor="let form of forms | async">\n                <button ion-button block color="dark" (click)="seeFormType(form.name)">{{form.name}}</button>\n            </ion-col>\n        </ion-row>\n\n        <ion-row><button ion-button block (click)="randomPoem()" color="danger">View a Random Poem</button></ion-row>\n        \n        <ion-row><button ion-button block (click)="allPoems()" color="dark">See All Poems</button></ion-row>\n    </ion-grid>\n\n</ion-content>\n'/*ion-inline-end:"/Users/lazaryo/apps/poetry-v3/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_fire_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_3__angular_fire_database__["a" /* AngularFireDatabase */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_database__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__form_form__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__single_single__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let AllPage = class AllPage {
    constructor(navCtrl, navParams, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.poems = db.list('poems').valueChanges();
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad AllPage');
    }
    singlePoem(title, author, ft, lines) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__single_single__["a" /* SinglePage */], {
            title: title, author: author, formType: ft, lines: lines
        });
    }
    seeFormType(formType) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__form_form__["a" /* FormPage */], { formType: formType });
    }
};
AllPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-all',template:/*ion-inline-start:"/Users/lazaryo/apps/poetry-v3/src/pages/all/all.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button icon-only menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n\n        <ion-title>All Poetry</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <p>Showing all poems submitted below.</p>\n    \n    <ion-list>\n        <div *ngFor="let poem of poems | async">\n        <ion-item no-lines no-padding *ngIf="poem.verified == true">\n            <button ion-button clear color="dark" (click)="singlePoem(poem.title, poem.author, poem.formType, poem.lines)">{{poem.title}}</button>\n            <p class="author">{{poem.author}}</p>\n            <button ion-button clear item-right color="danger"\n                (click)="seeFormType(poem.formType)">{{poem.formType}}</button>\n        </ion-item>\n        </div>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/lazaryo/apps/poetry-v3/src/pages/all/all.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_fire_database__["a" /* AngularFireDatabase */]])
], AllPage);

//# sourceMappingURL=all.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_auth__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_database__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__single_single__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let ProfilePage = class ProfilePage {
    constructor(navCtrl, navParams, afAuth, db, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.db = db;
        this.alertCtrl = alertCtrl;
        this.showPoems = false;
        this.changeInfo = false;
        this.info = {
            admin: false,
            anon: false,
            displayName: '',
            email: '',
            emailVerified: false,
            owner: false,
            profilePicture: 'https://api.adorable.io/avatars/250/malik.png',
            provider: 'google',
            verifiedUser: true
        };
        this.profilePoems = this.db.list('poems').valueChanges();
        this.userID = this.afAuth.auth.currentUser.uid;
        this.userInfo = this.db.object('users/' + this.userID).valueChanges();
        this.userInfo.subscribe(ok => {
            this.info = ok;
        });
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad ProfilePage');
    }
    showPoetry() {
        this.showPoems = !this.showPoems;
    }
    enableEdit() {
        this.changeInfo = !this.changeInfo;
    }
    changeData() {
        this.changeInfo = !this.changeInfo;
        if (!this.newName || this.newName == this.info.displayName) {
            this.newName = this.info.displayName;
            this.nameConfirmation('Error: Empty or Name hasn\'t changed');
        }
        else {
            this.nameConfirmation('Your name has been saved.');
            var user = this.afAuth.auth.currentUser;
            user.updateProfile({
                displayName: this.newName,
                photoURL: this.info.profilePicture
            }).then(function () {
                console.log('You\'re a new person now!');
            }, function (error) {
                console.log(error);
            });
            this.db.object('users/' + this.userID).update({ displayName: this.newName });
            this.info.displayName = this.newName;
        }
    }
    nameConfirmation(message) {
        const alert = this.alertCtrl.create({
            title: 'Name Change',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }
    toPoem(data) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__single_single__["a" /* SinglePage */], data);
    }
    removePoem(data) {
        console.log(data);
    }
    verifyEmail() {
        console.log('Verifying email...');
        this.afAuth.auth.currentUser.sendEmailVerification().then((res) => {
            this.db.object('users/' + this.userID).update({ verifiedUser: true, verifiedEmail: true });
        });
        console.log('Email verified');
    }
};
ProfilePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-profile',template:/*ion-inline-start:"/Users/lazaryo/apps/poetry-v3/src/pages/profile/profile.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Your Profile</ion-title>\n        \n        <ion-buttons end>\n            <button ion-button icon-only (click)="enableEdit()" *ngIf="changeInfo == false">\n                <ion-icon name="settings"></ion-icon>\n            </button>\n            <button ion-button text-only clear (click)="changeData()" *ngIf="changeInfo == true">\n                Save\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <ion-card padding>\n        <ion-title *ngIf="!changeInfo">{{info.displayName}}</ion-title>\n        <ion-input *ngIf="changeInfo" [(ngModel)]="newName" placeholder={{info.displayName}}></ion-input><br>\n        \n        <!--<p padding-top padding-bottom>Your display name will be used to when writing your poems.</p>-->\n    \n        <img padding-bottom src={{info.profilePicture}} title={{info.displayName}}>\n    \n        <button *ngIf="info.admin == true" ion-button outline small color="danger">Admin</button>\n        <button *ngIf="info.verifiedUser == true" ion-button outline small color="stable">Verified</button>\n    </ion-card>\n   \n    <button ion-button block color="dark" (click)="showPoetry()">\n        <span *ngIf="!showPoems">See Poems</span>\n        <span *ngIf="showPoems">Hide Poems</span>\n    </button>\n    \n    <div *ngIf="showPoems">\n        <ion-card>\n            <ion-list>\n                <ion-item-sliding *ngFor="let poem of profilePoems | async">\n                    <ion-item *ngIf="poem.auid == userID">\n                        <p ion-text color="dark">{{poem.title}}</p>\n                        <button ion-button clear item-right color="danger"\n                        (click)="toPoem(poem)">View</button>\n                    </ion-item>\n                    <ion-item-options side="left">\n                        <button ion-button color="danger" (click)="removePoem(poem)">\n                            <ion-icon name="trash"></ion-icon>\n                        </button>\n                    </ion-item-options>\n                   </ion-item-sliding>\n            </ion-list>\n        </ion-card>\n    </div>\n    \n    <div *ngIf="!showPoems">\n        <p>Hiding Poems</p>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/lazaryo/apps/poetry-v3/src/pages/profile/profile.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_fire_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_3__angular_fire_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], ProfilePage);

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_auth__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_login_login__ = __webpack_require__(137);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let SignUpPage = class SignUpPage {
    constructor(navCtrl, navParams, fireAuth, loginProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fireAuth = fireAuth;
        this.loginProvider = loginProvider;
        this.signUpType = 'google';
        this.google = {
            name: ''
        };
        this.userVars = {
            admin: false,
            anon: false,
            displayName: 'John Doe',
            owner: false,
            profilePicture: 'https://api.adorable.io/avatars/250/malik.png',
            provider: 'google',
            verifiedUser: false
        };
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad SignupPage');
    }
    changeSignUp(suType) {
        this.signUpType = suType;
    }
    googleSignUp() {
        this.userVars.displayName = this.google.name;
        this.userVars.provider = 'google';
        this.loginProvider.signUpWithGoogle(this.userVars);
    }
    backtoLogin() {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */], {}, { animate: true, animation: 'wp-transition', direction: 'forward' });
    }
};
SignUpPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-signup',template:/*ion-inline-start:"/Users/lazaryo/apps/poetry-v3/src/pages/signup/signup.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>SignUp to Poetry</ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <ion-grid *ngIf="signUpType == \'google\'">\n        <h3>Google Sign Up</h3>\n        <p>Your profille will need to be verified before publishing poetry on this app.</p>\n        <form (ngSubmit)="googleSignUp()">\n            <ion-row no-padding>\n                <ion-col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12>\n                    <button ion-button block color="dark" type="submit">\n                        Sign Up\n                    </button>\n                </ion-col>\n            </ion-row>\n        </form>\n    </ion-grid>\n\n\n    <ion-grid id="no-signup">\n        <ion-row>\n            <ion-col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12>\n                <p style="text-align:center">Already have an account?</p>\n                <button ion-button block clear small color="danger" (click)="backtoLogin()">Log In</button>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/lazaryo/apps/poetry-v3/src/pages/signup/signup.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_fire_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_4__providers_login_login__["a" /* LoginProvider */]])
], SignUpPage);

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubmitPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_database__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let SubmitPage = class SubmitPage {
    constructor(navCtrl, navParams, _af, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._af = _af;
        this.alertCtrl = alertCtrl;
        this.haikuInfo = {
            title: '',
            author: '',
            lines: {
                line1: '',
                line2: '',
                line3: ''
            },
            formType: 'Haiku',
            verified: false,
            auid: this.navParams.get('userID'),
            disappear: false
        };
        this.pantoumInfo = {
            title: '',
            author: '',
            lines: {
                line1: '',
                line2: '',
                line3: '',
                line4: '',
                line5: '',
                line6: '',
                line7: '',
                line8: '',
                line9: '',
                line10: '',
                line11: '',
                line12: ''
            },
            formType: 'Pantoum',
            verified: false,
            // this would be a variable in production
            auid: this.navParams.get('userID'),
            disappear: false
        };
        this.trioletInfo = {
            title: '',
            author: '',
            lines: {
                line1: '',
                line2: '',
                line3: '',
                line4: '',
                line5: '',
                line6: '',
                line7: '',
                line8: ''
            },
            formType: 'Triolet',
            verified: false,
            // this would be a variable in production
            auid: this.navParams.get('userID'),
            disappear: false
        };
        this.forms = this._af.list('forms').valueChanges();
        this.poems = this._af.list('/poems');
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad SubmitPage');
        console.log(this.navParams.data.userID);
    }
    seeDesc(formKey, formKeys) {
        if (!formKey) {
            this.formTypeAlert();
        }
        else {
            this._af.object('forms').valueChanges().subscribe(ok => {
                formKeys = Object["values"](ok);
                for (let form of formKeys) {
                    if (form.name == formKey) {
                        this.formDesc = form.desc;
                        this.formTypeAlert();
                    }
                }
            });
        }
    }
    formTypeAlert() {
        let title, subTitle;
        if (!this.formName) {
            title = 'Error';
            subTitle = 'No Form Type Selected';
        }
        else {
            title = this.formName;
            subTitle = this.formDesc;
        }
        const alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
    }
    viewExample(name) {
        let title, subTitle;
        switch (name) {
            case 'Haiku':
                title = name + ' Example';
                subTitle = name;
                break;
            case 'Pantoum':
                title = name + ' Example';
                subTitle = name;
                break;
            case 'Prose':
                title = name + ' Example';
                subTitle = name;
                break;
            case 'Triolet':
                title = name + ' Example';
                subTitle = name;
            default:
                title = name;
                subTitle = name;
        }
        const alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
    }
    haiku() {
        // if the title input is empty
        if (this.haikuInfo.title == undefined) {
            this.haikuInfo.title = "Untitled";
        }
        // if the author input is empty
        if (this.haikuInfo.author == undefined) {
            this.haikuInfo.author = "Anonymous";
        }
        // adding data to poem object
        this.poem = {
            title: this.haikuInfo.title,
            author: this.haikuInfo.author,
            lines: {
                line1: this.haikuInfo.lines.line1,
                line2: this.haikuInfo.lines.line2,
                line3: this.haikuInfo.lines.line3
            },
            formType: 'Haiku',
            verified: false,
            // this would be a variable in production
            auid: this.navParams.get('userID'),
            disappear: false
        };
        // Adding Haiku to Firebase Database
        this.poems.push(this.poem);
        console.log('Pushed ' + this.haikuInfo.title + ' by ' + this.haikuInfo.author + ' to the database!');
        this.poem = '';
        this.haikuInfo = {
            title: '',
            author: '',
            lines: {
                line1: '',
                line2: '',
                line3: ''
            },
            formType: 'Haiku',
            verified: false,
            auid: this.navParams.get('userID'),
            disappear: false
        };
    }
    pantoum() {
        // if the title input is empty
        if (this.pantoumInfo.title == undefined) {
            this.pantoumInfo.title = "Untitled";
        }
        // if the author input is empty
        if (this.pantoumInfo.author == undefined) {
            this.pantoumInfo.author = "Anonymous";
        }
        // adding data to poem object
        this.poem = {
            title: this.pantoumInfo.title,
            author: this.pantoumInfo.author,
            lines: {
                line1: this.pantoumInfo.lines.line1,
                line2: this.pantoumInfo.lines.line2,
                line3: this.pantoumInfo.lines.line3,
                line4: this.pantoumInfo.lines.line4,
                line5: this.pantoumInfo.lines.line2,
                line6: this.pantoumInfo.lines.line6,
                line7: this.pantoumInfo.lines.line4,
                line8: this.pantoumInfo.lines.line8,
                line9: this.pantoumInfo.lines.line6,
                line10: this.pantoumInfo.lines.line3,
                line11: this.pantoumInfo.lines.line8,
                line12: this.pantoumInfo.lines.line1
            },
            formType: 'Pantoum',
            verified: false,
            // this would be a variable in production
            auid: this.navParams.get('userID'),
            disappear: false
        };
        // Adding Pantoum to Firebase Database
        this.poems.push(this.poem);
        console.log('Pushed ' + this.pantoumInfo.title + ' by ' + this.pantoumInfo.author + ' to the database!');
        this.poem = '';
        this.pantoumInfo = {
            title: '',
            author: '',
            lines: {
                line1: '',
                line2: '',
                line3: '',
                line4: '',
                line5: '',
                line6: '',
                line7: '',
                line8: '',
                line9: '',
                line10: '',
                line11: '',
                line12: ''
            },
            formType: 'Pantoum',
            verified: false,
            // this would be a variable in production
            auid: this.navParams.get('userID'),
            disappear: false
        };
    }
    prose(title, author, content) {
        console.log(title);
        console.log(author);
        console.log(content);
        console.log(this.navParams.get('userID'));
    }
    triolet() {
        // if the title input is empty
        if (this.trioletInfo.title == undefined) {
            this.trioletInfo.title = "Untitled";
        }
        // if the author input is empty
        if (this.trioletInfo.author == undefined) {
            this.trioletInfo.author = "Anonymous";
        }
        // adding data to poem object
        this.poem = {
            title: this.trioletInfo.title,
            author: this.trioletInfo.author,
            lines: {
                line1: this.trioletInfo.lines.line1,
                line2: this.trioletInfo.lines.line2,
                line3: this.trioletInfo.lines.line3,
                line4: this.trioletInfo.lines.line1,
                line5: this.trioletInfo.lines.line5,
                line6: this.trioletInfo.lines.line6,
                line7: this.trioletInfo.lines.line1,
                line8: this.trioletInfo.lines.line2
            },
            formType: 'Triolet',
            verified: false,
            // this would be a variable in production
            auid: this.navParams.get('userID'),
            disappear: false
        };
        // Adding Triolet to Firebase Database
        this.poems.push(this.poem);
        console.log('Pushed ' + this.trioletInfo.title + ' by ' + this.trioletInfo.author + ' to the database!');
        this.poem = '';
        this.trioletInfo = {
            title: '',
            author: '',
            lines: {
                line1: '',
                line2: '',
                line3: '',
                line4: '',
                line5: '',
                line6: '',
                line7: '',
                line8: ''
            },
            formType: 'Triolet',
            verified: false,
            // this would be a variable in production
            auid: this.navParams.get('userID'),
            disappear: false
        };
    }
};
SubmitPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-submit',template:/*ion-inline-start:"/Users/lazaryo/apps/poetry-v3/src/pages/submit/submit.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button icon-only menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n\n        <ion-title>Submit a Poem</ion-title>\n        \n        <ion-buttons end>\n        <button ion-button icon-only clear color="dark" (click)="seeDesc(formName)">\n            <ion-icon name="md-information-circle"></ion-icon>\n        </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <p>Submit a poem here with the the given poem formats.</p><br>\n    \n    <!--  Poem Form Type Options  -->\n    <ion-item no-padding>\n        <ion-label>Form Type</ion-label>\n        <ion-select [(ngModel)]="formName">\n            <ion-option *ngFor="let form of forms | async" value={{form.name}}>{{form.name}}</ion-option>\n        </ion-select>\n    </ion-item><br>\n    \n    <p *ngIf="formName == null"><b>Pick a poem form from the options and begin writing.</b></p>\n    <button *ngIf="formName" ion-button block color="danger" (click)="viewExample(formName)">View Example</button>\n    \n    <div *ngIf="formName">\n        <ng-container *ngFor="let form of forms | async">\n            <pre *ngIf="formName == form.name">{{form.example | json}}</pre>\n        </ng-container>\n    </div>\n    \n    <!--  Haiku Form  -->\n    <form id="haikuF" *ngIf="formName == \'Haiku\'" (ngSubmit)="haiku()">\n        <ion-input name="title" [(ngModel)]="haikuInfo.title" type="text" placeholder="Title"></ion-input>\n        <ion-input name="author" [(ngModel)]="haikuInfo.author" type="text" placeholder="Author"></ion-input>\n        \n        <ion-input name="line1" [(ngModel)]="haikuInfo.lines.line1" type="text" placeholder="Line 1"></ion-input>\n        <ion-input name="line2" [(ngModel)]="haikuInfo.lines.line2" type="text" placeholder="Line 2"></ion-input>\n        <ion-input name="line3" [(ngModel)]="haikuInfo.lines.line3" type="text" placeholder="Line 3"></ion-input>\n        \n        <button ion-button color="dark" block type="submit">Submit</button>\n    </form>\n    \n    <!--  Pantoum Form  -->\n    <form *ngIf="formName == \'Pantoum\'" (ngSubmit)="pantoum()">\n        <ion-input name="title" [(ngModel)]="pantoumInfo.title" type="text" placeholder="Title"></ion-input>\n        <ion-input name="author" [(ngModel)]="pantoumInfo.author" type="text" placeholder="Author"></ion-input>\n\n        <ion-input name="line1" [(ngModel)]="pantoumInfo.lines.line1" type="text" placeholder="Line 1"></ion-input>\n        <ion-input name="line2" [(ngModel)]="pantoumInfo.lines.line2" type="text" placeholder="Line 2"></ion-input>\n        <ion-input name="line3" [(ngModel)]="pantoumInfo.lines.line3" type="text" placeholder="Line 3"></ion-input>\n        <ion-input name="line4" [(ngModel)]="pantoumInfo.lines.line4" type="text" placeholder="Line 4"></ion-input>\n        <ion-input name="line5" [(ngModel)]="pantoumInfo.lines.line2" type="text" placeholder="Line 5"></ion-input>\n        <ion-input name="line6" [(ngModel)]="pantoumInfo.lines.line6" type="text" placeholder="Line 6"></ion-input>\n        <ion-input name="line7" [(ngModel)]="pantoumInfo.lines.line4" type="text" placeholder="Line 7"></ion-input>\n        <ion-input name="line8" [(ngModel)]="pantoumInfo.lines.line8" type="text" placeholder="Line 8"></ion-input>\n        <ion-input name="line9" [(ngModel)]="pantoumInfo.lines.line6" type="text" placeholder="Line 9"></ion-input>\n        <ion-input name="line10" [(ngModel)]="pantoumInfo.lines.line3" type="text" placeholder="Line 10"></ion-input>\n        <ion-input name="line11" [(ngModel)]="pantoumInfo.lines.line8" type="text" placeholder="Line 11"></ion-input>\n        <ion-input name="line12" [(ngModel)]="pantoumInfo.lines.line1" type="text" placeholder="Line 12"></ion-input>\n        \n        <button ion-button color="dark" block type="submit">Submit</button>\n    </form>\n    \n    <!--  Prose Form  -->\n    <form id="proseF" *ngIf="formName == \'Prose\'" (ngSubmit)="prose(proseT, proseA, proseM)">\n        <ion-input name="title" [(ngModel)]="proseT" type="text" placeholder="Title"></ion-input>\n        <ion-input name="author" [(ngModel)]="proseA" type="text" placeholder="Author"></ion-input>\n        \n        <ion-textarea rows="10" placeholder="Your thoughts go here"></ion-textarea>\n        \n        <button ion-button color="dark" block type="submit">Submit</button>\n    </form>\n    \n    <!--  Triolet Form  -->\n    <form *ngIf="formName == \'Triolet\'" (ngSubmit)="triolet()">\n        <ion-input name="title" type="text" [(ngModel)]="trioletInfo.title" placeholder="Title"></ion-input>\n        <ion-input name="author" type="text" [(ngModel)]="trioletInfo.author" placeholder="Author"></ion-input>\n        \n        <ion-input name="line1" [(ngModel)]="trioletInfo.lines.line1" type="text" placeholder="Line 1"></ion-input>\n        <ion-input name="line2" [(ngModel)]="trioletInfo.lines.line2" type="text" placeholder="Line 2"></ion-input>\n        <ion-input name="line3" [(ngModel)]="trioletInfo.lines.line3" type="text" placeholder="Line 3"></ion-input>\n        <ion-input name="line4" [(ngModel)]="trioletInfo.lines.line1" type="text" placeholder="Line 4"></ion-input>\n        <ion-input name="line5" [(ngModel)]="trioletInfo.lines.line5" type="text" placeholder="Line 5"></ion-input>\n        <ion-input name="line6" [(ngModel)]="trioletInfo.lines.line6" type="text" placeholder="Line 6"></ion-input>\n        <ion-input name="line7" [(ngModel)]="trioletInfo.lines.line1" type="text" placeholder="Line 7"></ion-input>\n        <ion-input name="line8" [(ngModel)]="trioletInfo.lines.line2" type="text" placeholder="Line 8"></ion-input>\n        \n        <button ion-button color="dark" block type="submit">Submit</button>\n    </form>\n</ion-content>\n'/*ion-inline-end:"/Users/lazaryo/apps/poetry-v3/src/pages/submit/submit.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_fire_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], SubmitPage);

//# sourceMappingURL=submit.js.map

/***/ }),

/***/ 202:
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
webpackEmptyAsyncContext.id = 202;

/***/ }),

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/form/form.module": [
		502,
		5
	],
	"../pages/profile/profile.module": [
		503,
		4
	],
	"../pages/random/random.module": [
		504,
		3
	],
	"../pages/signup/signup.module": [
		505,
		2
	],
	"../pages/single/single.module": [
		506,
		1
	],
	"../pages/submit/submit.module": [
		507,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 243;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(430);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_all_all__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_random_random__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_single_single__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_form_form__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_submit_submit__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_profile_profile__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_signup_signup__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_fire__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_fire_database__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_fire_auth__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_login_login__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pipes_lines_pipe__ = __webpack_require__(501);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















const firebaseConfig = {
    apiKey: "AIzaSyDFURqOVF-HF5AqFTWpurg8_VZXxr-ufWo",
    authDomain: "poetry-prototype.firebaseapp.com",
    databaseURL: "https://poetry-prototype.firebaseio.com",
    projectId: "poetry-prototype",
    storageBucket: "poetry-prototype.appspot.com",
    messagingSenderId: "289304009059"
};
/* unused harmony export firebaseConfig */

let AppModule = class AppModule {
};
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_all_all__["a" /* AllPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_random_random__["a" /* RandomPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_single_single__["a" /* SinglePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_form_form__["a" /* FormPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_profile_profile__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_submit_submit__["a" /* SubmitPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_signup_signup__["a" /* SignUpPage */],
            __WEBPACK_IMPORTED_MODULE_19__pipes_lines_pipe__["a" /* LinesPipe */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/form/form.module#FormPageModule', name: 'FormPage', segment: 'form', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/random/random.module#RandomPageModule', name: 'RandomPage', segment: 'random', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/signup/signup.module#SignUpPageModule', name: 'SignUpPage', segment: 'signup', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/single/single.module#SinglePageModule', name: 'SinglePage', segment: 'single', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/submit/submit.module#SubmitPageModule', name: 'SubmitPage', segment: 'submit', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_15__angular_fire__["a" /* AngularFireModule */].initializeApp(firebaseConfig, 'burn'),
            __WEBPACK_IMPORTED_MODULE_16__angular_fire_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_17__angular_fire_auth__["b" /* AngularFireAuthModule */],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_random_random__["a" /* RandomPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_all_all__["a" /* AllPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_single_single__["a" /* SinglePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_form_form__["a" /* FormPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_profile_profile__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_submit_submit__["a" /* SubmitPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_signup_signup__["a" /* SignUpPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_16__angular_fire_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_18__providers_login_login__["a" /* LoginProvider */],
            __WEBPACK_IMPORTED_MODULE_19__pipes_lines_pipe__["a" /* LinesPipe */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 493:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_profile_profile__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_all_all__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_random_random__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_submit_submit__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_fire_auth__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_fire_database__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












let MyApp = class MyApp {
    constructor(platform, statusBar, splashScreen, afAuth, db) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.afAuth = afAuth;
        this.db = db;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'All Poetry', component: __WEBPACK_IMPORTED_MODULE_6__pages_all_all__["a" /* AllPage */] },
            { title: 'Random Poetry', component: __WEBPACK_IMPORTED_MODULE_7__pages_random_random__["a" /* RandomPage */] },
            { title: 'Add a Poem', component: __WEBPACK_IMPORTED_MODULE_8__pages_submit_submit__["a" /* SubmitPage */] },
        ];
        this.checkingUser();
    }
    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
    openPage(page) {
        this.nav.setRoot(page.component, { userID: window.localStorage.getItem('currentuser'), provider: window.localStorage.getItem('provider') });
    }
    checkingUser() {
        this.afAuth.authState.subscribe(res => {
            if (res && res.uid) {
                this.hasUser = true;
                //                this.nav.setRoot(HomePage);
            }
            else {
                this.hasUser = false;
                this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */]);
            }
        });
    }
    getProvider() {
        this.afAuth.authState.subscribe((user) => {
            console.log(user);
        });
    }
    toProfile() {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_5__pages_profile_profile__["a" /* ProfilePage */], { userID: window.localStorage.getItem('currentuser'), provider: window.localStorage.getItem('provider') }, { animate: true, animation: 'wp-transition', direction: 'forward' });
    }
    logout() {
        window.localStorage.removeItem('currentuser');
        window.localStorage.removeItem('provider');
        this.afAuth.auth.signOut();
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */], {}, { animate: true, animation: 'wp-transition', direction: 'forward' });
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/lazaryo/apps/poetry-v3/src/app/app.html"*/'<ion-menu [content]="content" side="left" id="main">\n    <ion-header>\n        <ion-toolbar>\n            <ion-title>Poetry</ion-title>\n        </ion-toolbar>\n    </ion-header>\n\n    <ion-content>\n        <ion-list>\n            <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n            {{p.title}}\n            </button>\n            <button menuClose ion-item *ngIf="hasUser" (click)="toProfile()">\n            Profile\n            </button>\n            <button menuClose ion-item *ngIf="hasUser" (click)="logout()">\n            Logout\n            </button>\n        </ion-list>\n    </ion-content>\n\n</ion-menu>\n\n<!--\n<ion-menu [content]="content" side="right" id="profile">\n    <ion-header>\n        <ion-toolbar>\n            <ion-title>Profile</ion-title>\n        </ion-toolbar>\n    </ion-header>\n\n    <ion-content>\n        <ion-list>\n            <button menuClose ion-item *ngIf="hasUser" (click)="toProfile()">\n            Profile\n            </button>\n            <button menuClose ion-item *ngIf="hasUser" (click)="logout()">\n            Logout\n            </button>\n        </ion-list>\n    </ion-content>\n\n</ion-menu>\n-->\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/Users/lazaryo/apps/poetry-v3/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_10__angular_fire_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_11__angular_fire_database__["a" /* AngularFireDatabase */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 501:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinesPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let LinesPipe = class LinesPipe {
    transform(value, args) {
        let keys = [];
        for (let key in value) {
            keys.push({ key: key, value: value[key] });
        }
        return keys;
    }
};
LinesPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({ name: 'lines' })
], LinesPipe);

//# sourceMappingURL=lines.pipe.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SinglePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let SinglePage = class SinglePage {
    constructor(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.title = navParams.get('title');
        this.author = navParams.get('author');
        this.formType = navParams.get('formType');
        this.lines = navParams.get('lines');
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad SinglePage');
    }
};
SinglePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-single',template:/*ion-inline-start:"/Users/lazaryo/apps/poetry-v3/src/pages/single/single.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle="left" start>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>\n            {{title}}\n        </ion-title>\n        <button ion-button menuToggle="right" end>\n            <ion-icon name="person"></ion-icon>\n        </button>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding ngClass="selectable">\n\n    <ion-card>\n        <ion-card-header>\n            <h2>{{ author }}</h2>\n            <small>{{ formType }}</small>\n        </ion-card-header>\n\n        <ion-card-content>\n            <p ion-text>\n                <span *ngFor="let line of lines | lines">\n                    {{line.value}}<br><br *ngIf="formType == \'Prose\'">\n                </span>\n            </p>\n        </ion-card-content>\n    </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/lazaryo/apps/poetry-v3/src/pages/single/single.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
], SinglePage);

//# sourceMappingURL=single.js.map

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_database__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_auth__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_login_login__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__signup_signup__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








let LoginPage = class LoginPage {
    constructor(navCtrl, navParams, afAuth, db, _lp, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.db = db;
        this._lp = _lp;
        this.toastCtrl = toastCtrl;
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }
    loggedInToast() {
        const toast = this.toastCtrl.create({
            message: 'Logged in successfully',
            showCloseButton: true,
            closeButtonText: 'Ok',
            position: 'top'
        });
        toast.present();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */], {}, { animate: true, animation: 'wp-transition', direction: 'forward' });
    }
    loginWithGoogle() {
        console.log('Logging in with Google');
        this._lp.signInWithGoogle();
        this.loggedInToast();
    }
    loginWithFacebook() {
        console.log('Logging in with Facebook');
        this._lp.signInWithFacebook();
        this.loggedInToast();
    }
    openSignUp() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__signup_signup__["a" /* SignUpPage */]);
    }
};
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"/Users/lazaryo/apps/poetry-v3/src/pages/login/login.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Login to Poetry</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <p>Login into the application through Google.</p>\n    \n    <br><button ion-button block color="dark" (click)="loginWithGoogle()"><ion-icon name="logo-google"></ion-icon>&nbsp;Login</button>\n    <br><button ion-button block clear color="danger" (click)="openSignUp()">SignUp</button>\n</ion-content>'/*ion-inline-end:"/Users/lazaryo/apps/poetry-v3/src/pages/login/login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_fire_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_2__angular_fire_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4__providers_login_login__["a" /* LoginProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_database__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__single_single__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let FormPage = class FormPage {
    constructor(navCtrl, navParams, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.ft = this.navParams.data.formType;
        this.poems = this.db.list('poems').valueChanges();
        this.forms = this.db.list('forms').valueChanges();
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad FormPage');
    }
    single(poem) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__single_single__["a" /* SinglePage */], poem);
    }
};
FormPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-form',template:/*ion-inline-start:"/Users/lazaryo/apps/poetry-v3/src/pages/form/form.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button icon-only menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n\n        <ion-title>{{ft}} Poetry</ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <ng-container *ngFor="let form of forms | async">\n        <p *ngIf="form.name == ft">{{form.desc}}</p>\n    </ng-container>\n\n    <ng-container *ngFor="let poem of poems | async">\n        <ion-item no-lines no-padding *ngIf="poem.verified == true && poem.formType == ft">\n            <button ion-button clear color="dark" (click)="single(poem)">{{poem.title}}</button>\n            <p class="author">{{poem.author}}</p>\n            <p ion-text item-right color="danger">{{poem.formType}}</p>\n        </ion-item>\n    </ng-container>\n</ion-content>\n'/*ion-inline-end:"/Users/lazaryo/apps/poetry-v3/src/pages/form/form.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_fire_database__["a" /* AngularFireDatabase */]])
], FormPage);

//# sourceMappingURL=form.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RandomPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_database__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let RandomPage = class RandomPage {
    constructor(navCtrl, navParams, _af) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._af = _af;
        this.newID = '-KE3eGjJQ-d2O3IcN-kg';
        this.poems = this._af.list('poems/').valueChanges();
        this.newPoem();
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad RandomPage');
    }
    newPoem() {
        this.poems.subscribe(items => {
            this.ids = Object.keys(items);
            var rn = Math.floor(Math.random() * this.ids.length);
            this.newID = this.ids[rn];
            console.log(items);
            this.single = items[this.newID];
        });
        this.single = this._af.object('poems/' + this.newID).valueChanges();
    }
};
RandomPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-random',template:/*ion-inline-start:"/Users/lazaryo/apps/poetry-v3/src/pages/random/random.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Random Poem</ion-title>\n\n        <ion-buttons end>\n            <button ion-button icon-only (click)="newPoem()">\n                <ion-icon name="refresh"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <ion-card>\n        <ion-card-header>\n            <h2>{{ single.title }}</h2>\n            <small>{{ single.author }}</small>\n        </ion-card-header>\n\n        <ion-card-content>\n            <p *ngFor="let line of single.lines | lines">{{line.value}}</p>\n        </ion-card-content>\n    </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/lazaryo/apps/poetry-v3/src/pages/random/random.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_fire_database__["a" /* AngularFireDatabase */]])
], RandomPage);

//# sourceMappingURL=random.js.map

/***/ })

},[297]);
//# sourceMappingURL=main.js.map