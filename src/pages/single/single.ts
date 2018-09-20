import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormPage } from '../form/form';

@IonicPage()
@Component({
    selector: 'page-single',
    templateUrl: 'single.html',
})
export class SinglePage {
    public title:any;
    public author:any;
    public formType:any;
    public lines:any;
    
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.title = navParams.get('title');
        this.author = navParams.get('author');
        this.formType = navParams.get('formType');
        this.lines = navParams.get('lines');
    }
    
    seeFormType(formType) {
        this.navCtrl.push(FormPage, {formType: formType});
    }
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad SinglePage');
    }

}
