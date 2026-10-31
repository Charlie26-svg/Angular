import { Component } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms'
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-examenes',
  styleUrl: './examenes.css',
  templateUrl: './examenes.html',
})
export class Examenes {
private readonly http: HttpClient;

  formularioExamen: FormGroup;
  examenes: any = [];

  constructor(http: HttpClient, private fb: FormBuilder){
    
    this.http = http;

    this.formularioExamen = this.fb.group({
      nota:['', Validators.required],
      carne:['', Validators.required]

    })


    
    this.buscarExamenes();

}

buscarExamenes(){
  this.http.get("http://localhost:8080/examen/buscar" 
  ).subscribe(
    data => this.examenes=data
  )
}
 guardarExamen(){
  if(this.formularioExamen.valid){
    let temp = {... this.formularioExamen.value};
    temp.fechaexamen = new Date();
          this.http.post("http://localhost:8080/examen/guardar"
                    ,temp).subscribe(
          examen => this.mostrarExamen(examen)

                     )} else{
    alert("Completar los campos");
   }
  }
  mostrarExamen(examen:any){

if (examen?.idexamen){
  alert("Examen creado existosamente:"+ examen.idexamen);

  this.buscarExamenes();
} else{
  alert("Error al conectarse con el servidor");
}
  }
 

}
