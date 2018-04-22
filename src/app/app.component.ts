import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


//----------- IMPORT PAGE COMPONENTS HERE ---------
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ShooterPage } from '../pages/shooter/shooter';
import { EmergencyPage } from '../pages/emergency/emergency';
import { DBMeter } from '@ionic-native/db-meter';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;

  //------- VARIABLES AT THE PAGE ------
  pages: Array<{title: string, component: any, icon: any}>;
  name: any;
  img: any;
  id: any;

  constructor(
      public platform: Platform,
      public statusBar: StatusBar,
      public splashScreen: SplashScreen,
      private afAuth: AngularFireAuth,
      private dbMeter: DBMeter) {
      this.initializeApp();



    //--------
    let user = firebase.auth().currentUser;
    if (user){
        console.log('This is police');
        this.pages = [
          { title: 'Safe Buildings', component: HomePage, icon: "star" },
          { title: 'Map View ', component: ListPage, icon:"paper-plane" },
          { title: 'Students In Danger', component: EmergencyPage, icon: "warning" }
        ];

        this.name = "Officer Leo";
        this.id = "Badge #25423";
        this.img = "https://image.flaticon.com/icons/png/512/190/190624.png";
        console.log('This is police');
    }
    else{
        this.pages =  [
            { title: 'Safe Buildings', component: HomePage, icon: "star" },
            { title: 'Map View ', component: ListPage, icon:"paper-plane" },
            { title: 'Report My Location', component: ShooterPage, icon: "phone-portrait" },
        ]

        this.name = "Anna";
        this.id = "Rutgers University";
        this.img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwH6DalS_KpcvdezZT-tymCO2Spog0pW1g8ySWMhAPAohnxKNJ";
        console.log('This is student');
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      //----- DB METER STUFF ----
      try{
          let subscription = this.dbMeter.start().subscribe(
            data => {
                console.log(data);
            }
          );
          this.dbMeter.isListening().then(
            isListening => console.log(isListening)
          );
        }
    catch(e){
        console.log('Cordova not available');
    }
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
