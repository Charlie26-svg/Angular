import { Component, ChangeDetectorRef } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms'
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';


@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-peliculas',
  styleUrl: './peliculas.css',
  templateUrl: './peliculas.html',
})
export class Peliculas {

private readonly http: HttpClient;
formulario: FormGroup;
peliculas: any =[]; 


constructor(http: HttpClient, private fb: FormBuilder, private cdr: ChangeDetectorRef){
      this.http = http;

this.formulario = this.fb.group(
      {
      titulo: ['', Validators.required, ],
      sinopsis: ['', Validators.required],
      duracionMinutos: ['', Validators.required],
      idGenero: ['', Validators.required],
      idClasificacion:['', Validators.required],
      imagenPromocional:['']
    }
  );
    this.buscarPeliculas();

    }

buscarPeliculas(){
  this.http.get("http://localhost:8080/pelicula/buscar"
    ).subscribe(
    data => {this.peliculas=data;
    this.cdr.detectChanges();
}
    )
}
 guardar(){
    if(this.formulario.valid){
      let temp = {... this.formulario.value};
      this.http.post("http://localhost:8080/pelicula/guardar"
        ,temp).subscribe(
    user => this.mostrar(user)
   ) }
   else{
    alert("Completar los campos");
   }
  }
  mostrar(user:any){

if (user?.idpelicula){
  alert("Pelicula creada existosamente con ID:"+ user.idpelicula);

  this.buscarPeliculas();
} else{
  alert("Error al conectarse con el servidor");
}


  }

  cargarImagen(event: Event) {

  const input = event.target as HTMLInputElement;

  if (input.files && input.files.length > 0) {

    const archivo = input.files[0];

    if (!archivo.type.startsWith('image/')) {
      alert('Selecciona una imagen válida');
      input.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {

      const imagen = reader.result;

      if (typeof imagen === 'string') {
        this.formulario.patchValue({
          imagenPromocional: imagen
        });

        this.cdr.detectChanges();
      }

    };

    reader.readAsDataURL(archivo);

  }
}


}
