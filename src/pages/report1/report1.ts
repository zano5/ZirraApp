
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Report } from '../../modals/report.modals';

import { ToastController } from 'ionic-angular';
import * as firebase from 'firebase';

import {storage} from 'firebase';


import { AngularFireDatabase } from 'angularfire2/database/database';


/**
 * Generated class for the Report1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report1',
  templateUrl: 'report1.html',
})
export class Report1Page {

  report:FormGroup;
  person;
  info;
  repo={
    name:"",
    surname:"",
    email:"",
    number:"",
    gender:"",
    racial:"",
    description:"",
    province:'',
    location:"",
    file:"",
    date:"",
    find:"",
    age:"",
    nationality:"",
    religion:"",
    person:"",
    imageUrl:"",
    videoUrl:"",
    audioUrl:"",
    created:""



  }

  type ="";
  status= false;
  title="";
  url="";
  file="";
  video="";
  audio="";
  image="";

  files;







  constructor(public navCtrl: NavController, public navParams: NavParams,private fb: FormBuilder,private toastCtrl: ToastController,private fire: FirebaseProvider, private alertCtrl: AlertController,public loadingCtrl: LoadingController) {

    this.files= this.navParams.get('files');
    this.person = this.navParams.get('person');
    this.info = this.navParams.get('value');
    this.type = this.navParams.get('type');
    this.file= this.navParams.get('file');
    this.video= this.navParams.get('video');
    this.audio=this.navParams.get('audio');
    this.image=this.navParams.get('image');

    console.log(this.info.location);

  if(this.type === "me"){

    this.title = " Your Information"

  }else if(this.type === "someone")
  {

    this.title = "Your Details"

  }


    this.report = this.fb.group({

      name:[''],
      surname:[''],
      email:['',Validators.email],
      number:['',[Validators.minLength(10),Validators.maxLength(10)]],





  })




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Report1Page');
  }


  formSubmit({value,valid}:{value:Report,valid:boolean})
  {


    if(this.type === 'someone'){

      this.repo.find = this.person.find;

    }else{


    }

      this.repo.name = value.name;
      this.repo.surname = value.surname;
      this.repo.email = value.email;
      this.repo.number = value.number;
      this.repo.age = this.person.age;
      this.repo.religion = this.person.religion;
      this.repo.gender = this.person.gender;
      this.repo.nationality = this.person.nationality;
      this.repo.racial =this.person.racial;
      this.repo.find = this.person.type;
      this.repo.province = this.info.province;
      this.repo.date = this.info.date;
      this.repo.description = this.info.description;
      this.repo.location = this.info.location;
      this.repo.person = this.type;
      this.repo.created = new Date().toISOString();
      this.repo.imageUrl = this.files.picture;
      this.repo.videoUrl = this.files.video;
      this.repo.audioUrl = this.files.audio;







     // this.repo.location = this.info.location;



     this.fire.addReport(this.repo);

    // console.log(this.repo.person);
      // this.presentToast();

      this.presentConfirm();



      this.navCtrl.setRoot('HomePage');

  }


  // presentToast() {
  //   let toast = this.toastCtrl.create({
  //     message: 'Report was submitted successfully',
  //     duration: 3000,
  //     position: 'top'
  //   });

  //   toast.onDidDismiss(() => {
  //     console.log('Dismissed toast');
  //   });

  //   toast.present();
  // }


  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Report Submitted',
      message: 'Thank you for submitting your report, we encourage all victims of racism to report this to their nearest police station. We may contact you for more information',
      buttons: [
        {
          text: 'Ok',
          role: 'ok',
          handler: () => {

          }
        },



      ]
    });
    alert.present();
  }


  share(){

  }



  // uploadFile(file)
  // {

  //  // var uploadTask = this.storage.child(auth.uid+'/'+file.name)
  //  var uploadTask = this.store.child(file.name)
  //   .put(file);

  //   uploadTask.on('state_changed',
  //   (snapshot)=>{
  //     console.log("subiendo");


  //   },
  //   (error)=>{
  //     console.error(error);
  //   },()=>{
  //     console.log("Successsss");
  //     console.log(uploadTask.snapshot.downloadURL);
  //   });
  // }










}
