import { Component } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms'
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-bienvenida',
  styleUrl: './bienvenida.css',
  templateUrl: './bienvenida.html',
})

export class Bienvenida {
  
private readonly http: HttpClient;
formulario: FormGroup;
  usuarios: any =[];  

  formularioAnuncio: FormGroup;
  anuncios: any = []; 

  constructor(http: HttpClient, private fb: FormBuilder){
    
    this.http = http;
    this.formularioAnuncio = this.fb.group({
      titulo:['', Validators.required],
      descripcion:['',Validators.required],
      imagen:['']

    });


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
    this.buscarAnuncios();

}
buscarUsuarios(){
  this.http.get("http://localhost:8080/usuario/buscar"
    ).subscribe(
    data => this.usuarios=data
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
buscarAnuncios(){
  this.http.get("http://localhost:8080/anuncio/buscar")
  .subscribe(
    data => this.anuncios = data
  )
}

cargarImagen(event:any){

  let archivo = event.target.files[0];

  if(archivo){

    let reader = new FileReader();

    reader.onload = () => {

      this.formularioAnuncio.patchValue({
        imagen: reader.result
      });

    };

    reader.readAsDataURL(archivo);

  }

}

guardarAnuncio(){
  if(this.formularioAnuncio.valid){
      let temp = {... this.formularioAnuncio.value};
let fecha = new Date();

temp.fechaPublicacion =
  fecha.getFullYear() + "-" +
  String(fecha.getMonth() + 1).padStart(2, "0") + "-" +
  String(fecha.getDate()).padStart(2, "0");
console.log(temp);

        this.http.post("http://localhost:8080/anuncio/guardar"
        ,temp).subscribe(
    anuncio => this.mostrarAnuncio(anuncio)
   ) }
   else{
    alert("Completar los campos");
   }
  }
  mostrarAnuncio(anuncio:any){

if (anuncio?.idanuncio){
  alert("Anuncio creado existosamente con ID:"+ anuncio.idanuncio);

  this.buscarAnuncios();
} else{
  alert("Error al conectarse con el servidor");
}

  }
}



