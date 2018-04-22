import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { HttpModule } from '@angular/http';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ShooterPage } from '../pages/shooter/shooter';
import { EmergencyPage } from '../pages/emergency/emergency';


//--------- IONIC NATIVE MODULES --------
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { DBMeter } from '@ionic-native/db-meter';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireAuthModule } from 'angularfire2/auth';
import {IonicStorageModule } from '@ionic/storage'


//--------- MODALS STUFF -------
import { AutocompletePage } from '../pages/home/places-autocomplete';
import { HydrantProvider } from '../providers/hydrant/hydrant';
import { HttpClientModule } from '@angular/common/http';

export const firebaseConfig = {
    apiKey: "AIzaSyBKbuAZewGkhTx9tpCW3rPAfVfYN2oW0Vo",
    authDomain: "firehydrant-6dcc5.firebaseapp.com",
    databaseURL: "https://firehydrant-6dcc5.firebaseio.com",
    projectId: "firehydrant-6dcc5",
    storageBucket: "firehydrant-6dcc5.appspot.com",
    messagingSenderId: "560832838956"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ShooterPage,
    EmergencyPage,
    AutocompletePage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ShooterPage,
    EmergencyPage,
    AutocompletePage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    LaunchNavigator,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    HydrantProvider,
    HttpClientModule,
    DBMeter
  ]
})
export class AppModule {}
