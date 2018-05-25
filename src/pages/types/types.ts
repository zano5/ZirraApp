import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RACISM_LIST } from '../../mocks/Racism.mock';

/**
 * Generated class for the TypesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-types',
  templateUrl: 'types.html',
})
export class TypesPage {

  racisms = RACISM_LIST;
  person;

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TypesPage');
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


  about()
  {
    this.navCtrl.setRoot('HomePage');

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
          text: 'Someone else',
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

}
