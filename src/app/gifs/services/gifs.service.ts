import { HttpClient, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SerchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})


  export class GifsService {
    private apikey : string='3Tx3gKSCZHhaKVjyShLNwHwuk7WkNFlE';
    private _historial:string[]=[];
    private servicioUrl:string = 'https://api.giphy.com/v1/gifs'; 
    public resultados : Gif[] =[];

    get historial(){
      
      return [...this._historial];
    }

    constructor(private http:HttpClient){

      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
      this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    }

    buscarGifs(query:string= ''){
      
      query = query.trim().toLocaleLowerCase();
        if(!this._historial.includes(query)){
          this._historial.unshift(query);
          this._historial=this._historial.splice(0,10);

          localStorage.setItem('historial',JSON.stringify(this._historial));
        }
        const params = new HttpParams().set('api_key',this.apikey)
        .set('limit',10)
        .set('q', query);

      this.http.get<SerchGifsResponse>(`${this.servicioUrl}/search`,{params})
      .subscribe( ( resp  ) =>{
        
        this.resultados = resp.data;
        localStorage.setItem('resultados',JSON.stringify(this.resultados));
      })
      
    }

  }

