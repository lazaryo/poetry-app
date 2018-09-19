import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AllPage } from '../pages/all/all';
import { RandomPage } from '../pages/random/random';
import { LoginPage } from '../pages/login/login';
import { SinglePage } from '../pages/single/single';
import { FormPage } from '../pages/form/form';
import { SubmitPage } from '../pages/submit/submit';
import { ProfilePage } from '../pages/profile/profile';
import { SignUpPage } from '../pages/signup/signup';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginProvider } from '../providers/login/login';
import { LinesPipe } from '../pipes/lines.pipe';

export const firebaseConfig = {
    apiKey: "AIzaSyDFURqOVF-HF5AqFTWpurg8_VZXxr-ufWo",
    authDomain: "poetry-prototype.firebaseapp.com",
    databaseURL: "https://poetry-prototype.firebaseio.com",
    projectId: "poetry-prototype",
    storageBucket: "poetry-prototype.appspot.com",
    messagingSenderId: "289304009059"
};

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        AllPage,
        RandomPage,
        LoginPage,
        SinglePage,
        FormPage,
        ProfilePage,
        SubmitPage,
        SignUpPage,
        LinesPipe
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig, 'burn'),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        RandomPage,
        AllPage,
        SinglePage,
        FormPage,
        ProfilePage,
        SubmitPage,
        SignUpPage,
        LoginPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AngularFireDatabase,
        LoginProvider,
        LinesPipe,
        InAppBrowser
    ]
})
export class AppModule {}
