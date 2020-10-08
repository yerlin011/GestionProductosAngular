import {Component} from '@angular/core';


@Component({

    selector:"error",
    templateUrl:"./error.component.html"

})

export class ErrorComponent{

    public titulo:String = "";


    constructor(){

      this.titulo = "Error!! Pagina no encontrada"
    }


    ngOnInit(){

        console.log("Se cargo el componente de error");
    }
}