import { Component } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms'
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-clasificacion',
  styleUrl: './clasificacion.css',
  templateUrl: './clasificacion.html',
})
export class Clasificacion {
private readonly http: HttpClient;

  formulario: FormGroup;
  clasificaciones: any = [];

  constructor(http: HttpClient, private fb: FormBuilder){
    
    this.http = http;

    this.formulario = this.fb.group({
      nombre:['', Validators.required],

    })


    
    this.buscarClasificaciones();

}

buscarClasificaciones(){
  this.http.get("http://localhost:8080/clasificacion/buscar" 
  ).subscribe(
    data => this.clasificaciones=data
  )
}
 guardarClasificacion(){
  if(this.formulario.valid){
    let temp = {... this.formulario.value};
          this.http.post("http://localhost:8080/clasificacion/guardar"
                    ,temp).subscribe(
          clasificacion => this.mostrarClasificacion(clasificacion)

                     )} else{
    alert("Completar los campos");
   }
  }
  mostrarClasificacion(clasificacion:any){

if (clasificacion?.idclasificacion){
  alert("Clasificación creada existosamente:"+ clasificacion.idclasificacion);

  this.buscarClasificaciones();
} else{
  alert("Error al conectarse con el servidor");
}
  }
 

}

