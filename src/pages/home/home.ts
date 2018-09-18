import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { RandomPage } from '../random/random';
import { AllPage } from '../all/all';
import { FormPage } from '../form/form';
import { LoginPage } from '../login/login';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    forms: Observable<any[]>;
    daily: Observable<any>;
    message: any;

    constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
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
        this.navCtrl.setRoot(AllPage, {}, {animate: true, animation: 'wp-transition', direction: 'forward'});
    }
    
    randomPoem() {
        this.navCtrl.setRoot(RandomPage, {}, {animate: true, animation: 'wp-transition', direction: 'forward'});
    }
    
    seeFormType(formType) {
        this.navCtrl.push(FormPage, {formType: formType}, {animate: true, animation: 'wp-transition', direction: 'forward'});
    }
    
    logout() {
        this.afAuth.auth.signOut();
        this.navCtrl.setRoot(LoginPage, {}, {animate: true, animation: 'wp-transition', direction: 'forward'});
    }
}
