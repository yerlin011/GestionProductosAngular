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

    /**

 * Permite listar todos los productos disponibles

 * 

 * @return  {void}

 */

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

    /**

 * Permite mostrar los botones para confirmar o cancelar el borrado de un producto

 * @param  {any}  {id}

 * @return {void}

 */

    borrarConfirm(id){
      this.confirmado = id;
    }

    /**

 * Permite cancelar el borrado de un producto

 * 

 * @return {void}

 */

    cancelarConfirm(){

      this.confirmado = null;
    }

     /**

 * Permite el borrado de un producto

 * 

 * @return {void}

 */

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