import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { SinglePage } from '../single/single';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
    ft: any;
    poems: Observable<any[]>;
    forms: Observable<any[]>;
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
        this.ft = this.navParams.data.formType;
        this.poems = this.db.list('poems').valueChanges();
        this.forms = this.db.list('forms').valueChanges();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FormPage');
    }
    
    single(poem) {
        this.navCtrl.push(SinglePage, poem);
    }

}
