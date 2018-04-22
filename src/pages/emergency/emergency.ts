import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-emergency',
  templateUrl: 'emergency.html',
})
export class EmergencyPage {

    //---- VARIABLES -----
    studentsArr: any;
    rescueArr: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      private alertCtrl: AlertController, private afData: AngularFireDatabase) {
  }


//----------- LOAD STUDENTS -------
  ionViewDidLoad() {
      this.studentsArr = [];
      var names = ["Joseph", "Ann", "Vivian", "Emily", "Cheng"];
      var status = ["Unknown", "No Reported Injury", "Injured", "Injured", "Unknown"];
      var miles = ["0.2", "0.5", "0.7", "0.9", "1"];
      for (var i = 0; i < names.length; i++){
          let student = {
              name: names[i],
              status: status[i],
              miles: miles[i],
              pic: "assets/imgs/" + names[i].toLowerCase() + ".jpg"
          }
          this.studentsArr.push(student);

          //-------- ADD NEW PERSON FROM DATABASE -----
          let ref = this.afData.database.ref(`studentindanger`);
          ref.on("value", snap => {
              var value = snap.val();
              console.log(value);
          });

      }


      //--------- FOR LOOP TO RESCUE STUDENTS -------
      this.rescueArr = [];
      var names2 = ["Britney", "Kean", "Hong"];
      var status2  = ["Safe", "Safe", "Safe"];
      var miles2 = ["3", "4", "5"];
      for (var i = 0; i < names2.length; i++){
          let s = {
              name: names2[i],
              status: status2[i],
              miles: miles2[i],
              pic: "assets/imgs/" + names2[i].toLowerCase() + ".jpg"
          }
          this.rescueArr.push(s);
      }
  }


  //-------- RESCUE CONTROLLER ---------
  rescue(){
      let alert = this.alertCtrl.create({
        title: 'Rescue',
        subTitle: 'You are on your way',
        buttons: [{
            text: 'Go to Map',
            handler: () => {
                console.log('Open map here');
            }
        }]
      });
      alert.present();
  }

}
