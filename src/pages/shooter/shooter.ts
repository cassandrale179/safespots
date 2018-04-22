import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-shooter',
  templateUrl: 'shooter.html',
})
export class ShooterPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
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
        }

}
