import { Component, ChangeDetectorRef } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms'
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-salas',
  styleUrl: './salas.css',
  templateUrl: './salas.html',
})
export class Salas {
private readonly http: HttpClient;

  formulario: FormGroup;
  salas: any = [];

  constructor(http: HttpClient, private fb: FormBuilder, private cdr: ChangeDetectorRef){
    
    this.http = http;

    this.formulario = this.fb.group({
      nombre:['', Validators.required],
      filas:['', Validators.required],
      asientosPorFilas:['', Validators.required],

    })


    
    this.buscarSalas();

}

buscarSalas(){
  this.http.get("http://localhost:8080/sala/buscar" 
  ).subscribe(
    data => {
      this.salas=data
      this.cdr.detectChanges()
    }
  )
}
 guardarSala(){
  if(this.formulario.valid){
    let temp = {... this.formulario.value};
          this.http.post("http://localhost:8080/sala/guardar"
                    ,temp).subscribe(
          sala => this.mostrarSala(sala)

                     )} else{
    alert("Completar los campos");
   }
  }
  mostrarSala(sala:any){

if (sala?.idsala){
  alert("Sala creada existosamente:"+ sala.idsala);

  this.buscarSalas();
} else{
  alert("Error al conectarse con el servidor");
}
  }
 

verAsientos(sala:any){
    location.href= "/asientos/"+sala.idsala;
  }



}
