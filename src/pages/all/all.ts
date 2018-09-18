import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { FormPage } from '../form/form';
import { SinglePage } from '../single/single';

@Component({
    selector: 'page-all',
    templateUrl: 'all.html',
})

export class AllPage {
    poems: Observable<any[]>;

    constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
        this.poems = db.list('poems').valueChanges();    
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AllPage');
    }
    
    singlePoem(title, author, ft, lines) {
        this.navCtrl.push(SinglePage, {
            title: title, author: author, formType: ft, lines: lines
        });
    }
    
    seeFormType(formType) {
        this.navCtrl.push(FormPage, {formType: formType});
    }
}
