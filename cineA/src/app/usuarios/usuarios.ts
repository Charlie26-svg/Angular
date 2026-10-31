import { Component, ChangeDetectorRef } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms'
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-usuarios',
  styleUrl: './usuarios.css',
  templateUrl: './usuarios.html',
})
export class Usuarios {
private readonly http: HttpClient;
formulario: FormGroup;
usuarios: any =[]; 


 constructor(http: HttpClient, private fb: FormBuilder, private cdr: ChangeDetectorRef){
      this.http = http;


this.formulario = this.fb.group(
      {
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono:['', Validators.required],
      userName:['',Validators.required],
      idRol:['', Validators.required],
      Fotografia:['']
    }
  );
    this.buscarUsuarios();

}

buscarUsuarios(){
  this.http.get("http://localhost:8080/usuario/buscar"
    ).subscribe(
    data => {this.usuarios=data;
    this.cdr.detectChanges();
}
    )
}
 guardar(){
    if(this.formulario.valid){
      let temp = {... this.formulario.value};
      temp.fechacreacion = new Date();
      this.http.post("http://localhost:8080/usuario/guardar"
        ,temp).subscribe(
    user => this.mostrar(user)
   ) }
   else{
    alert("Completar los campos");
   }
  }
  mostrar(user:any){

if (user?.idusuario){
  alert("Usuario creado existosamente con ID:"+ user.idusuario);

  this.buscarUsuarios();
} else{
  alert("Error al conectarse con el servidor");
}


  }
    verTelefonos(usuario:any){
    location.href= "/telefonos/"+usuario.idusuario;
  }

}
