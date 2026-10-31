
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserva.html',
  styleUrl: './reserva.css'
})
export class Reserva implements OnInit {

  reservas: any[] = [];
  funciones: any[] = [];
  peliculas: any[] = [];

  idCliente: number = 0;
  idFuncion: number = 0;
  cantidadEntradas: number = 1;
  totalAPagar: number = 0;
  fechaReserva: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.buscarReservas();
    this.buscarFunciones();
    this.buscarPeliculas();
  }

  buscarReservas() {
    this.http.get<any[]>('http://localhost:8080/reserva/buscar').subscribe(
      resultado => {
        this.reservas = resultado;
      }
    );
  }

  buscarFunciones() {
    this.http.get<any[]>('http://localhost:8080/funcion/buscar').subscribe(
      resultado => {
        this.funciones = resultado;
      }
    );
  }

  buscarPeliculas() {
    this.http.get<any[]>('http://localhost:8080/pelicula/buscar').subscribe(
      resultado => {
        this.peliculas = resultado;
      }
    );
  }

  nombrePelicula(idFuncion: number) {

    let funcion = this.funciones.find(f => f.idfuncion == idFuncion);

    if (funcion) {
      let pelicula = this.peliculas.find(p => p.idpelicula == funcion.idPelicula);

      if (pelicula) {
        return pelicula.titulo;
      }
    }

    return 'Sin película';
  }
  
imagenPelicula(idFuncion: number) {

  let funcion = this.funciones.find(f => f.idfuncion == idFuncion);

  if (funcion) {

    let pelicula = this.peliculas.find(p => p.idpelicula == funcion.idPelicula);

    if (pelicula) {
      return pelicula.imagenPromocional;
    }
  }

  return '';
}


  calcularTotal() {

    let funcion = this.funciones.find(f => f.idfuncion == this.idFuncion);

    if (funcion) {
      this.totalAPagar = funcion.precioEntrada * this.cantidadEntradas;
    } else {
      this.totalAPagar = 0;
    }
  }

  guardarReserva() {

    if (this.idCliente <= 0 || this.idFuncion <= 0 ||
        this.cantidadEntradas <= 0 || !Number.isInteger(this.cantidadEntradas)) {
      alert('Complete correctamente los datos');
      return;
    }

    this.calcularTotal();

    let fecha = new Date();
    this.fechaReserva =
      fecha.getFullYear() + '-' +
      String(fecha.getMonth() + 1).padStart(2, '0') + '-' +
      String(fecha.getDate()).padStart(2, '0');

    let reserva = {
      idCliente: this.idCliente,
      idFuncion: this.idFuncion,
      cantidadEntradas: this.cantidadEntradas,
      totalAPagar: this.totalAPagar,
      fechaReserva: this.fechaReserva
    };

    this.http.post('http://localhost:8080/reserva/guardar', reserva).subscribe({
      next: resultado => {
        alert('Reserva guardada correctamente');
        this.buscarReservas();

        this.idCliente = 0;
        this.idFuncion = 0;
        this.cantidadEntradas = 1;
        this.totalAPagar = 0;
      },
      error: error => {
        console.log('Error completo:', error);
  console.log('Estado HTTP:', error.status);
  console.log('Respuesta del servidor:', error.error);

  alert('Error al guardar la reserva: ' + error.status);
      }
    });
  }

}
