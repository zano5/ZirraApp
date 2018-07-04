import { QUESTION_LIST } from './../../mocks/question.mocks';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';

/**
 * Generated class for the FQuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-f-questions',
  templateUrl: 'f-questions.html',
})
export class FQuestionsPage {

  questions= QUESTION_LIST;
  plat;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
    this.plat = this.platform;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FQuestionsPage');
  }

  about(){

    this.navCtrl.setRoot('HomePage');

  }

}
