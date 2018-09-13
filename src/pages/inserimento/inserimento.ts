import { Component } from '@angular/core';
import {AlertController, MenuController, NavController} from 'ionic-angular';
import { mobiscroll } from '@mobiscroll/angular';
import {HomePage} from "../home/home";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Camera } from '@ionic-native/camera';

mobiscroll.settings = {
  theme: 'ios'
};

@Component({
  selector: 'page-inserimento',
  templateUrl: 'inserimento.html'
})
export class InserimentoPage {

  public retrievedObj;
  public tipo;
  public modalita;
  public cliente;
  public descrizione;
  public today;
  public price;
  public foto;
  numpadSettings: any = {
    preset: 'decimal',
    min: 1,
    max: 500000,
    prefix: '€'
  };

  public imageURL;


  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public http:HttpClient, public alertCtrl: AlertController,public camera: Camera) {

    this.price = 0;

    this.today = new Date().toISOString();

    this.retrievedObj = JSON.parse(localStorage.getItem('storedData'));


      if (this.retrievedObj.tipo === false) {
        this.navCtrl.setRoot(HomePage);
      }

      this.menuCtrl.enable(true, 'myMenu');
  }

  /*takePhoto(){
    Camera.getPicture().then((imageData) => {
      this.imageURL = imageData
    }, (err) => {
      console.log(err);
    });
  }*/


  salva (){

    let headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };


    let data = JSON.stringify({"data": this.today, "tipo":this.tipo, "modalita": this.modalita, "cliente": this.cliente, "importo" : this.price, "foto" : this.foto, "utente":this.retrievedObj.username, "struttura":this.retrievedObj.struttura});

    this.http.post('http://127.0.0.1:3000/salvaSaldo',data, headers)
      .subscribe(data => {
          console.log(data);
          let a = JSON.stringify(data);
          let b = JSON.parse(a);
          if(b===true){
            let alert = this.alertCtrl.create({
              title: 'Salvataggio',
              subTitle: 'Effettuato con Successo!',
              buttons: ['OK']
            });
            alert.present();
            this.navCtrl.setRoot(HomePage,{'info':b.id});
          }
          else if(b===false){
            let alert = this.alertCtrl.create({
              title: 'Attenzione!',
              subTitle: 'Inserire i dati correttamente!',
              buttons: ['OK']
            });
            alert.present();
          }
        },
        err => {
          console.log(data);
          console.log('Error: ' + err.error);
          console.log('Name: ' + err.name);
          console.log('Message: ' + err.message);
          console.log('Status: ' + err.status);
        });

  };

}
