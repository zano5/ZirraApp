import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UploadViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-view',
  templateUrl: 'upload-view.html',
})
export class UploadViewPage {

  uploads;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.uploads = this.navParams.get('info');
    console.log(this.uploads);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadViewPage');
  }


  

}
