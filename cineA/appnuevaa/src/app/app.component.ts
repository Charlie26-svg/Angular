import { ChangeDetectorRef, Component } from '@angular/core';
import { IonApp, IonRouterOutlet,IonCard, 
  IonCardContent, IonCardHeader, 
  IonCardSubtitle, IonCardTitle, IonInput, 
  IonItem, IonList, IonButton, IonIcon } from '@ionic/angular';
  import { addIcons } from 'ionicons';
import { accessibilityOutline,personAddOutline } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet,IonCard, 
    IonCardContent, IonCardHeader, 
    IonCardSubtitle, IonCardTitle, IonInput, 
    IonItem, IonList, IonButton, IonIcon, FormsModule,CommonModule],
})
export class AppComponent {
  usuario:any = null;
  usuarioLogin:any={};

  crearCuenta:boolean = false;
  usuarioNuevo:any={};
  htpp: HttpClient;

  constructor(http:HttpClient,private cdr:ChangeDetectorRef) {
    addIcons({ accessibilityOutline,personAddOutline });
    this.htpp= http;

  }
   login(){
    if(this.usuarioLogin && this.usuarioLogin.correo && this.usuarioLogin.password ){
      this.htpp.post("http://localhost:8080/usuario/login"
      ,this.usuarioLogin).subscribe(
      user => this.validar(user)
    )
    }
    else{
      alert("Ingrese usuario y password.")
    }

    
  }

  validar(usuario:any){
    if(usuario?.idusuario){
      localStorage.setItem("usuario",JSON.stringify(usuario));
      this.usuario = usuario
    }
    else{
      alert("Usuario o password invalido");
    }
  }

  crearCuentaBtn(){
    this.crearCuenta = true;
    this.usuarioNuevo = {};
  }

  crearUsuario(){
    if(this.usuarioNuevo && this.usuarioNuevo.email && this.usuarioNuevo.password && this.usuarioNuevo.nombre ){
      let temp = {... this.usuarioNuevo};
      temp.fechaCreacion = new Date();
       this.htpp.post("http://localhost:8080/usuario/guardar"
      ,temp).subscribe(
      user => this.mostrar(user)
    )
    }
    else{
      alert("Completar campos");
    }
  }

  mostrar(user:any){
    if(user?.idusuario){
      alert("Usuario credo exitosamente con ID: "+user.idusuario);
      this.crearCuenta = false;
      this.cdr.detectChanges();
    }
    else{
      alert("Error en el servidor")
    }
  }

  cancelar(){
    this.crearCuenta = false;
  }

}

