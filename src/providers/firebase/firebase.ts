import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor(private adf: AngularFireDatabase) {
    console.log('Hello FirebaseProvider Provider');
  }


  public addReport(report)
  {
    this.adf.list('/reports/').push(report);

  }


  public getCounter()
  {
   return  this.adf.object('counter');

  }

  public writeCounter() {
    firebase.database().ref('counter').set({
      counter: 0

    });
  }





  storeInfoToDatabase(metainfo) {
    let toSave = {
      created: metainfo.timeCreated,
      url: metainfo.downloadURLs[0],
      fullPath: metainfo.fullPath,
      contentType: metainfo.contentType
    }
    return toSave;


  }



}
