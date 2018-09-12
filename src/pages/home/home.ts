import { Component } from '@angular/core';
import {MenuController, NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public  info;
  public nome;
  public cognome;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, navParams: NavParams) {

    this.info = navParams.data.info;
    console.log(this.info);
    this.nome = this.info.nome;
    this.cognome = this.info.cognome;

    this.menuCtrl.enable(true, 'myMenu');

  }

}
