import {Component} from '@angular/core';
import{Router,ActivatedRoute,Params, NavigationEnd} from '@angular/router';
import {ProductoService} from '../services/producto.service';
import {Producto} from './models/producto';

@Component(
{

    selector:'producto-detail',
    templateUrl:'./producto-detail.component.html',
    providers:[ProductoService]
}
)

export class ProductoDetailComponent{

    public titulo:String = "Detalles de producto";
    public producto:Producto;

    constructor(
        private _productoService:ProductoService, 
        private _router:Router,
        private _route:ActivatedRoute){


            this.producto = new Producto(0,"","",0,"");


    }

    ngOnInit(){
      
        console.log(this.titulo);

        this.getProducto();
    }


    getProducto(){
    this._route.params.forEach((params:Params)=>{
    var id = params['id'];

    this._productoService.getProducto(id).subscribe(
        response=>{
            if(response.code==200){

               this.producto = response.data;

            }else{
               this._router.navigate(['/productos']);
            }
        },
        error=>{
            console.log(<any>error);
        }

    );

    });

     
    }
}