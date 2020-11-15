import { Injectable } from '@angular/core';
import { Pokemon } from './model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  teams: Pokemon[][];

  constructor() { }
}
