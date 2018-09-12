import { Component, ViewChild } from '@angular/core';
import {AlertController, App, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { SaldoPage } from '../pages/saldo/saldo';
import { InserimentoPage } from '../pages/inserimento/inserimento';
import { LoginPage } from "../pages/login/login";
import { StatistichePage } from "../pages/statistiche/statistiche";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public alertCtrl: AlertController,public app : App) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Saldo', component: SaldoPage },
      { title: 'Inserimento', component: InserimentoPage },
      { title: 'Statistiche', component: StatistichePage },
      { title: 'Log out', component: LoginPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {

    if(page.title==="Saldo" || page.title==="Inserimento" || page.title==="Statistiche"){



    }

    if(page.title==="Log out"){
      let alert = this.alertCtrl.create({
        title: 'Logout',
        subTitle: 'Effettuato con Successo!',
        buttons: ['OK']
      });
      alert.present();
      this.app.getRootNav().setRoot(LoginPage);
    }
    else{
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(page.component);
    }

  }
}