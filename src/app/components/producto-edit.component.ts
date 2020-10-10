import {Component} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import{ProductoService} from '../services/producto.service';
import{Producto} from './models/producto';
import {GLOBAL} from '../services/global';


@Component({

    selector:'producto-edit',
    templateUrl:'./productos-add.component.html',
    providers:[ProductoService]

})
export class ProductoEditComponent{

    public titulo:String;
    public producto:Producto;
    public fileToUpload:any;
    public resultUpload:any;


    constructor(private _productoService:ProductoService,private _router:Router,
        private _route:ActivatedRoute){

       this.titulo = "Editar producto";
       this.producto = new Producto(0,"","",0,"");

    }

    ngOnInit(){
       
        console.log(this.titulo);

    }

    onSubmit(){

    }

    fileChangeEvent(fileInput:any){

        this.fileToUpload = <Array<File>> fileInput.target.files;
    
        console.log(this.fileToUpload);
    
       }

}