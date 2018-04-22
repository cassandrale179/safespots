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

import {AngularFireDatabase } from 'angularfire2/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any, icon: any}>;

  constructor(
      public platform: Platform,
      public statusBar: StatusBar,
      public splashScreen: SplashScreen,
      private afData: AngularFireDatabase,
      private dbMeter: DBMeter) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Safe Buildings', component: HomePage, icon: "star" },
      { title: 'Map View ', component: ListPage, icon:"paper-plane" },
      { title: 'Students In Danger', component: EmergencyPage, icon: "warning" },
      { title: 'Report My Location', component: ShooterPage, icon: "phone-portrait" }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      //----- DB METER STUFF ----
      try{
          let subscription = this.dbMeter.start().subscribe(
            data => {
              console.log(data)
              if (data>90){
                //-----SEND TEXT TO PEOPLE------------- 
                this.afData.database.ref('gunshots').update({
                  gunshot: true
                })
              }
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
