
import { storage } from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { FileChooser } from '@ionic-native/file-chooser';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, LoadingController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { DataProvider } from '../providers/data/data';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { File } from '@ionic-native/file';
import 'firebase/storage';
import { CountryProvider } from '../providers/country/country';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http'
import { FilePath } from '@ionic-native/file-path';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Camera } from '@ionic-native/camera';
import { IOSFilePicker } from '@ionic-native/file-picker';
import { Network } from '@ionic-native/network';

















var firebaseConfig = {
  apiKey: "AIzaSyBR3NW_YHhen6SAYvvIr2mSrxHbT5T9zI0",
  authDomain: "zirra-ad665.firebaseapp.com",
  databaseURL: "https://zirra-ad665.firebaseio.com",
  projectId: "zirra-ad665",
  storageBucket: "zirra-ad665.appspot.com",
  messagingSenderId: "327604129138"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      menuType: 'push',
      platforms: {
        ios: {
          menuType: 'overlay',
        }
      }
    }),
    AngularFireDatabaseModule,
   AngularFireAuthModule,
  AngularFireModule.initializeApp(firebaseConfig),
  HttpClientModule,
  HttpModule



  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    DataProvider,
    FileChooser,
    MediaCapture,
    File,
    HttpClient,
    HttpModule,
    CountryProvider,
    FilePath,
    PhotoLibrary,
    Camera,
    IOSFilePicker,
    Network






  ]
})
export class AppModule {}
