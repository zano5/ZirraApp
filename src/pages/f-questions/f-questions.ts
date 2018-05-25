import { QUESTION_LIST } from './../../mocks/question.mocks';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FQuestionsPage');
  }

  about(){

    this.navCtrl.setRoot('HomePage');

  }

}
