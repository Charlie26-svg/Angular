import { Routes } from '@angular/router';
import { Bienvenida } from './bienvenida/bienvenida';
import { Login } from './login/login';
import { Anuncios } from './anuncios/anuncios';
import { Usuarios } from './usuarios/usuarios';
import { Genero } from './genero/genero';
import { Salas } from './salas/salas';
import { Clasificacion } from './clasificacion/clasificacion';
import { Examenes } from './examenes/examenes';
import { Telefonos } from './telefonos/telefonos';
import { Asientos } from './asientos/asientos';
import { Peliculas } from './peliculas/peliculas';
import { Funciones } from './funciones/funciones';
import { Reserva } from './reserva/reserva';

export const routes: Routes = [
    {path:'', component:Login},
    {path:'bienvenida', component:Bienvenida},
    {path:'anuncios', component:Anuncios},
    {path:'usuarios', component:Usuarios},
    {path:'genero', component:Genero},
    {path:'clasificacion', component:Clasificacion},
    {path:'salas', component:Salas},
    {path:'examenes', component:Examenes},
    {path: 'telefonos/:idusuario', component:Telefonos},
    {path: 'asientos/:idsala', component:Asientos},
    {path:'peliculas', component:Peliculas},
    {path:'funciones', component:Funciones},
    {path:'reservas', component:Reserva},




    






];

