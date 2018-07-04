import { IOSFilePicker } from '@ionic-native/file-picker';
import { Upload } from './../../modals/upload.modals';
import { DataProvider } from './../../providers/data/data';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, LoadingController, Toast} from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Report } from '../../modals/report.modals';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions } from '@ionic-native/media-capture';
import * as firebase from 'firebase';

import { storage } from 'firebase/app';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { FirebaseApp } from 'angularfire2';

import { PhotoLibrary } from '@ionic-native/photo-library';
import { FilePath } from '@ionic-native/file-path';
import { ActionSheetController } from 'ionic-angular'
import { Camera, CameraOptions } from '@ionic-native/camera';









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
  cats= ['one','two','third'];
  private imageSrc: string;

  loader;
  valid = false;

  proceed;





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

uploadFile ={
  name:'',
  downloadUrl:''

}

public uploads=[];


public firebaseUploads=[];

fire = {
  downloadUrl:''
}













    constructor(public navCtrl: NavController, public navParams: NavParams,private fileChooser: FileChooser, private fb:FormBuilder, private data : DataProvider, private alertCtrl: AlertController,private mediaCapture: MediaCapture,private platform: Platform, private f : File,public loadingCtrl: LoadingController,private filePath: FilePath,private photoLibrary: PhotoLibrary,public actionSheetCtrl: ActionSheetController,private camera: Camera, private filePicker: IOSFilePicker) {


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







  if(this.platform.is('android')){








    this.fileChooser.open()
    .then(uri =>{



      this.filePath.resolveNativePath(uri)
      .then(filePath => {


        this.uploads.push({name:"File",downloadUrl: filePath});
      this.imageURI = filePath;
      var name = this.imageURI.substring(this.imageURI.lastIndexOf('/')+1, this.imageURI.length);

      var directory: string = this.imageURI.substring(0, this.imageURI.lastIndexOf('/')+1);
      directory = directory.split('%20').join(' ')
      name = name.split('%20').join(' ')
      console.log(directory)
      console.log('About to read buffer')





      return this.f.readAsArrayBuffer(directory, name).then((buffer: ArrayBuffer) => {
        console.log(buffer)
        console.log('Uploading file')
        var blob = new Blob([buffer], { type: 'application/octet-stream' });
        console.log(blob.size);
        console.log(blob)

        let fileType = {
          camera: 'jpg',
          video: 'mp4',
          audio: 'mp4'
        }

        this.proceed= false;

        const storageRef = firebase.storage().ref('files/' + new Date().getTime());





        this.presentLoading();

        return storageRef.put(blob).then(() => {
          this.valid = true;
          console.log(this.valid);
          console.log('Upload completed')
          //this.loader.dismiss;

           let  files = [];


          storageRef.getDownloadURL().then((url) => {

            console.log("log1: " + url);

            this.fire.downloadUrl = url;

            console.log("log2:" + this.fire);

            this.proceed = true;








            this.firebaseUploads.push({downloadUrl: url});

            return this.firebaseUploads;





          });








        console.log(this.firebaseUploads);
        this.presentMedia('File');

        })




      // return this.userService.saveProfilePicture(blob)
    }).catch(err => {
      console.log(err)
    })


      }


    ).catch(err => console.log(err));





  //   if(this.stringUri){
  //   this.uploads.push({name:"File",downloadUrl: this.stringPic});
  //   this.imageURI = this.stringUri;
  //   var name = this.imageURI.substring(this.imageURI.lastIndexOf('/')+1, this.imageURI.length);

  //   var directory: string = this.imageURI.substring(0, this.imageURI.lastIndexOf('/')+1);
  //   directory = directory.split('%20').join(' ')
  //   name = name.split('%20').join(' ')
  //   console.log(directory)
  //   console.log('About to read buffer')


  //   return this.f.readAsArrayBuffer(directory, name).then((buffer: ArrayBuffer) => {
  //     console.log(buffer)
  //     console.log('Uploading file')
  //     var blob = new Blob([buffer], { type: 'application/octet-stream' });
  //     console.log(blob.size);
  //     console.log(blob)

  //     let fileType = {
  //       camera: 'jpg',
  //       video: 'mp4',
  //       audio: 'mp4'
  //     }



  //     const storageRef = firebase.storage().ref('files/' + new Date().getTime());



  //     return storageRef.put(blob).then(() => {
  //       this.valid = true;
  //       console.log(this.valid);
  //       console.log('Upload completed')
  //       //this.loader.dismiss;

  //        let  files = [];


  //       storageRef.getDownloadURL().then((url) => {

  //         console.log("log1: " + url);

  //         this.fire.downloadUrl = url;

  //         console.log("log2:" + this.fire)








  //         this.firebaseUploads.push(url);

  //         return this.firebaseUploads;





  //       });








  //     console.log(this.firebaseUploads);
  //     this.presentMedia('File');

  //     })




  //   // return this.userService.saveProfilePicture(blob)
  // }).catch(err => {
  //   console.log(err)
  // })

  //   }


})
  } else if(this.platform.is('ios')){


 this.presentActionSheet();




















  }


  }


  formSubmit({value,valid}:{value:Report,valid:boolean}){


    //value.location = this.myInput;

   console.log(this.input.value);

    // value.audioFile = this.stringAudio;
    // value.imageFile = this.stringPic;
    // value.videoFile = this.stringVideo;

    console.log(this.input.value);

    console.log(this.firebaseUploads);

    value.location = this.input.value;
      this.navCtrl.push('Report1Page',{person:this.person,value: value,type:this.type,audio:this.stringAudio, video: this.stringVideo, file:this.stringUri, files:this.files, fireUpload: this.firebaseUploads});




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


  presentMedia(message) {
    let alert = this.alertCtrl.create({
      title: 'File Added!',
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
     // this.presentLoading();

      this.imageURI = mediaFile[0].fullPath
      var name = this.imageURI.substring(this.imageURI.lastIndexOf('/')+1, this.imageURI.length);
      console.log(name);

     // this.presentLoading();
      switch (type) {
        case 'camera':
          this.stringPic = this.imageURI;
          this.uploadFile.name ="Camera Image"
          this.uploadFile.downloadUrl =  this.stringPic;
          this.uploads.push({name:"Camera Image",downloadUrl: this.stringPic});
          break
        case 'video':
        this.stringVideo = this.imageURI;
        this.uploadFile.name ="Video"
        this.uploadFile.downloadUrl =   this.stringVideo ;
        this.uploads.push({name:"Video",downloadUrl: this.stringVideo});
          break
        case 'audio':
        this.stringAudio = this.imageURI;
        this.uploadFile.name ="Audio"
        this.uploadFile.downloadUrl =  this.stringAudio;
        this.uploads.push({name:"Audio",downloadUrl: this.stringAudio});
          break
      }


      var directory: string = this.imageURI.substring(0, this.imageURI.lastIndexOf('/')+1);
      directory = directory.split('%20').join(' ')
      name = name.split('%20').join(' ')
      console.log(directory)
      console.log('About to read buffer')

      let seperatedName = name.split('.')
      let extension = ''
      if (seperatedName.length > 1) {
        extension = '.' + seperatedName[1]
      }

      return this.f.readAsArrayBuffer(directory, name).then((buffer: ArrayBuffer) => {
        console.log(buffer)
        console.log('Uploading file')
        var blob = new Blob([buffer], { type: mediaFile[0].type });
        console.log(blob.size);
        console.log(blob)

        this.presentLoading();

        const storageRef = firebase.storage().ref('files/' + new Date().getTime() + extension);



        return storageRef.put(blob).then((snapshot:any) => {
          this.valid = true;
          console.log(this.valid);
          console.log('Upload completed')
          //this.loader.dismiss;

          console.log(snapshot.Q)

           let  files = [];


          storageRef.getDownloadURL().then((url) => {



            this.fire.downloadUrl = url;






            this.firebaseUploads.push({downloadUrl: url});



            return this.fire.downloadUrl;





          });





          console.log(this.firebaseUploads);




          // switch (type) {
          //   case 'camera':
          //   this.files.picture = storageRef.getDownloadURL().toString();

          //   // this.uploadFile.name = "Camera Taken Picture";
          //   // this.uploadFile.downloadUrl = storageRef.getDownloadURL().toString();
          //   console.log( "url",storageRef.getDownloadURL().toString());
          //   this.uploads.push(this.uploadFile);
          //     break
          //   case 'video':
          //   // this.files.video = storageRef.getDownloadURL().toString();
          //   // this.uploadFile.name = "Camera Taken Video";
          //   this.uploadFile.downloadUrl = storageRef.getDownloadURL().toString();
          //   this.uploads.push(this.uploadFile);
          //   console.log( "url",storageRef.getDownloadURL().toString());
          //     break
          //   case 'audio':
          //   // this.files.audio = storageRef.getDownloadURL().toString();
          //   // this.uploadFile.name = "Audio Taken ";
          //  // this.uploadFile.downloadUrl = storageRef.getDownloadURL().toString();
          //   this.uploads.push(this.uploadFile);
          //   console.log( "url",storageRef.getDownloadURL().toString());
          //     break
          // }

            this.presentMedia(type);
        })




        // return this.userService.saveProfilePicture(blob)
      }).catch(err => {
        console.log(err)
      })

    }).catch(err => {
      console.log(err)
    })
  })
}



onView(){
    this.navCtrl.push("UploadViewPage", {info:this.uploads});
}


presentLoading() {
   this.loader = this.loadingCtrl.create({
    content: "Uploading File...",
    duration: 3000

  });
  this.loader.present();


  if(this.valid == true){

    this.loader.dismiss;
  }


}
uploadPath() {
  this.fileChooser.open().then((url) => {

    (<any>window).FilePath.resolveNativePath(url, (nativeFilepath) => {

      this.readFileFromStorage(nativeFilepath);

    }
    )
  })
}

readFileFromStorage(nativeFilepath) {

  let fileName = this.getfilename(nativeFilepath);

  let fileExt = fileName.substring(fileName.lastIndexOf('.') + 1);

  let blogType = { type: 'image/'+fileExt };

  (<any>window).resolveLocalFileSystemURL(nativeFilepath, (res) => {
    res.file((resFile) => {
      var reader = new FileReader();
      reader.readAsArrayBuffer(resFile);
      reader.onloadend = (evt: any) => {

        var imgBlob = new Blob([evt.target.result], blogType);

        //Upload blob to firebase
        this.uploadToFirebase(imgBlob,fileName);
      }
    })
  })
}

getfilename(filePath){
  let fileName : string;
  fileName = filePath.replace(/^.*[\\\/]/, '')
  return fileName;
}

uploadToFirebase(fileBlob, name) {

  let storage = firebase.storage();

  storage.ref('images/' + name).put(fileBlob).then((d) => {
    alert("Done");
  }).catch((error) => {
    alert("Error: " + JSON.stringify(error));
  });

}


presentActionSheet() {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'Media Files',
    buttons: [
      {
        text: 'Image',
        handler: () => {

          this.openGallery();
        }
      },
      {
        text: 'Video',
        handler: () => {

          this.openMedia();

        }
      },
      {
        text: 'Document',

        handler: () => {


            this.documentPicker();





        }





      },
      {
        text: 'Cancel',
        role:'cancel',

        handler: () => {








        }





      }
    ]
  });



  actionSheet.present();
}


private openGallery (): void {
  let cameraOptions = {
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.FILE_URI,
    quality: 100,
    targetWidth: 1000,
    targetHeight: 1000,
    encodingType: this.camera.EncodingType.JPEG,
    correctOrientation: true
  }

  this.camera.getPicture(cameraOptions)
    .then(uri =>{

      this.uploads.push({name:"File",downloadUrl: uri});
      this.imageURI = uri;
      var name = this.imageURI.substring(this.imageURI.lastIndexOf('/')+1, this.imageURI.length);

      var directory: string = this.imageURI.substring(0, this.imageURI.lastIndexOf('/')+1);
      directory = directory.split('%20').join(' ')
      name = name.split('%20').join(' ')
      console.log(directory)
      console.log('About to read buffer')


      return this.f.readAsArrayBuffer(directory, name).then((buffer: ArrayBuffer) => {
        console.log(buffer)
        console.log('Uploading file')
        var blob = new Blob([buffer], { type: 'application/octet-stream' });
        console.log(blob.size);
        console.log(blob)

        let fileType = {
          camera: 'jpg',
          video: 'mp4',
          audio: 'mp4'
        }

        this.proceed= false;

        const storageRef = firebase.storage().ref('files/' + new Date().getTime());





        this.presentLoading();

        return storageRef.put(blob).then(() => {
          this.valid = true;
          console.log(this.valid);
          console.log('Upload completed')
          //this.loader.dismiss;

           let  files = [];


          storageRef.getDownloadURL().then((url) => {

            console.log("log1: " + url);

            this.fire.downloadUrl = url;

            console.log("log2:" + this.fire);

            this.proceed = true;








            this.firebaseUploads.push({downloadUrl: url});

            return this.firebaseUploads;





          });








        console.log(this.firebaseUploads);
        this.presentMedia('File');

        })




      // return this.userService.saveProfilePicture(blob)
    }).catch(err => {
      console.log(err)
    })





    })
    .catch(err => console.log('Error', err));




}


private openMedia() :void
{

  const options: CameraOptions = {
    quality: 100,
    sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.VIDEO
    }

  this.camera.getPicture(options)
    .then(uri=> {



      this.uploads.push({name:"File",downloadUrl: uri});
      this.imageURI = uri;
      var name = this.imageURI.substring(this.imageURI.lastIndexOf('/')+1, this.imageURI.length);

      var directory: string = this.imageURI.substring(0, this.imageURI.lastIndexOf('/')+1);
      directory = directory.split('%20').join(' ')
      name = name.split('%20').join(' ')
      console.log(directory)
      console.log('About to read buffer')


      return this.f.readAsArrayBuffer(directory, name).then((buffer: ArrayBuffer) => {
        console.log(buffer)
        console.log('Uploading file')
        var blob = new Blob([buffer], { type: 'application/octet-stream' });
        console.log(blob.size);
        console.log(blob)

        let fileType = {
          camera: 'jpg',
          video: 'mp4',
          audio: 'mp4'
        }

        this.proceed= false;

        const storageRef = firebase.storage().ref('files/' + new Date().getTime());





        this.presentLoading();

        return storageRef.put(blob).then(() => {
          this.valid = true;
          console.log(this.valid);
          console.log('Upload completed')
          //this.loader.dismiss;

           let  files = [];


          storageRef.getDownloadURL().then((url) => {

            console.log("log1: " + url);

            this.fire.downloadUrl = url;

            console.log("log2:" + this.fire);

            this.proceed = true;








            this.firebaseUploads.push({downloadUrl: url});

            return this.firebaseUploads;





          });








        console.log(this.firebaseUploads);
        this.presentMedia('File');

        })




      // return this.userService.saveProfilePicture(blob)
    }).catch(err => {
      console.log(err)
    })





    })
    .catch(err => console.log('Error', err));



    }










documentPicker()
{
  this.filePicker.pickFile()
  .then(uri => {


    this.uploads.push({name:"File",downloadUrl: uri});
    this.imageURI = uri;
    var name = this.imageURI.substring(this.imageURI.lastIndexOf('/')+1, this.imageURI.length);

    var directory: string = this.imageURI.substring(0, this.imageURI.lastIndexOf('/')+1);
    directory = directory.split('%20').join(' ')
    name = name.split('%20').join(' ')
    console.log(directory)
    console.log('About to read buffer')


    return this.f.readAsArrayBuffer(directory, name).then((buffer: ArrayBuffer) => {
      console.log(buffer)
      console.log('Uploading file')
      var blob = new Blob([buffer], { type: 'application/octet-stream' });
      console.log(blob.size);
      console.log(blob)

      let fileType = {
        camera: 'jpg',
        video: 'mp4',
        audio: 'mp4'
      }

      this.proceed= false;

      const storageRef = firebase.storage().ref('files/' + new Date().getTime());





      this.presentLoading();

      return storageRef.put(blob).then(() => {
        this.valid = true;
        console.log(this.valid);
        console.log('Upload completed')
        //this.loader.dismiss;

         let  files = [];


        storageRef.getDownloadURL().then((url) => {

          console.log("log1: " + url);

          this.fire.downloadUrl = url;

          console.log("log2:" + this.fire);

          this.proceed = true;








          this.firebaseUploads.push({downloadUrl: url});

          return this.firebaseUploads;





        });








      console.log(this.firebaseUploads);
      this.presentMedia('File');

      })




    // return this.userService.saveProfilePicture(blob)
  }).catch(err => {
    console.log(err)
  })





  })
  .catch(err => console.log('Error', err));

}

}






