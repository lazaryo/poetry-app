import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginProvider } from '../../providers/login/login';

@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignUpPage {
    signUpType: string = 'google';
    users;

    google = {
        name: ''
    };
    
    userVars = {
        admin: false,
        anon: false,
        displayName: 'John Doe',
        owner: false,
        profilePicture: 'https://api.adorable.io/avatars/250/malik.png',
        provider: 'google',
        verifiedUser: false
    }

    constructor(public navCtrl: NavController, public navParams: NavParams, public fireAuth: AngularFireAuth, public loginProvider: LoginProvider) {
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
        this.navCtrl.setRoot(LoginPage, {}, {animate: true, animation: 'wp-transition', direction: 'forward'});
    }

}
