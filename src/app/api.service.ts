import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Pokemon, Type, Move } from './model'
import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = "https://pokeapi.co/api/v2/"
  // getAllPokemon(){
  //   var allPokemon = [];
  //   for(let i=1; i<800; i++){
  //     this.http.get("https://pokeapi.co/api/v2/pokemon/"+i)
  //     .subscribe(pokemon => allPokemon.push({
  //       name: pokemon.name,
  //       type: pokemon.types
  //     }))
  //   }
  //   return allPokemon;
  // }

  getPokemonByName(name: string): Observable<any> {
    return this.http.get<any>(this.url + "pokemon/" + name)
  }
  getObjectFromURL(url: string): Observable<any>{
    return this.http.get<any>(url);
  }
  constructor(private http: HttpClient) { }
}
