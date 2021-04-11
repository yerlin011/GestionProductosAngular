import {Component} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {ProductoService} from '../services/producto.service';
import {Producto} from './models/producto';
import { GLOBAL } from '../services/global';

@Component({
selector:'productos-add',
templateUrl:'./productos-add.component.html',
providers:[ProductoService]

})

export class ProductosAddComponent{

    public titulo:String;
    public producto:Producto; 
    public fileToUpload;
    public resultUpload;

    constructor(
         private _productoService:ProductoService,
         private _route:ActivatedRoute,
         private _router:Router

    ){

        this.titulo = "Crear nuevo producto";
        this.producto = new Producto(0,"","",0,"");

    }

    ngOnInit(){

         console.log("Se cargo productos-add.component.ts");

    }

      /**

 * Permite coordinar las acciones a seguir, cuando se hace submit en el formulario de crear productos

 * 

 * @return  {void}

 */


   onSubmit(){

      console.log(this.producto);

      if(this.fileToUpload && this.fileToUpload.length>=1){

        this._productoService.makeFileRequest(GLOBAL.url+'upload-file',[],
        this.fileToUpload).then((result)=>{


            console.log(result);
            this.resultUpload =result;

            this.producto.imagen = this.resultUpload.file;
            this.saveProducto();


         },

         error=>{
             console.log(error);
         }


        );



      }else{

        this.saveProducto();

      }


      
   }

   
 /**

 * Permite agregar un nuevo producto

 * 

 * @return  {void}

 */


   saveProducto(){

    this._productoService.addProducto(this.producto).subscribe(

        response=>{

            if(response.code == 200){
               
                this._router.navigate(['/productos']);

            }else{
              console.log(response);
            }
           
        },
        error => {

            console.log(<any>error);

        }
      );

   }

   /**

 * Obtiene el archivo o fichero a subir

 * @param  {any}

 * @return  {void}

 */
   
   fileChangeEvent(fileInput:any){

    this.fileToUpload = <Array<File>> fileInput.target.files;

    console.log(this.fileToUpload);

   }

}