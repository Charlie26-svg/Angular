import { Component } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms'
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-genero',
  styleUrl: './genero.css',
  templateUrl: './genero.html',
})
export class Genero {
private readonly http: HttpClient;

  formulario: FormGroup;
  generos: any = [];

  constructor(http: HttpClient, private fb: FormBuilder){
    
    this.http = http;

    this.formulario = this.fb.group({
      nombre:['', Validators.required],

    })


    
    this.buscarGeneros();

}

buscarGeneros(){
  this.http.get("http://localhost:8080/genero/buscar" 
  ).subscribe(
    data => this.generos=data
  )
}
 guardarGenero(){
  if(this.formulario.valid){
    let temp = {... this.formulario.value};
          this.http.post("http://localhost:8080/genero/guardar"
                    ,temp).subscribe(
          genero => this.mostrarGenero(genero)

                     )} else{
    alert("Completar los campos");
   }
  }
  mostrarGenero(genero:any){

if (genero?.idgenero){
  alert("Género creado existosamente:"+ genero.idgenero);

  this.buscarGeneros();
} else{
  alert("Error al conectarse con el servidor");
}
  }
 

}
