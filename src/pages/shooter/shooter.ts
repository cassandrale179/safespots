import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShooterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shooter',
  templateUrl: 'shooter.html',
})
export class ShooterPage {

    rooms: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }


  //--------- WHEN LOAD, RUN THIS --------
  ionViewDidLoad() {
      this.rooms = [];
      let obj = {
          left: 0,
          right: 0,
          clear: false
      }
      for (let i = 110; i <= 131; i+=2){
          obj.left = i;
          obj.right = i + 1;
          this.rooms.push(obj);
          obj = {
              left: 0,
              right: 0,
              clear: false
          };
      }
    console.log('rooms array', this.rooms);


    //------ FUNCTION TO CLEAR ROOMS ------
    function clearRoom(room){
        console.log('room', room);
    }
  }
}
