import {Component} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {ProductoService} from '../services/producto.service';
import {Producto} from './models/producto';


@Component({

     selector: 'productos',
     templateUrl: './productos-list.component.html',
     providers:[ProductoService]

})


export class ProductosListComponent{


    public titulo:String;
    public productos:Producto[];
    public confirmado;

    constructor(
     private _route:ActivatedRoute,
     private _router:Router,
     private _productoService:ProductoService

    ){

     this.confirmado=null;
     this.titulo = "Listado de productos";
     this.getListaProductos();

    }

    getListaProductos(){

      this._productoService.getProductos().subscribe(
        result=>{
          
  
          if(result.code!=200){
  
            console.log(result);
          }else{
            this.productos = result.data;
  
          }
       
          
        },
        error=>{
          console.log(<any>error);
        }
  
       );
    }



    ngOnInit(){

        console.log(this.titulo);
    }

    borrarConfirm(id){
      this.confirmado = id;
    }

    cancelarConfirm(){

      this.confirmado = null;
    }

   onDeleteProducto(id){

      this._productoService.deleteProducto(id).subscribe(
        result=>{

            if(result.code==200){

              this.getListaProductos();
            }else{
              
              alert("Ocurrio un problema, el producto no se pudo eliminar!");

            }
        },
        error=>{
          console.log(<any>error);

        }
        
      
        );
      }

}