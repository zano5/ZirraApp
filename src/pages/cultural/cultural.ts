import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CulturalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cultural',
  templateUrl: 'cultural.html',
})
export class CulturalPage {

  message='Social production and reproduction of values and standards which priviledge one group' +
  ' cultural heritage and identity over those of another; encourafe schools to include indigenous '+
  'perspectives and content, reflect the full diversity of South Africa, especially values '+
  'and beliefs beyond holidays, perfomance and food. ';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CulturalPage');
  }

  about()
  {
    this.navCtrl.setRoot('HomePage');

  }

}
