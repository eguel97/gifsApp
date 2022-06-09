import { Component, OnInit, NgModule, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent{  

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor(private serviceGifs:GifsService){

  }

  buscar(){    
    var valor = this.txtBuscar.nativeElement.value;
    if(valor.trim().length === 0){
      return; 
    }
    this.serviceGifs.searchGifs(valor);
    this.txtBuscar.nativeElement.value = "";
  }

}
