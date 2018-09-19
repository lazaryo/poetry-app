import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { AngularFireDatabase } from '@angular/fire/database';
//import { Observable } from 'rxjs';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Injectable()
export class LoginProvider {
    public userF: firebase.User;
    newUser: any;
    public newUserInfo: any;
    public browser: any;
    
	constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, private iab: InAppBrowser) {
		afAuth.authState.subscribe(user => {
			this.userF = user;
        });
//        this.browser = this.iab.create('http://malikdh.com/');
	}
    
    setUserInfo(authInfo, userVars) {
        console.log(authInfo.uid);
        this.newUserInfo = {
            admin: false,
            anon: false,
            displayName: userVars.displayName,
            email: authInfo.email,
            verifiedEmail: false,
            profilePicture: userVars.profilePicture,
            provider: userVars.provider,
            verifiedUser: false
        };
        
        console.log(this.newUserInfo);
    }
    
    signUpWithGoogle(userVars) {
        console.log(userVars);
        console.log('Signing up with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider(), 'google', userVars, true, this.db);
    }
    
    signUpWithFacebook(userVars) {
        console.log(userVars);
    }
  
    signInWithFacebook() {
		console.log('Sign in with facebook');
		return this.oauthSignIn(new firebase.auth.FacebookAuthProvider(), 'facebook', {}, false, this.db);
	}

    signInWithGoogle() {
		console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider(), 'google', {}, false, this.db);
	}

    private oauthSignIn(provider: AuthProvider, signInProvider, userDBInfo, signup, db: AngularFireDatabase) {
		if (!(<any>window).cordova) {
			return this.afAuth.auth.signInWithPopup(provider)
            .then(function(result) {
              // This gives you a Google Access Token. You can use it to access the Google API.
              // var token = result.credential.accessToken;
                var myProp = 'accessToken';
                let token;

                if(result.credential.hasOwnProperty(myProp)){
                    token = result.credential[myProp];
                }
                
                // The signed-in user info.
                var user = result.user;
                console.log(token, user);
                let currentuser = user.uid;
                window.localStorage.setItem('currentuser', currentuser);
                let provider = signInProvider;
                window.localStorage.setItem('provider', provider);
                
                if (signup == true) {
                    let userRef = db.database.ref('/users/' + user.uid);
                    userDBInfo.displayName = user.displayName;
                    userRef.set(userDBInfo);
                }
                
            }).catch(function(error) {
                // Handle Errors here.
                // var errorCode = error.code;
                var errorMessage = error.message;
                // var email = error.email;
                
                // The firebase.auth.AuthCredential type that was used.
                // var credential = error.credential;
                console.log(errorMessage);
            });
		} else {
			return this.afAuth.auth.signInWithRedirect(provider)
			.then(() => {
				return this.afAuth.auth.getRedirectResult().then( result => {
                    var myProp = 'accessToken';
                    let token;

                    if(result.credential.hasOwnProperty(myProp)){
                        token = result.credential[myProp];
                    }
                    
					// The signed-in user info.
					let user = result.user;
					console.log(token, user);
				}).catch(function(error) {
					// Handle Errors here.
					alert(error.message);
				});
			});
		}
	}
}