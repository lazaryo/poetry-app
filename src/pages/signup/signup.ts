import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginProvider } from '../../providers/login/login';

@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignUpPage {
    signUpType: string = 'email';

    google = {
        name: ''
    };
    
    enp = {
        name: '',
        email: '',
        password: ''
    }
    
    userVars = {
        admin: false,
        anon: false,
        displayName: 'John Doe',
        owner: false,
        mod: false,
        email: '',
        profilePicture: 'https://api.adorable.io/avatars/250/malik.png',
        provider: 'google',
        verifiedUser: false
    }

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public fireAuth: AngularFireAuth,
        public loginProvider: LoginProvider,
        public toastCtrl: ToastController)
    {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SignupPage');
    }
    
    changeSignUp(suType) {
        this.signUpType = suType;
    }
    
    enpSignUp() {
        this.userVars.displayName = this.enp.name
        this.userVars.email = this.enp.email
        this.userVars.provider = 'email'
        this.loginProvider.signUpWithEmail(this.enp, this.userVars);
        
        this.messageToast('Email verification sent.');
    }
    
    messageToast(text: string) {
        let toast = this.toastCtrl.create({
            message: text,
            showCloseButton: true,
            closeButtonText: 'Ok',
            position: 'top'
        });
        toast.present(toast);
        this.navCtrl.setRoot(HomePage, {}, {animate: true, animation: 'wp-transition', direction: 'forward'});
    }
    
//    googleSignUp() {
//        this.userVars.displayName = this.google.name;
//        this.userVars.email = '';
//        this.userVars.provider = 'google';
//        this.loginProvider.signUpWithGoogle(this.userVars);
//    }
    
    backtoLogin() {
        this.navCtrl.setRoot(LoginPage, {}, {animate: true, animation: 'wp-transition', direction: 'forward'});
    }

}
