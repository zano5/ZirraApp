import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SystemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-system',
  templateUrl: 'system.html',
})
export class SystemPage {

  message='Embedded in institutional systems; the direct link between residential schools'+
  ' conscious cultural destruction to social issues, such as poverty, education, health and legal '+
  ' issues for indigenous people is an example. ';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SystemPage');
  }


  about()
  {
    this.navCtrl.setRoot('HomePage');

  }

}
