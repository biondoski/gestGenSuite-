import { Component } from '@angular/core';
import {MenuController, NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-saldo',
  templateUrl: 'saldo.html'
})
export class SaldoPage {

  public info;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, navParams: NavParams) {

    this.info = navParams.data;

    this.menuCtrl.enable(true, 'myMenu');

  }

}
