import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the TypeDescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-type-description',
  templateUrl: 'type-description.html',
})
export class TypeDescriptionPage {

  racism;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.racism = this.navParams.get('racism');





  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TypeDescriptionPage');
  }

}
