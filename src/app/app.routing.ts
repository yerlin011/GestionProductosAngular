import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import {HomeComponent} from './components/home.component';
import {ErrorComponent} from './components/error.component';
import {ProductosListComponent} from './components/productos-list.component';
import {ProductosAddComponent} from './components/productos-add.component';


const routes: Routes =[
       
      {path:'', component:HomeComponent},
      {path:'home',component:HomeComponent},
      {path:'productos',component:ProductosListComponent},
      {path:'crear-producto',component:ProductosAddComponent},
      {path:'**',component:ErrorComponent}
  
];


export const RouterWithProviders:any[]=[];
export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);