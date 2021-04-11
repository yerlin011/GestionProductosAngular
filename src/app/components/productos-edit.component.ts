import {Component} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import{ProductoService} from '../services/producto.service';
import{Producto} from './models/producto';
import {GLOBAL} from '../services/global';


@Component({

    selector:'producto-edit',
    templateUrl:'./productos-edit.component.html',
    providers:[ProductoService]

})

export class ProductosEditComponent{

    public titulo:String;
    public producto:Producto;
    public fileToUpload:any;
    public resultUpload:any;
    public is_edit:boolean;

 


    constructor(private _productoService:ProductoService,private _router:Router,
        private _route:ActivatedRoute){

       this.titulo = "Editar producto";
       this.producto = new Producto(0,"","",0,"");
       this.is_edit= true;
       
    }

    ngOnInit(){
       
        console.log(this.titulo);
        this.getProducto();

    }

    /**

 * Permite coordinar las acciones a seguir, cuando se hace submit en el formulario de editar productos

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
              this.editProducto();
  
  
           },
  
           error=>{
               console.log(error);
           }
  
  
          );
  
  
  
        }else{
  
          this.editProducto();
  
        }
  

    }

 /**

 * Permite obtener datos de un producto, a partir del id pasado como parametro en la url

 * 

 * @return  {void}

 */

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

 /**

 * Permite editar los datos de un producto, a partir del id pasado como parametro en la url

 * 

 * @return  {void}

 */

    editProducto(){

            this._route.params.forEach((params:Params)=>{
            var id = params['id'];

            this._productoService.editProducto(id,this.producto).subscribe(
    
                response=>{
        
                    if(response.code == 200){
                    
                        this._router.navigate(['/producto',id]);

                     
        
                    }else{

                      console.log(response);
                    }
                   
                },
                error => {
        
                    console.log(<any>error);
        
                }
              );
        });
       
       
    
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