import {Component} from '@angular/core';


@Component({

    selector:"home",
    templateUrl:"./home.component.html"

})

export class HomeComponent{

    public titulo:String = "";


    constructor(){

      this.titulo = "Webapp de productos creada con angular 9"
    }


    ngOnInit(){

        console.log("Se cargo el componente");
    }
}