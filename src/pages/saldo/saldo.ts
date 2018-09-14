import { Component } from '@angular/core';
import {AlertController, MenuController, ModalController, NavController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {CalendarModal, CalendarModalOptions, CalendarResult} from "ion2-calendar";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'page-saldo',
  templateUrl: 'saldo.html'
})

export class SaldoPage {

  public tipo;
  public retrievedObj;
  public entrate;
  public uscite;
  public saldo;
  public saldDate;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public modalCtrl: ModalController,public http:HttpClient, public alertCtrl: AlertController) {

    this.retrievedObj = JSON.parse(localStorage.getItem('storedData'));

    this.entrate=0;
    this.uscite=0;
    this.saldo=0;


    if (this.retrievedObj.tipo === false) {
      this.navCtrl.setRoot(HomePage);
    }

    this.menuCtrl.enable(true, 'myMenu');

  }

  onChangeSelection(tipo){

    if(tipo==="settimanale"){

      document.getElementById("settimanale").style.display = "block";
      document.getElementById("giornaliero").style.display = "none";

    }
    else if(tipo==="giornaliero"){

      document.getElementById("giornaliero").style.display = "block";
      document.getElementById("settimanale").style.display = "none";

    }

  }


  openCalendar() {
    const options: CalendarModalOptions = {
      pickMode: 'range',
      title: 'SALDO',
      monthFormat: 'MMMM YYYY',
      weekdays: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
      weekStart: 1,
      defaultDate: new Date(),
      canBackwardsSelected: true
    };

    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date: { from: CalendarResult; to: CalendarResult }, type: string) => {
      let monthNames = [
        'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
      ];

      let dateA = new Date(date.from.string);

      let day = dateA.getDate();
      let monthIndex = dateA.getMonth();
      let year = dateA.getFullYear();

      let dateB = new Date(date.to.string);

      let day1 = dateB.getDate();
      let monthIndex1 = dateB.getMonth();
      let year1 = dateB.getFullYear();

      this.saldDate = day + ' ' + monthNames[monthIndex] + ' ' + year + ' al '+day1 + ' ' + monthNames[monthIndex1] + ' ' + year1;

      let headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };


      let data = JSON.stringify({"data": date, "tipo":"range", "struttura": this.retrievedObj.struttura});

      this.http.post('http://127.0.0.1:3000/getSaldo',data, headers)
        .subscribe(data => {
            let a = JSON.stringify(data);
            let b = JSON.parse(a);
            if(b.errore===false){
              console.log(b);
              let ent = [];
              let usc = [];
              for(let i=0;i<b.id.length;i++){
                if(b.id[i].tipo==='incasso'){


                  ent.push(parseFloat(b.id[i].importo));

                }
                if(b.id[i].tipo==='pagamento'){



                  usc.push(parseFloat(b.id[i].importo));


                }
              }
              this.entrate = ent.reduce((a, b) => a + b, 0);
              this.uscite = usc.reduce((a, b) => a + b, 0);
              this.saldo = this.entrate - this.uscite;
              console.log(ent);
              console.log(usc);
            }
            else if(b.errore===true){
              let alert = this.alertCtrl.create({
                title: 'Attenzione!',
                subTitle: 'Errore!',
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
    });
  }

  openCalendar1() {

    const options: CalendarModalOptions = {
      title: 'SALDO',
      monthFormat: 'MMMM YYYY',
      weekdays: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
      weekStart: 1,
      defaultDate: new Date(),
      canBackwardsSelected: true
    };
    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date: CalendarResult, type: string) => {

      let monthNames = [
        'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
      ];

      let dateA = new Date(date.string);

      let day = dateA.getDate();
      let monthIndex = dateA.getMonth();
      let year = dateA.getFullYear();

      this.saldDate = day + ' ' + monthNames[monthIndex] + ' ' + year;

      let headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };


      let data = JSON.stringify({"data": date, "tipo":"giorno", "struttura": this.retrievedObj.struttura});

      this.http.post('http://127.0.0.1:3000/getSaldo',data, headers)
        .subscribe(data => {
            let a = JSON.stringify(data);
            let b = JSON.parse(a);
            if(b.errore===false){
              console.log(b);
              let ent = [];
              let usc = [];
              for(let i=0;i<b.id.length;i++){
                if(b.id[i].tipo==='incasso'){


                  ent.push(parseFloat(b.id[i].importo));

                }
                if(b.id[i].tipo==='pagamento'){



                  usc.push(parseFloat(b.id[i].importo));


                }
              }
              this.entrate = ent.reduce((a, b) => a + b, 0);
              this.uscite = usc.reduce((a, b) => a + b, 0);
              this.saldo = this.entrate - this.uscite;
              console.log(ent);
              console.log(usc);
            }
            else if(b.errore===true){
              let alert = this.alertCtrl.create({
                title: 'Attenzione!',
                subTitle: 'Errore!',
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

    })
  }

}
