import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { AutocompletePage } from './places-autocomplete';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';
import { HydrantProvider } from '../../providers/hydrant/hydrant';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



//----------------- HOME PAGE CONSTRUCTOR -------------
export class HomePage {

    //----- LIST OF VARIABLES -------
    longitude: any;
    latitude: any;
    buildings$: any;
    hydData: any;
    bestHyd: {
      id: number,
      dist: number,
    };
    buildingArr: any[];


//-------- CONSTRUCTOR FOR CALCULATING THE HOME.TS PAGE -----------
  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    private afData: AngularFireDatabase,
    private geolocation: Geolocation,
    public hydInfo: HydrantProvider,
    private alertCtrl: AlertController,
    private LaunchNavigator: LaunchNavigator) {

    //--------- LOAD ALL THE BUILDINGS ----------
    this.loadBuildings(40.5252208, -74.4411696);
  }



  //------------ OPEN MODAL FOR THE PAGES --------
  openModal(){
    let autocompleteModal = this.modalCtrl.create(AutocompletePage);
    autocompleteModal.present();
    autocompleteModal.onDidDismiss(data=> {
      if (data){
        let addressData = data;
        this.createBuilding(addressData);
      }
    })
  }


  //------------- CREATE FIRE -------------
  createBuilding(addressData) {
    let ref = this.afData.database.ref(`buildings`)
    let key = ref.push().key
    let obj = {
      address: addressData.address,
      lat: addressData.lat,
      lng: addressData.lng,
      id: key,
      name: addressData.name
    }
    ref.child(key).update(obj);
  }


  //----------------- GEO LOCATION -----------
   getLocation(){
     this.geolocation.getCurrentPosition().then((resp) => {

      console.log("THIS FUNCTION IS CALLED");

     this.longitude = resp.coords.longitude;
     this.latitude = resp.coords.latitude;
     console.log("Finished getting geolocation");
     this.loadBuildings(this.latitude, this.longitude)


    //  this.calcBest();
     console.log("HO",this.longitude,this.latitude);
     // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  //-----------Calculate how far away the fire is
  loadBuildings(lat, lng) {
      this.buildings$ = this.afData.list("buildings").valueChanges();
      this.buildings$.subscribe(buildingArr=> {
        this.buildingArr = buildingArr;
        this.buildingArr.forEach(building=>{
          let buildingLat = building.lat
          let buildingLng = building.lng
          building.count = 0;

          building.distance = this.calculateDistance(lat, lng, buildingLat, buildingLng).toFixed(2);
          console.log(building.distance);
        })

        this.buildingArr.sort(function(x,y){
          return x.distance - y.distance;
        })
      })


  }
  //--------- LAUNCH DIRECTION -----------
  launchDirection(building){
    console.log('This function is triggered');
    console.log(building)
      let options: LaunchNavigatorOptions = {
      start: '40.5252208, -74.4411696',
      // app: this.LaunchNavigator.APP
    };

    this.LaunchNavigator.navigate([building.lat, building.lng], options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }


  //----------- CALCULATE DISTANCE ----------
  calculateDistance(lat1,lon1,lat2,lon2){

      let R = 6371; // Radius of the earth in km
      let dLat = this.deg2rad(lat2-lat1);  // deg2rad below
      var dLon = this.deg2rad(lon2-lon1);
      var a =Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c; // Distance in km
      //console.log(d);
      return d;
  }


  //----------- DEGREE CONVERSION ---------
  deg2rad(deg) {
      return deg * (Math.PI/180)
  }




  async removeBuilding(building){
    let alert = this.alertCtrl.create({
      title: "Remove building?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },

        {
          text: 'OK',
          handler: ()=> {

            this.afData.database.ref(`buildings/${building.id}`).remove();


          }
        }
      ]
    })
    alert.present();
  }
}
