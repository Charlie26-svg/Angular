
import { Component, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-funciones',
  styleUrl: './funciones.css',
  templateUrl: './funciones.html',
})
export class Funciones {

  private readonly http: HttpClient;

  formulario: FormGroup;

  funciones: any[] = [];
  peliculas: any[] = [];
  salas: any[] = [];

  constructor(
    http: HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {

    this.http = http;

    this.formulario = this.fb.group({
      idPelicula: ['', Validators.required],
      idSala: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      precioEntrada: ['', [Validators.required, Validators.min(1)]]
    });

    this.buscarFunciones();
    this.buscarPeliculas();
    this.buscarSalas();
  }

  buscarFunciones() {
    this.http.get<any[]>(
      "http://localhost:8080/funcion/buscar"
    ).subscribe({
      next: (data) => {
        this.funciones = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Error al buscar funciones:", error);
      }
    });
  }

  buscarPeliculas() {
    this.http.get<any[]>(
      "http://localhost:8080/pelicula/buscar"
    ).subscribe({
      next: (data) => {
        this.peliculas = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Error al buscar películas:", error);
      }
    });
  }

  buscarSalas() {
    this.http.get<any[]>(
      "http://localhost:8080/sala/buscar"
    ).subscribe({
      next: (data) => {
        this.salas = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Error al buscar salas:", error);
      }
    });
  }

  guardar() {

    if (this.formulario.valid) {

      let temp = {
        ...this.formulario.value,
        idPelicula: Number(this.formulario.value.idPelicula),
        idSala: Number(this.formulario.value.idSala),
        precioEntrada: Number(this.formulario.value.precioEntrada)
      };

      this.http.post(
        "http://localhost:8080/funcion/guardar",
        temp
      ).subscribe({
        next: (funcion) => {
          this.mostrar(funcion);
        },
        error: (error) => {
          console.error("Error al guardar función:", error);
          alert("Error al guardar la función");
        }
      });

    } else {
      this.formulario.markAllAsTouched();
      alert("Completar los campos");
    }
  }

  mostrar(funcion: any) {

    if (funcion?.idfuncion) {

      alert("Función creada exitosamente con ID: " + funcion.idfuncion);

      this.buscarFunciones();
      this.formulario.reset();

    } else {
      alert("Error al conectarse con el servidor");
    }
  }

  obtenerNombrePelicula(id: any): string {
    const pelicula = this.peliculas.find(
      p => Number(p.idpelicula) === Number(id)
    );

    return pelicula ? pelicula.titulo : "ID " + id;
  }

  obtenerNombreSala(id: any): string {
    const sala = this.salas.find(
      s => Number(s.idsala ?? s.idSala) === Number(id)
    );

    return sala ? sala.nombre : "ID " + id;
  }

}
