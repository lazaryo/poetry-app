import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'page-submit',
    templateUrl: 'submit.html',
})

export class SubmitPage {
    verified: any;
    poems: any;
    forms: Observable<any>;
    poem: any;
    formName: any;
    formDesc: any;
    examples: any;
    paragraphs: any;
    changeView = true;
    haikuInfo = {
            title: '',
            author: '',
            lines: {
                line1: '',
                line2: '',
                line3: ''
            },
            formType: 'Haiku',
            verified: false,
            auid: this.navParams.get('userID'),
            disappear: false
        }
    
    pantoumInfo = {
            title: '',
            author: '',
            lines: {
                line1: '',
                line2: '',
                line3: '',
                line4: '',
                line5: '',
                line6: '',
                line7: '',
                line8: '',
                line9: '',
                line10: '',
                line11: '',
                line12: ''
            },
            formType: 'Pantoum',
            verified: false,
            // this would be a variable in production
            auid: this.navParams.get('userID'),
            disappear: false
        }
    
    trioletInfo = {
        title: '',
        author: '',
        lines: {
            line1: '',
            line2: '',
            line3: '',
            line4: '',
            line5: '',
            line6: '',
            line7: '',
            line8: ''
        },
        formType: 'Triolet',
        verified: false,
        // this would be a variable in production
        auid: this.navParams.get('userID'),
        disappear: false
    }
    
    proseInfo = {
        title: '',
        author: '',
        lines: {},
        formType: 'Prose',
        verified: false,
        // this would be a variable in production
        auid: this.navParams.get('userID'),
        disappear: false
    }
    
    constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public _af: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController) {
        this.forms = this._af.list('forms').valueChanges();
        this.poems = this._af.list('/poems');
        
        this._af.object('users/' + this.navParams.data.userID).valueChanges().subscribe(res => {
            this.verified = res['verifiedUser'];
            
            // setting the author name
            this.haikuInfo.author = res['displayName'];
            this.pantoumInfo.author = res['displayName'];
            this.proseInfo.author = res['displayName'];
            this.trioletInfo.author = res['displayName'];
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SubmitPage');
    }
    
    goAnon() {
        this.haikuInfo.author = '';
        this.pantoumInfo.author = '';
        this.proseInfo.author = '';
        this.trioletInfo.author = '';
    }
    
    seeDesc(formKey, formKeys) {
        if (!formKey) {
            this.formTypeAlert();
        } else {
          this._af.object('forms').valueChanges().subscribe(ok => {
                formKeys = Object["values"](ok);
                for (let form of formKeys) {
                    if (form.name == formKey) {
                        this.formDesc = form.desc;
                        this.formTypeAlert();
                    }
                }
            })
        }
    }
    
    formTypeAlert() {
        let title, subTitle;
        if (!this.formName) {
            title = 'Error';
            subTitle = 'No Form Type Selected';
        } else {
            title = this.formName;
            subTitle = this.formDesc;
        }
        
        const alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
    }
    
    viewExample() {
        this.changeView = !this.changeView;
    }

    haiku(){
        // if the title input is empty
        if (this.haikuInfo.title == undefined || this.haikuInfo.title == '') {
            this.haikuInfo.title = "Untitled";
        }
        
        // if the author input is empty
        if (this.haikuInfo.author == undefined || this.haikuInfo.author == '') {
            this.haikuInfo.author = "Anonymous";
        }
        
        // adding data to poem object
        this.poem = {
            title: this.haikuInfo.title,
            author: this.haikuInfo.author,
            lines: {
                line1: this.haikuInfo.lines.line1,
                line2: this.haikuInfo.lines.line2,
                line3: this.haikuInfo.lines.line3
            },
            formType: 'Haiku',
            verified: false,
            // this would be a variable in production
            auid: this.navParams.get('userID'),
            disappear: false
        }
        
        // Adding Haiku to Firebase Database
        this.poems.push(this.poem);
        console.log('Pushed ' + this.haikuInfo.title + ' by ' + this.haikuInfo.author + ' to the database!');
        this.poem = '';
        this.haikuInfo = {
            title: '',
            author: '',
            lines: {
                line1: '',
                line2: '',
                line3: ''
            },
            formType: 'Haiku',
            verified: false,
            auid: this.navParams.get('userID'),
            disappear: false
        }
    }
    
    pantoum(){
        // if the title input is empty
        if (this.pantoumInfo.title == undefined || this.pantoumInfo.title == '') {
            this.pantoumInfo.title = "Untitled";
        }
        
        // if the author input is empty
        if (this.pantoumInfo.author == undefined || this.pantoumInfo.author == '') {
            this.pantoumInfo.author = "Anonymous";
        }
        
        // adding data to poem object
        this.poem = {
            title: this.pantoumInfo.title,
            author: this.pantoumInfo.author,
            lines: {
                line1: this.pantoumInfo.lines.line1,
                line2: this.pantoumInfo.lines.line2,
                line3: this.pantoumInfo.lines.line3,
                line4: this.pantoumInfo.lines.line4,
                line5: this.pantoumInfo.lines.line2,
                line6: this.pantoumInfo.lines.line6,
                line7: this.pantoumInfo.lines.line4,
                line8: this.pantoumInfo.lines.line8,
                line9: this.pantoumInfo.lines.line6,
                line10: this.pantoumInfo.lines.line3,
                line11: this.pantoumInfo.lines.line8,
                line12: this.pantoumInfo.lines.line1
            },
            formType: 'Pantoum',
            verified: false,
            // this would be a variable in production
            auid: this.navParams.get('userID'),
            disappear: false
        }
        
        // Adding Pantoum to Firebase Database
        this.poems.push(this.poem);
        console.log('Pushed ' + this.pantoumInfo.title + ' by ' + this.pantoumInfo.author + ' to the database!');
        this.poem = '';
        this.pantoumInfo = {
            title: '',
            author: '',
            lines: {
                line1: '',
                line2: '',
                line3: '',
                line4: '',
                line5: '',
                line6: '',
                line7: '',
                line8: '',
                line9: '',
                line10: '',
                line11: '',
                line12: ''
            },
            formType: 'Pantoum',
            verified: false,
            // this would be a variable in production
            auid: this.navParams.get('userID'),
            disappear: false
        }
    }
    
    prose() {
        // if the title input is empty
        if (this.proseInfo.title == undefined || this.proseInfo.title == '') {
            this.proseInfo.title = "Untitled";
        }
        
        // if the author input is empty
        if (this.proseInfo.author == undefined || this.proseInfo.author == '') {
            this.proseInfo.author = "Anonymous";
        }
        
        var sections = this.paragraphs.split(/\n/);
        var paragraphs = [];
        for (var i = 0; i < sections.length; i++) {
            if (/\S/.test(sections[i])) {
                paragraphs.push(sections[i].trim());
            }
        }
        
        var lines = {};
        i = 0;
        
        while (i < paragraphs.length) {
            let j = i + 1;
            var newProp = 'line' + j;
            lines[newProp] = paragraphs[i];
            i++;
        }
        
        this.proseInfo.lines = lines;
        
        this.poems.push(this.proseInfo);
        console.log('Pushed ' + this.proseInfo.title + ' by ' + this.proseInfo.author + ' to the database!');
        this.proseInfo = {
            title: '',
            author: '',
            lines: {},
            formType: 'Prose',
            verified: false,
            // this would be a variable in production
            auid: this.navParams.get('userID'),
            disappear: false
        }
        
        this.paragraphs = '';
    }
    
    triolet(){
        // if the title input is empty
        if (this.trioletInfo.title == undefined || this.trioletInfo.title == '') {
            this.trioletInfo.title = "Untitled";
        }
        
        // if the author input is empty
        if (this.trioletInfo.author == undefined || this.trioletInfo.author == '') {
            this.trioletInfo.author = "Anonymous";
        }
        
        // adding data to poem object
        this.poem = {
            title: this.trioletInfo.title,
            author: this.trioletInfo.author,
            lines: {
                line1: this.trioletInfo.lines.line1,
                line2: this.trioletInfo.lines.line2,
                line3: this.trioletInfo.lines.line3,
                line4: this.trioletInfo.lines.line1,
                line5: this.trioletInfo.lines.line5,
                line6: this.trioletInfo.lines.line6,
                line7: this.trioletInfo.lines.line1,
                line8: this.trioletInfo.lines.line2
            },
            formType: 'Triolet',
            verified: false,
            // this would be a variable in production
            auid: this.navParams.get('userID'),
            disappear: false
        }
        
        // Adding Triolet to Firebase Database
        this.poems.push(this.poem);
        console.log('Pushed ' + this.trioletInfo.title + ' by ' + this.trioletInfo.author + ' to the database!');
        this.poem = '';
        this.trioletInfo = {
            title: '',
            author: '',
            lines: {
                line1: '',
                line2: '',
                line3: '',
                line4: '',
                line5: '',
                line6: '',
                line7: '',
                line8: ''
            },
            formType: 'Triolet',
            verified: false,
            // this would be a variable in production
            auid: this.navParams.get('userID'),
            disappear: false
        }
    }
}
