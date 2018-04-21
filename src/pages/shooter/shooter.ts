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

      for (let i = 110; i <= 131; i+=2){
          let obj = {
              left: i,
              right: i+1,
              leftclear: false,
              rightclear: false
          }

          this.rooms.push(obj);

      }
    console.log('rooms array', this.rooms);
  }



  //------ FUNCTION TO CLEAR ROOMS ------
  clearRoom(room, boo){
    if (boo=="left"){
        room.leftclear = true;
    }
    else{
        room.rightclear = true;
    }

  }

  safeRoom(safeornot){
      if (safeornot) return '#117A65';
     
  }
}
