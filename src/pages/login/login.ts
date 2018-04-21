import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';

// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(badge, password){
    if (badge && password){
      var email = badge+"@safespots.com";
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(success=> {
        this.navCtrl.setRoot(HomePage);

      }).catch(err=> {
        this.errorMessage = err.message;
      })
    }
    else {
      this.errorMessage = "Fill in the required spots.";
    }

  }

  move(){
      this.navCtrl.setRoot(HomePage);
  }

}
