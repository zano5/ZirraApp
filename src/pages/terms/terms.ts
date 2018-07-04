import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the TermsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage {

terms="";
plat;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
    this.plat = this.platform;

    this.terms = this.navParams.get('terms');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsPage');
  }


  about(){

    //this.navCtrl.setRoot('HomePage');

    if(this.terms === 'terms'){
      this.navCtrl.pop();

    }else if(this.terms === 'home')
    {
      this.navCtrl.setRoot('HomePage');
    }

  }

}
