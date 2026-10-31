import { Component,ChangeDetectorRef } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, 
    FormsModule,CommonModule,IonToolbar, IonItem, IonLabel, IonList, IonTitle, IonContent],
})
export class Tab1Page {
  private readonly htpp:HttpClient;

  usuarios:any = [];
  constructor(http:HttpClient,private cdr:ChangeDetectorRef) {
    this.htpp = http;
    this.buscarUsuarios();
  }

  buscarUsuarios(){
    this.htpp.get("http://localhost:8080/usuario/buscar"
      ).subscribe(
      data => {
          this.usuarios=data;
          this.cdr.detectChanges();
      }
    )
  }

}



