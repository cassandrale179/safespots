import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-shooter',
  templateUrl: 'shooter.html',
})
export class ShooterPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afData: AngularFireDatabase,
    private toastCtrl: ToastController) {

  }


  //--------- WHEN LOAD, RUN THIS --------
  ionViewDidLoad() {

  }


  //--------- GIVE LOCATION --------
      giveLocation() {
      let toast = this.toastCtrl.create({
        message: 'Police has been notified',
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();


      //--------PUSH TO THE DATABASE--------
      let ref = this.afData.database.ref(`studentindanger`);
      let key = "Anna";
      let obj = {
        name: "Anna",
        status: "Unknown",
        miles: "0.1",
        pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwH6DalS_KpcvdezZT-tymCO2Spog0pW1g8ySWMhAPAohnxKNJ"
      }
      ref.child(key).update(obj);
    }


     //--------- GIVE INJURY REPORT --------
    giveInjured() {
        let toast = this.toastCtrl.create({
          message: 'Medical Emergency has been contacted for you ',
          duration: 3000,
          position: 'top'
        });
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        toast.present();

        let ref = this.afData.database.ref(`studentindanger`);
        let key = "Anna";
        let obj = {
          name: "Anna",
          status: "Injured",
          miles: "0.1",
          pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwH6DalS_KpcvdezZT-tymCO2Spog0pW1g8ySWMhAPAohnxKNJ"
        }
        ref.child(key).update(obj);

    }



}
