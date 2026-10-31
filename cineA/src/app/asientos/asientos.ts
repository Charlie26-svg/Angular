import { Component, ChangeDetectorRef, inject } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms'
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-asientos',
  styleUrl: './asientos.css',
  templateUrl: './asientos.html',
})
export class Asientos {


  private readonly http: HttpClient;

  private route = inject(ActivatedRoute);

  asientos: any = [];
  idsala:any;
  fila:any;
  numero:any;
  filasAgrupadas:any = [];
  cantidad:any;

  constructor(http: HttpClient, private fb: FormBuilder, private cdr: ChangeDetectorRef){


          this.http = http;
          this.idsala=this.route.snapshot.paramMap.get("idsala");
          this.buscarAsientos(this.route.snapshot.paramMap.get("idsala"))

    console.log(this.route.snapshot.paramMap.get('idsala'));

  }

 buscarAsientos(idSala:any){

  this.http.get("http://localhost:8080/asiento/buscar/" +idSala
  ).subscribe(
  (data:any) =>{

    this.asientos=data;

    let filas:any = {};

    for(let asiento of this.asientos){

      if(!filas[asiento.fila]){
        filas[asiento.fila]=0;
      }

      filas[asiento.fila]++;

    }

    this.filasAgrupadas = Object.keys(filas).map(fila => ({
      fila:fila,
      cantidad:filas[fila]
    }));

    this.cdr.detectChanges();

  }
  )

}
guardarAsiento(){

  if(!this.fila || !this.cantidad || this.cantidad<=0 || !Number.isInteger(Number(this.cantidad))){
    alert("Ingrese los datos correctamente");
    return;
  }

  let existentes=this.asientos.filter((a:any)=>a.fila==this.fila);

  let ultimo=0;

  for(let a of existentes){
    if(a.numero>ultimo){
      ultimo=a.numero;
    }
  }

  let nuevos:any=[];

  for(let i=1;i<=this.cantidad;i++){

    nuevos.push({
      idSala:this.idsala,
      fila:this.fila,
      numero:ultimo+i
    });

  }

  this.http.post("http://localhost:8080/asiento/guardar-varios",nuevos)
  .subscribe(data=>{

    alert("Asientos agregados");

    this.buscarAsientos(this.idsala);

    this.fila="";
    this.cantidad=null;

  });

}

}
