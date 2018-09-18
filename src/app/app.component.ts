import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { AllPage } from '../pages/all/all';
import { RandomPage } from '../pages/random/random';
import { SubmitPage } from '../pages/submit/submit';
import { LoginPage } from '../pages/login/login';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;
    
    hasUser: any;
    pages: Array<{title: string, component: any}>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
        this.initializeApp();

        this.pages = [
            { title: 'Home', component: HomePage },
            { title: 'All Poetry', component: AllPage },
            { title: 'Random Poetry', component: RandomPage },
            { title: 'Add a Poem', component: SubmitPage },
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
        this.nav.setRoot(page.component, {userID: window.localStorage.getItem('currentuser'), provider: window.localStorage.getItem('provider')});
    }
    checkingUser() {
        this.afAuth.authState.subscribe(res => {
            if (res && res.uid) {
                this.hasUser = true
//                this.nav.setRoot(HomePage);
            } else {
                this.hasUser = false
                this.nav.setRoot(LoginPage);
            }
        });
    }
    
    getProvider() {
        this.afAuth.authState.subscribe((user) => {
            console.log(user);
        });
    }
    
    toProfile() {
        this.nav.push(ProfilePage, {userID: window.localStorage.getItem('currentuser'), provider: window.localStorage.getItem('provider')}, {animate: true, animation: 'wp-transition', direction: 'forward'});
    }
    
    logout() {
        window.localStorage.removeItem('currentuser');
        window.localStorage.removeItem('provider');
        this.afAuth.auth.signOut();
        this.nav.setRoot(LoginPage, {}, {animate: true, animation: 'wp-transition', direction: 'forward'});
    }
}
