import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Report } from '../../modals/report.modals';
import { CountryProvider } from '../../providers/country/country';

/**
 * Generated class for the Report4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report4',
  templateUrl: 'report4.html',
})
export class Report4Page {

  report: FormGroup;
  type="";
  title="";
  value

  searchQuery: string = '';
  items;
  input;
  showList=false;



  constructor(public navCtrl: NavController, public navParams: NavParams, private fb:FormBuilder, private country : CountryProvider) {

    this.initializeItems();

  this.type = this.navParams.get('type');
  console.log(this.type);


  if(this.type === "me"){

    this.title = " Your Information"

  }else if(this.type === "someone")
  {

    this.title = "Victim Details"

  }

    this.report = this.fb.group({


         find: ['',Validators.required],
         racial:['',Validators.required],
         religion:['',Validators.required],
         age:['',Validators.required],
         type:['',Validators.required],
         nationality:['',Validators.required],
         gender:['',Validators.required]


    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Report3Page');
  }


  formSubmit({value,valid}:{value:Report,valid:boolean}){

      this.navCtrl.push('Report2Page',{person: value, type: this.type});

  }


  initializeItems() {
    this.items = this.country.getRemoteData();
  }


  getItems(ev: any) {
    this.showList = true;
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {

      this.input =(item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


  populate(item){


   this.value = item.name;
    this.items =[];






  }

}
