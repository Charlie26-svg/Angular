import { Routes } from '@angular/router';
import { Bienvenida } from './bienvenida/bienvenida';
import { Login } from './login/login';

export const routes: Routes = [
    {path:'', component:Login},
    {path:'bienvenida', component:Bienvenida},
];

