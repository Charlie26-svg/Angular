import { Component,ChangeDetectorRef } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, 
    FormsModule,CommonModule,IonToolbar, IonItem, IonLabel, IonList, IonTitle, IonContent]
})
export class Tab3Page {
  private readonly http:HttpClient;

  peliculas:any = [];
  constructor(http:HttpClient,private cdr:ChangeDetectorRef) {
    this.http = http;
    this.buscarPeliculas();
  }

  buscarPeliculas(){
    this.http.get("http://localhost:8080/pelicula/buscar"
      ).subscribe(
      data => {
          this.peliculas=data;
          this.cdr.detectChanges();
      }
    )
  }

}
