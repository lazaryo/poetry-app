import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';

@IonicPage()
@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
})
export class AboutPage {
    about = {
        title: '',
        version: '',
        email: '',
        body: '',
        technologies: {}
    }

    constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
//        db.object('about').valueChanges().subscribe(response => {
//            this.about = response;
//        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AboutPage');
        
        this.db.object('about').valueChanges().subscribe(response => {
            this.about.title = response['title'];
            this.about.version = response['version'];
            this.about.body = response['body'];
            this.about.email = response['email'];
            this.about.technologies = response['technologies'];
        });
    }

}
