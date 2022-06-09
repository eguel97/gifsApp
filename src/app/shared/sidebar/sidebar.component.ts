import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public listaHistorial: string[] = [];

  constructor( private serviceGifs:GifsService) { 

  }

  ngOnInit(): void {
    
  }

  get historial(){
    return this.serviceGifs.historial;
  }

  clickItem(item:string){
    this.serviceGifs.searchGifs(item)
  }

}
