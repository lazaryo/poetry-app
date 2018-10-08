import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { AngularFireDatabase } from '@angular/fire/database';
//import { Observable } from 'rxjs';
//import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';

@Injectable()
export class LoginProvider {
//    private userF: firebase.User;
    newUserInfo: any;
    
	constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, public storage: Storage) {
//		afAuth.authState.subscribe(user => {
//			this.userF = user;
//		});
	}
    
    setUserInfo(authInfo, userVars) {
        console.log(authInfo.uid);
        this.newUserInfo = {
            admin: false,
            anon: false,
            owner: false,
            mod: false,
            displayName: userVars.displayName,
            email: authInfo.email,
            profilePicture: userVars.profilePicture,
            provider: userVars.provider,
            verifiedUser: false
        };
        
        console.log(this.newUserInfo);
    }
    
    signInWithEmail(enp) {
        console.log('Signing in with email');
        
        this.afAuth.auth.signInWithEmailAndPassword(enp.email, enp.password)
        .then(response => {
            console.log(response.user);
            
            let currentuser = response.user.uid
            window.localStorage.setItem('currentuser', currentuser);
            this.storage.set('currentuser', currentuser);
            
            let provider = 'email';
            window.localStorage.setItem('provider', provider);
            this.storage.set('provider', provider);
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorMessage = error.message;
            console.log(errorMessage);
        });
    }
    
    signUpWithEmail(enp, userVars) {
        console.log('Signing up with email');
        
        this.afAuth.auth.createUserWithEmailAndPassword(enp.email, enp.password).then((response) => {
            let newUser = response.user;
            console.log(newUser.uid);
            
            let currentuser = newUser.uid
//            window.localStorage.setItem('currentuser', currentuser);
            this.storage.set('currentuser', currentuser);
            let provider = 'email';
//            window.localStorage.setItem('provider', provider);
            this.storage.set('provider', provider);
            
            userVars.displayName = enp.name;
            userVars.email = enp.email;
            
            let newUserRef = this.db.database.ref('/users/' + currentuser);
            newUserRef.set(userVars);
            
            var user = this.afAuth.auth.currentUser;

            // send email verification (replace with toast)     
            user.sendEmailVerification().then((ok) => {
                console.log('Email verification sent.');
            }).catch(function(error) {
                // An error happened.
            });
            
            user.updateProfile({
                displayName: userVars.displayName,
                photoURL: userVars.profilePicture
            }).then(function() {
                // Update successful.
                console.log('Update successful.');
            }, function(error) {
                // An error happened.
                console.log(error);
            });
        }).catch(function(error) {
            // Handle Errors here.
            var errorMessage = error.message;
            console.log(errorMessage);
        });
    }
    
//    signUpWithGoogle(userVars) {
//        console.log(userVars);
//        console.log('Signing up with google');
//		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider(), 'google', userVars, true, this.db);
//    }

    signInWithGoogle() {
		console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider(), 'google');
	}
    
    private oauthSignIn(provider: AuthProvider, providerType) {
		if (!(<any>window).cordova) {
			return this.afAuth.auth.signInWithPopup(provider).then( result => {
					// This gives you a Google Access Token.
					// You can use it to access the Google API.
					var myProp = 'accessToken';
                    let token;

                    if (result.credential.hasOwnProperty(myProp)) {
                        token = result.credential[myProp];
                    }
                
					// The signed-in user info.
					let user = result.user;
                    this.storage.set('currentuser', user.uid);
                    this.storage.set('provider', providerType);
                
                    console.log('Token:', token);
				}).catch(function(error) {
					// Handle Errors here.
					alert(error.message);
				});;
		} else {
			return this.afAuth.auth.signInWithRedirect(provider)
			.then(() => {
				return this.afAuth.auth.getRedirectResult().then( result => {
					// This gives you a Google Access Token.
					// You can use it to access the Google API.
					var myProp = 'accessToken';
                    let token;

                    if(result.credential.hasOwnProperty(myProp)){
                        token = result.credential[myProp];
                    }
					// The signed-in user info.
					let user = result.user;
					this.storage.set('currentuser', user.uid);
                    this.storage.set('provider', providerType);
                
                    console.log('Token:', token);
				}).catch(function(error) {
					// Handle Errors here.
					alert(error.message);
				});
			});
		}
	}

//    private oauthSignIn(provider: AuthProvider, signInProvider, userDBInfo, signup, db: AngularFireDatabase) {
//		if (!(<any>window).cordova) {
//			return this.afAuth.auth.signInWithPopup(provider)
//            .then(function(result) {
//              // This gives you a Google Access Token. You can use it to access the Google API.
//              // var token = result.credential.accessToken;
//                var myProp = 'accessToken';
//                let token;
//
//                if(result.credential.hasOwnProperty(myProp)){
//                    token = result.credential[myProp];
//                }
//                
//                // The signed-in user info.
//                var user = result.user;
//                console.log(token, user);
//                let currentuser = user.uid;
//                window.localStorage.setItem('currentuser', currentuser);
//                let provider = signInProvider;
//                window.localStorage.setItem('provider', provider);
//                
//                if (signup == true) {
//                    let userRef = db.database.ref('/users/' + user.uid);
//                    userDBInfo.displayName = user.displayName;
//                    userRef.set(userDBInfo);
//                }
//                
//            }).catch(function(error) {
//                // Handle Errors here.
//                // var errorCode = error.code;
//                var errorMessage = error.message;
//                // var email = error.email;
//                
//                // The firebase.auth.AuthCredential type that was used.
//                // var credential = error.credential;
//                console.log(errorMessage);
//            });
//		} else {
//			return this.afAuth.auth.signInWithRedirect(provider)
//			.then(() => {
//				return this.afAuth.auth.getRedirectResult().then( result => {
//                    var myProp = 'accessToken';
//                    let token;
//
//                    if(result.credential.hasOwnProperty(myProp)){
//                        token = result.credential[myProp];
//                    }
//                    
//					// The signed-in user info.
//					let user = result.user;
//					console.log(token, user);
//				}).catch(function(error) {
//					// Handle Errors here.
//					alert(error.message);
//				});
//			});
//		}
//	}
}