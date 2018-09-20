import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { FormPage } from '../form/form';

@IonicPage()
@Component({
    selector: 'page-random',
    templateUrl: 'random.html',
})

export class RandomPage {
    poems: Observable<any[]>;
    single: Observable<any>;
    public ids;
    public newID = '-KE3eGjJQ-d2O3IcN-kg';    

    constructor(public navCtrl: NavController, public navParams: NavParams, public _af: AngularFireDatabase) {
        this.poems = this._af.list('poems/').valueChanges();
        this.newPoem();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RandomPage');
    }
    
    seeFormType(formType) {
        this.navCtrl.push(FormPage, {formType: formType});
    }
    
    refreshPoem(refresher) {
        console.log('Begin async operation', refresher);

        setTimeout(() => {
            console.log('Async operation has ended');
            this.newPoem();
            refresher.complete();
        }, 1000);
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
}
