import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SinglePage } from '../single/single';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {
    poemsRef: any;
    profilePoems: Observable<any>;
    showPoems = false;
    
    public userID: any;
    public newName: any;
    public changeInfo: any = false;
    userInfo: any;
    
    public info = {
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
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public db: AngularFireDatabase, public alertCtrl: AlertController) {
        this.poemsRef = db.list('poems');
        // Use snapshotChanges().map() to store the key
        this.profilePoems = this.poemsRef.snapshotChanges().pipe(
          map(changes => 
            changes['map'](c => ({ key: c.payload.key, ...c.payload.val() }))
          )
        );
        
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
            this.nameConfirmation('Error: Empty or Name hasn\'t changed')
        } else {
            this.nameConfirmation('Your name has been saved.');
            var user = this.afAuth.auth.currentUser;
        
            user.updateProfile({
                displayName: this.newName,
                photoURL: this.info.profilePicture
            }).then(function() {
                console.log('You\'re a new person now!');
            }, function(error) {
                console.log(error);
            });

            this.db.object('users/' + this.userID).update({displayName: this.newName});
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
        this.navCtrl.push(SinglePage, data)
    }
    
    removePoem(data) {
        console.log(data);
    }
    
    verifyEmail() {
        console.log('Verifying email...');
        this.afAuth.auth.currentUser.sendEmailVerification().then((res) => {
            this.db.object('users/' + this.userID).update({verifiedUser: true, verifiedEmail: true});
        });
        console.log('Email verified');
    }
}
