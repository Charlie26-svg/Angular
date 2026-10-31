
import { Component, ChangeDetectorRef } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonButton } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab4',
  standalone: true,
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonList, IonButton,
    FormsModule, CommonModule
  ]
})
export class Tab4Page {

  private readonly http: HttpClient;

  peliculas: any = [];
  funciones: any = [];
  asientos: any = [];
  asientosSeleccionados: any[] = [];
  reservas:any=[]

  idPelicula: number = 0;
  idFuncion: number = 0;
  idSala: number = 0;
  precioEntrada: number = 0;
  idCliente: number =0;

  cantidadEntradas: number = 1;
  totalAPagar: number = 0;

  constructor(http: HttpClient, private cdr: ChangeDetectorRef) {
    this.http = http;
    this.buscarPeliculas();
    this.buscarFunciones();
    this.buscarReservas();
  }

  buscarPeliculas() {
    this.http.get("http://localhost:8080/pelicula/buscar").subscribe(
      data => {
        this.peliculas = data;
        this.cdr.detectChanges();
      }
    );
  }

  buscarFunciones() {
    this.http.get("http://localhost:8080/funcion/buscar").subscribe(
      data => {
        this.funciones = data;
        this.cdr.detectChanges();
      }
    );
  }

  buscarAsientos() {
    this.asientosSeleccionados = [];

    this.http.get("http://localhost:8080/asiento/buscar/" + this.idSala)
    .subscribe(
      data => {
        this.asientos = data;
        this.cdr.detectChanges();
      }
    );
  }

  seleccionarPelicula(id: number) {
    this.idPelicula = id;
    this.idFuncion = 0;
    this.idSala = 0;
    this.precioEntrada = 0;
    this.cantidadEntradas = 1;
    this.totalAPagar = 0;
    this.asientos = [];
    this.asientosSeleccionados = [];
  }

  seleccionarFuncion(funcion: any) {
    this.idFuncion = funcion.idfuncion;
    this.idSala = funcion.idSala;
    this.precioEntrada = funcion.precioEntrada;
    this.cantidadEntradas = 1;
    this.calcularTotal();
    this.asientos = [];
    this.asientosSeleccionados = [];
  }

  calcularTotal() {
    if (this.cantidadEntradas >= 1 &&
        Number.isInteger(Number(this.cantidadEntradas))) {
      this.totalAPagar = this.precioEntrada * this.cantidadEntradas;
    } else {
      this.totalAPagar = 0;
    }

    if (this.asientosSeleccionados.length > this.cantidadEntradas) {
      this.asientosSeleccionados = [];
    }
  }

  seleccionarAsiento(asiento: any) {

    let existe = this.asientosSeleccionados.find(
      a => a.idasiento == asiento.idasiento
    );

    if (existe) {
      this.asientosSeleccionados = this.asientosSeleccionados.filter(
        a => a.idasiento != asiento.idasiento
      );
    } else {

      if (this.asientosSeleccionados.length < this.cantidadEntradas) {
        this.asientosSeleccionados.push(asiento);
      } else {
        alert('Ya seleccionaste la cantidad de entradas');
      }

    }

  }

  guardarReserva() {

  if (this.idCliente <= 0) {
    alert('Ingrese el ID del cliente');
    return;
    this.buscarReservas();
  }

  if (this.idFuncion <= 0 || this.totalAPagar <= 0 ||
      this.cantidadEntradas < 1 ||
      !Number.isInteger(Number(this.cantidadEntradas))) {
    alert('Seleccione una función y una cantidad válida');
    return;
  }

  if (this.asientosSeleccionados.length != this.cantidadEntradas) {
    alert('Seleccione todos los asientos');
    return;
  }

  let fecha = new Date();

  let fechaReserva =
    fecha.getFullYear() + '-' +
    String(fecha.getMonth() + 1).padStart(2, '0') + '-' +
    String(fecha.getDate()).padStart(2, '0');

  let reserva = {
    idCliente: this.idCliente,
    idFuncion: this.idFuncion,
    cantidadEntradas: this.cantidadEntradas,
    totalAPagar: this.totalAPagar,
    fechaReserva: fechaReserva
  };

  this.http.post("http://localhost:8080/reserva/guardar", reserva)
  .subscribe({
    next: data => {
      alert('Reserva guardada correctamente');

      this.idCliente = 0;
      this.idPelicula = 0;
      this.idFuncion = 0;
      this.idSala = 0;
      this.cantidadEntradas = 1;
      this.precioEntrada = 0;
      this.totalAPagar = 0;
      this.asientos = [];
      this.asientosSeleccionados = [];

      this.cdr.detectChanges();
    },
    error: error => {
      console.log(error);
      alert('Error al guardar la reserva');
    }
  });

}

buscarReservas() {
  this.http.get("http://localhost:8080/reserva/buscar").subscribe(
    data => {
      this.reservas = data;
      this.cdr.detectChanges();
    }
  )
}

buscarPeliculaReserva(idFuncion: number) {

  let funcion = this.funciones.find(
    (f: any) => f.idfuncion == idFuncion
  );

  if (funcion) {
    let pelicula = this.peliculas.find(
      (p: any) => p.idpelicula == funcion.idPelicula
    );

    return pelicula;
  }

  return null;
}

}
