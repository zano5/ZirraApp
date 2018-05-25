import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InternalizedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-internalized',
  templateUrl: 'internalized.html',
})
export class InternalizedPage {

  message='Occurs when people targeted by racism come to believe that the stereotypes and prejudices '+
  ' of racism are valid. They may act out this belief by oppressing others of their own group, or by devaluing' +
  ' themselves through feelings of shame, self-hatred, isolation, powerlessness, self-doubt and despair';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InternalizedPage');
  }


  about()
  {
    this.navCtrl.setRoot('HomePage');

  }

}
