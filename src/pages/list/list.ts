import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {} from '@types/googlemaps';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  @ViewChild('gmap') gmapElement: any;
  fireMap: google.maps.Map;
  marker: google.maps.Marker;
  mylatlang = google.maps.LatLng;
  hydrantsArr: any;
  markerArr: any;

  constructor(
      public navCtrl: NavController,
      private afData: AngularFireDatabase,
      public navParams: NavParams,
      private storage: Storage,
      private toastCtrl: ToastController) {

  }


  //---------------- INIT MAP -------------
      async ngOnInit() {
      let toast = this.toastCtrl.create({
        message: 'Red marker are gun shots, blue are safe',
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();



        var mapProp = {
             center: new google.maps.LatLng(40.4995488, -74.4443186),
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.fireMap = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        let markerData = this.afData.list(`buildings`).valueChanges();
        markerData.subscribe(markerArr=> {
            markerArr.forEach(markerInfo=> {
                console.log(markerInfo);
                let lat = markerInfo['lat']
                let lng = markerInfo['lng']
                let marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    map: this.fireMap,
                    icon: '../assets/imgs/blue.png'
                })

            })
        })


        //------- GUN SHOT MARKER GOES HERE ------
        let gunshot = new google.maps.Marker({
            position: new google.maps.LatLng(40.4995488, -74.4443186),
            map: this.fireMap,
        })
    }
}
