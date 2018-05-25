import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { RACISM_LIST } from '../../mocks/Racism.mock';
import * as firebase from 'firebase';



/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {


  RacismList= RACISM_LIST;

  person;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,public menuCtrl: MenuController, private auth: AngularFireAuth) {


    this.auth.auth.signInAnonymously();
    // firebase.auth().signInAnonymously().catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // ...
    // });


    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     // User is signed in.
    //     var isAnonymous = user.isAnonymous;
    //     var uid = user.uid;
    //     // ...
    //   } else {
    //     // User is signed out.
    //     // ...

    //     console.log('Not logged in');
    //   }
    //   // ...
    // });


  }






  about(){

    this.navCtrl.setRoot('AboutPage');

  }


   onReport(){

    this.presentConfirm();


   }



  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Report',
      message: 'Who did it happen to?',
      buttons: [
        {
          text: 'Me',
          role: 'me',
          handler: () => {

        this.person = 'me';

            this.navCtrl.push('Report3Page',{'type': this.person});
          }
        },
        {
          text: 'someone else',
          handler: () => {

            this.person = 'someone';
            this.navCtrl.push('Report4Page',{'type': this.person});
          }
        },
        {
          text: 'Cancel',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }


  share(){

  }


  showAlert(racism) {
    let alert = this.alertCtrl.create({
      title: racism.name,
      message:racism.description,
      buttons: [

        {
          text: 'Cancel'

      },
    {
      text: 'Report Incident',
        handler: () => {
          this.presentConfirm();
        }
    }]


    });
    alert.present();
  }


}

