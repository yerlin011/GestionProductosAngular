import {Injectable} from '@angular/core';
import {HttpClient,HttpResponse, HttpHeaders} from '@angular/common/http';
//import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
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

    /**

 * Obtiene lista de todos los productos disponibles, por medio de peticion Get a la url de la API consultada

 * 

 * @return  {Observable}

 */

    public getProductos():Observable<any>{

      return this._http.get(this.url+'productos');

    }

     /**

 * Obtiene un producto especifico, por medio de peticion Get pasando un id como parametro a la url de la API consultada

 * @param  {Observable} {id} 

 * @return  {Observable}

 */

    public getProducto(id):Observable<any>{

        return this._http.get(this.url+'producto/'+id);
    }

      /**

 * Agrega un nuevo producto, por medio de peticion Post pasando los valores en formato json 
   como parametros en la url de la API utilizada

 * @param  {Producto} {producto} 

 * @return  {Observable}

 */
    public addProducto(producto:Producto):Observable<any>{

        let json = JSON.stringify(producto);

        let params= 'json='+json;

        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url+'productos',params,{headers:headers});

    }
        /**

 * Edita los datos de un producto, por medio de peticion Post pasando el id y los valores en formato json 
   como parametros en la url de la API utilizada
 * @param  {any} {id}  
 * @param  {Producto} {producto} 

 * @return  {Observable}

 */

    public editProducto(id, producto:Producto):Observable<any>{

        let json = JSON.stringify(producto);

        let params= 'json='+json;
        let headers= new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url+'update-producto/'+id,params,{headers:headers});

    }

        /**

 * Elimina un producto, por medio de peticion Get pasando el id 
   como parametro en la url de la API utilizada

 * @param  {any} {id}  
 
 * @return  {Observable}

 */

    public deleteProducto(id):Observable<any>{

        return this._http.get(this.url+'delete-producto/'+id);
    }


        /**

 * Envia el archivo a guardar, por medio de peticion Post a la url de la API indicada como parametro
 * @param  {string} {url}  
 * @param  {Array<string>} {params} 
 * @param  {Array<File>} {files} 
 * @return  {Promise}

 */

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
