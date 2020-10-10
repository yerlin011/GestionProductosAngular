import {Injectable} from '@angular/core';
import {HttpClient,HttpResponse, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/observable';
import {Producto} from '../components/models/producto';
import {GLOBAL} from './global';


@Injectable(

)

export class ProductoService{

    public url:String;

    constructor(

        public _http:HttpClient
    ){


        this.url = GLOBAL.url;
    }

    public getProductos():Observable<any>{

      return this._http.get(this.url+'productos');

    }

    public getProducto(id):Observable<any>{

        return this._http.get(this.url+'producto/'+id);
    }

    public addProducto(producto:Producto):Observable<any>{

        let json = JSON.stringify(producto);

        let params= 'json='+json;

        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url+'productos',params,{headers:headers});

    }

    public makeFileRequest(url:string,params:Array<string>, files:Array<File>){

        return new Promise((resolve,reject)=>{

            var formData:any = new FormData();
            var xhr = new XMLHttpRequest();

            for(var i=0;i<files.length;i++){
                formData.append('uploads[]',files[i],files[i].name);
            }

            xhr.onreadystatechange = function(){

                if(xhr.readyState==4){

                    if(xhr.status==200){
                        resolve(JSON.parse(xhr.response));

                    }else{
                        reject(xhr.response);
                    }
                }
            };

            xhr.open("POST",url,true);
            xhr.send(formData);
        });




    }

}