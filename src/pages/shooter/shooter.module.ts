import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShooterPage } from './shooter';

@NgModule({
  declarations: [
    ShooterPage,
  ],
  imports: [
    IonicPageModule.forChild(ShooterPage),
  ],
})
export class ShooterPageModule {}
