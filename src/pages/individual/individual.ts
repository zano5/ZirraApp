import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RACISM_LIST } from '../../mocks/Racism.mock';

/**
 * Generated class for the IndividualPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-individual',
  templateUrl: 'individual.html',
})
export class IndividualPage {

  message='Can occur between people, e.g treatment in retail stores and restaurants.';

  constructor(public navCtrl: NavController, public navParams: NavParams) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndividualPage');
  }


  about()
  {
    this.navCtrl.setRoot('HomePage');

  }

}
