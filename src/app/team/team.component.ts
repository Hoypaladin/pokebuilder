import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon,Type } from '../model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  @Input() team: Pokemon[];
  @Input() editable:boolean;
  @Output() selectPokemonEvent = new EventEmitter();
  constructor() { }

  deletePokemon(index:number):void{
    // we want to delete the pokemon from the team,
    // and then move the pokemons to fill the gap
    this.team[index] = null;
    var currentIndex:number = index + 1;
    while(this.team[currentIndex]){
      this.team[currentIndex - 1] = this.team[currentIndex];
      this.team[currentIndex] = null;
      currentIndex++;
    }
  }
  selectPokemon(index: number){
    if(this.team[index]){
      this.selectPokemonEvent.emit(index);
    }
  }
  ngOnInit(): void {
  }

}
