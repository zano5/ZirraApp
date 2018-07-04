import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


/*
  Generated class for the CountryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CountryProvider {

  items;

  constructor(public http:  HttpClient ) {
    console.log('Hello RedditData Provider');
}

getRemoteData(){


  this.http.get('https://restcountries.eu/rest/v2/all').subscribe(data=>{

 this.items = data;
 });


  return this.items;






}






}
