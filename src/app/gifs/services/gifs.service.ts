import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http:HttpClient) {
    if(localStorage.getItem('Historial')){      
      this._historial = JSON.parse(localStorage.getItem('Historial')!)           
    }
    //Almacena lo que encuentra en this.resultados. Esto para mostrar siempre el ultimo resultado. 
    if(localStorage.getItem('resultados')){      
      this.resultados = JSON.parse(localStorage.getItem('resultados')!)           
    }
  }

  private apiKey:string = 'df8jA16rlO6ta5OF8T8tA9DXerXd5jLW';
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados:Gif[] = [];

  get historial(){    
    return [...this._historial];
  }

  searchGifs(query:string){    
    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      //Almacena en localStorage
      localStorage.setItem('Historial', JSON.stringify(this._historial))
    } 
    
    //Llamada
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifResponse>(`${this.serviceUrl}/search`, { params } )
      .subscribe( (resp) => {                
        this.resultados = resp.data; 
        localStorage.setItem('resultados', JSON.stringify(this.resultados))                     
    })

  }
}

