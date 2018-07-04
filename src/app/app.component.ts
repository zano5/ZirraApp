import { Component, ViewChild } from '@angular/core';
import { Platform, Popover, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RACISM_LIST } from '../mocks/Racism.mock';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(Popover) popover: Popover;

  rootPage: string= 'HomePage';
  person;
  racism="";
  CValue

  racismList = RACISM_LIST;

  pages: Array<{title: string, icon:string,component : any}>;
  options = "Types Of Racism";

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {



    this.pages = [



      { title: 'About',icon: 'assets/imgs/kat1.png', component: 'AboutPage' },
      { title: 'FAQs',icon: 'assets/imgs/question.svg', component: 'FQuestionsPage'},
      { title: 'Types Of Racism',icon: 'assets/imgs/hat.svg', component: 'TypesPage'},
      { title: 'Terms & Conditions',icon: 'assets/imgs/diploma.svg', component: 'TermsPage'}


    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }



  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component,{terms:'home'});
  }
}

