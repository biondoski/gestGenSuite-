import { Component } from '@angular/core';
import {AlertController, MenuController, NavController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Camera } from '@ionic-native/camera';
import {FormBuilder, Validators} from "@angular/forms";


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
  public modeKeys;

  public formTest;



  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public http:HttpClient, public alertCtrl: AlertController,public camera: Camera,private formBuilder: FormBuilder) {

    this.price = 0;

    this.formTest = formBuilder.group({
      maskMoney: ['', Validators.required]
    });

    this.today = new Date().toISOString();

    this.retrievedObj = JSON.parse(localStorage.getItem('storedData'));

    this.menuCtrl.enable(true, 'myMenu');

    let headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };


    let data = JSON.stringify({"struttura": this.retrievedObj.struttura});

    this.http.post('http://127.0.0.1:3000/cliente',data, headers)
      .subscribe(data => {
          let a = JSON.stringify(data);
          let b = JSON.parse(a);
          if(b.errore===false){
            this.modeKeys = b.id;

          }
          else if(b.errore===true){
            let alert = this.alertCtrl.create({
              title: 'Attenzione!',
              subTitle: 'Nessun cliente presente!',
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

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Aggiungi Cliente',
      inputs: [
        {
          name: 'cliente',
          placeholder: 'Cliente'
        }
      ],
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salva',
          handler: data => {
            if (data.cliente) {

              let headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };


              let data1 = JSON.stringify({"value": data.cliente, "struttura":this.retrievedObj.struttura});

              this.http.post('http://127.0.0.1:3000/salvaCliente',data1, headers)
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
                      this.navCtrl.setRoot(this.navCtrl.getActive().component);
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

            } else {

              return false;
            }
          }
        }
      ]
    });
    alert.present();
  };

}
