import { DataProvider } from './../../providers/data/data';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform} from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Report } from '../../modals/report.modals';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions } from '@ionic-native/media-capture';

import * as firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';


import { storage } from 'firebase/app';

import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';







/**
 * Generated class for the Report2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
const MEDIA_FILES_KEY = 'mediaFiles';

@IonicPage()
@Component({
  selector: 'page-report2',
  templateUrl: 'report2.html',
})
export class Report2Page {
  @ViewChild('myvideo') myVideo: any;
  storageRef: firebase.storage.Reference;
  imageLocation;
  auth: any;
  person;
  mediaFiles = [];
  myDate: String = new Date().toISOString();
  input
  @ViewChild('myInput') myInputRef :ElementRef

   stringUri:string;
   report: FormGroup;
  placeName:string;
  rep: Report;
  type="";
  title="";
  stringPic="";
  stringAudio="";
  stringVideo="";

  media=""

  imageURI;



  image="";
  progress: any;
  url: string;

files={
    picture:'',
    audio:'',
    video:'',
    media:''

}

captureVideoUrl;












    constructor(public navCtrl: NavController, public navParams: NavParams,private fileChooser: FileChooser, private fb:FormBuilder, private data : DataProvider, private alertCtrl: AlertController,private mediaCapture: MediaCapture,private platform: Platform, private f : File) {

      this.alertCtrl = alertCtrl;

      1
      // const options: CameraOptions = {
      //   quality: 100,
      //   destinationType: this.camera.DestinationType.DATA_URL,
      //   encodingType: this.camera.EncodingType.JPEG,
      //   mediaType: this.camera.MediaType.PICTURE
      // }

      this.report = this.fb.group({


          description:['',[Validators.required]],
          location:['',[Validators.required]],
          province:['',[Validators.required]],
          file:this.stringUri,
          date:['', [Validators.required]]

      });



    this.type = this.navParams.get('type');
      this.person = this.navParams.get('person');
      console.log('person',this.person);


      console.log('Report 2',this.type);


      if(this.type === "me"){

        this.title = " Your Information"

      }else if(this.type === "someone")
      {

        this.title = "Victim Details"

      }





      // this.camera.getPicture(options).then((imageData) => {
      //   // imageData is either a base64 encoded string or a file URI
      //   // If it's base64:
      //   let base64Image = 'data:image/jpeg;base64,' + imageData;
      //  }, (err) => {
      //   // Handle error
      //  });




    }


    // ionViewDidEnter()
    // {
    //    this._LOADER.displayPreloader();

    // }

    ionViewWillEnter() {
      // Google Places API auto complete
      this.input = document.getElementById('googlePlaces').getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(this.input, {types: ['geocode']});



      // google.maps.event.addListener(autocomplete, 'place_changed', (res) => {
      //   // retrieve the place object for your use
      //   console.log(res);
      //   let place = autocomplete.getPlace();
      //
      //
      //
      //   // console.log("place Name",place.getName())
      //
      //
      //
      // });
   }






  onFile(){
    this.fileChooser.open()
  .then(uri => this.stringUri = uri)
   .catch(e => console.log(e));




  }

  formSubmit({value,valid}:{value:Report,valid:boolean}){


    //value.location = this.myInput;

   console.log(this.input.value);

    // value.audioFile = this.stringAudio;
    // value.imageFile = this.stringPic;
    // value.videoFile = this.stringVideo;

    console.log(this.input.value);

    value.location = this.input.value;
      this.navCtrl.push('Report1Page',{person:this.person,value: value,type:this.type,audio:this.stringAudio, video: this.stringVideo, file:this.stringUri, files:this.files});




             //  let  storageRef= firebase.storage().ref('contents/' + this.stringUri);



               //  this.repo.file =   storageRef.getDownloadURL.toString();
   //
   //                console.log("Report Objects",this.repo);
   //
                  // this.repo.person = this.person;
                  // this.fire.addReport(this.repo);
   //
   //



  }




  // startRecording()
  // {

  //   let options: CaptureImageOptions = { limit: 1 };
  //   this.media.captureAudio(options)
  //   .then(
  //     (data: MediaFile[]) =>  this.stringAudio = data[0].fullPath,
  //     (err: CaptureError) => console.error(err)
  //   );


  //   this.data.uploadAudio(this.stringAudio);
  //   this.files.audio = this.data.downloadAudio;

  //   this.presentAlert('Audio Uploaded');

  // }





  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Uploaded!',
      subTitle:message,
      buttons: ['Ok']
    });
    alert.present();
  }


uploadVideo()
{


}



upload(type) {
  this.platform.ready().then(() => {
    let promise

    switch (type) {
      case 'camera':
        promise = this.mediaCapture.captureImage()
        break
      case 'video':
        promise = this.mediaCapture.captureVideo()
        break
      case 'audio':
        promise = this.mediaCapture.captureAudio()


        break
    }

    promise.then((mediaFile: MediaFile[]) => {
      console.log(mediaFile)

      this.imageURI = mediaFile[0].fullPath
      var name = this.imageURI.substring(this.imageURI.lastIndexOf('/')+1, this.imageURI.length);
      console.log(name);


      if (type === 'camera') {
        this.stringPic = this.imageURI;

      }else if(type === 'video'){
        this.stringVideo = this.imageURI;

      }else if(type ==='audio'){
      this.stringAudio = this.imageURI;
      }


      var directory: string = this.imageURI.substring(0, this.imageURI.lastIndexOf('/')+1);
      directory = directory.split('%20').join(' ')
      name = name.split('%20').join(' ')
      console.log(directory)
      console.log('About to read buffer')

      return this.f.readAsArrayBuffer(directory, name).then((buffer: ArrayBuffer) => {
        console.log(buffer)
        console.log('Uploading file')
        var blob = new Blob([buffer], { type: mediaFile[0].type });
        console.log(blob.size);
        console.log(blob)

        let fileType = {
          camera: 'jpg',
          video: 'mp4',
          audio: 'mp4'
        }

        let storageRef = firebase.storage().ref('files/' + new Date().getTime() + "." + fileType[type]);


        return storageRef.put(blob).then(() => {
          console.log('Upload completed')
        })


        if (type === 'camera') {

          this.files.picture = storageRef.getDownloadURL().toString();
        }else if(type === 'video' ) {

          this.files.video = storageRef.getDownloadURL().toString();
        }else if(type === 'audio' ) {
          this.files.audio = storageRef.getDownloadURL().toString();
        }


        // return this.userService.saveProfilePicture(blob)
      }).catch(err => {
        console.log(err)
      })

    }).catch(err => {
      console.log(err)
    })
  })
}






}
