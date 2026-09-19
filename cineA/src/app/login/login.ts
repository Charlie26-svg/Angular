import { Component } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms'
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';


@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
private readonly http: HttpClient;
formulario: FormGroup;

  constructor(http: HttpClient, private fb: FormBuilder) {
    this.http = http;
    this.formulario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
 

  }

  login() {
this.http.post("http://localhost:8080/usuario/login", this.formulario.value).subscribe(
  user => this.validar(user)
)  
}
validar(usuario: any) {
  if(usuario?.idusuario) {
    location.href = "/bienvenida";
}
else {
  alert("Usuario o password incorrectos");
}
}
}
