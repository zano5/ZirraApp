import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  images = [{

    image:"assets/imgs/zirra.png"

  },
{
    image: "assets/imgs/mlab.png"
}];

  plat

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform ) {
    this.plat = platform;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  about()
  {
    this.navCtrl.setRoot('HomePage');

  }

}
