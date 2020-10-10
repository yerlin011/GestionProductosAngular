import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import {HomeComponent} from './components/home.component';
import {ErrorComponent} from './components/error.component';
import {ProductosListComponent} from './components/productos-list.component';
import {ProductosAddComponent} from './components/productos-add.component';
import { ProductoDetailComponent } from './components/producto-detail.component';
import { ProductoEditComponent } from './components/producto-edit.component';


const routes: Routes =[
       
      {path:'', component:HomeComponent},
      {path:'home',component:HomeComponent},
      {path:'productos',component:ProductosListComponent},
      {path:'crear-producto',component:ProductosAddComponent},
      {path:'producto/:id',component:ProductoDetailComponent},
      {path:'editar-producto/:id',component:ProductoEditComponent},
      {path:'**',component:ErrorComponent}
  
];


export const RouterWithProviders:any[]=[];
export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);