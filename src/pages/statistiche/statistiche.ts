import { Component } from '@angular/core';
import {MenuController, NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-statistiche',
  templateUrl: 'statistiche.html'
})
export class StatistichePage {

  public info;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, navParams: NavParams) {

    this.info = navParams.data;

    this.menuCtrl.enable(true, 'myMenu');

  }

}
