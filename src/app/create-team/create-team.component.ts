import { Component, OnInit, Input } from '@angular/core';
import { Pokemon, Move } from '../model'
import { ApiService } from '../api.service';
import { TeamComponent } from '../team/team.component';
import { Observable, forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  team: Pokemon[];
  // listPokemon: Object[];
  chosenPokemon: Pokemon;
  moveset: Move[];
  searchName: string = "";
  moveIndex: number[] = [null, null, null, null];
  selectedMoveIndex: number = null;
  otherMoveIndex: number[] = [];
  error :string =  "";
  errorAddTeam: string = "";
  find() : void{
    if(!this.searchName){
      this.error = "Please put a name"
    }else{
      this.error = "";
      this.errorAddTeam = "";
      this.moveset = [];
      this.moveIndex = [null, null, null, null];
      this.selectedMoveIndex = null;
      this.api.getPokemonByName(this.searchName.toLowerCase())
      .subscribe(
        data => {
          var types = [data.types[0].type.name]
          if(data.types.length > 1 ){
            types.push(data.types[1].type.name)
          }
          this.chosenPokemon = {
            id: data.id,
            name: data.name,
            moves: [null, null, null, null],
            image: data.sprites.front_default,
            type: types,
            hp:data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            spAtk: data.stats[3].base_stat,
            spDef: data.stats[4].base_stat,
            speed: data.stats[1].base_stat
          }
          this.getAllMoves(data.moves);
      },
      error => {
        if(error.status == 404){
          this.error = "Sorry, the pokemon you requested does not exist"
        }else{
          this.error = "There was a problem with the request"
        }
      })
    }
  }
  getAllMoves(moves: Array<any>): void{
    var arrayObs: Array<Observable<any>> = [];

    for(let move of moves){
      arrayObs.push(this.api.getObjectFromURL(move.move.url))
    }
    forkJoin(arrayObs).subscribe(results => {
      this.createMoveset(results)
    })
  }
  createMoveset(results:any){
    var movesDetails: Array<Move> = []
    for(let result of results){
      movesDetails.push({
        type: result.type.name,
        pp: result.pp,
        power: result.power? result.power.toString() : "--",
        description: result.effect_entries[0].short_effect.replace("$effect_chance", result.effect_chance),
        accuracy: result.accuracy? result.accuracy.toString() : "--",
        name: result.name
      })
    }
    this.moveset = movesDetails;
  }
  chooseMoveIndex(index: number){
    this.otherMoveIndex = [];
    if(this.selectedMoveIndex == index){
      this.selectedMoveIndex = null;

    }else{
      this.selectedMoveIndex = index;
      for(let i=0; i<4; i++){
        if(i != index && this.moveIndex[i]!=null){
          this.otherMoveIndex.push(this.moveIndex[i]);
        }
      }
    }
  }
  selectMove(index: number){
    if(this.moveIndex[this.selectedMoveIndex] == index){
      this.moveIndex[this.selectedMoveIndex] = null;
      this.chosenPokemon.moves[this.selectedMoveIndex] = null;
    }else{
      this.moveIndex[this.selectedMoveIndex] = index;
      this.chosenPokemon.moves[this.selectedMoveIndex] = this.moveset[index]
    }
  }
  addToTeam(){
    // need to check if the pokemon already exists in the team
    for(let pokemon of this.team){
      if(pokemon){
        if(pokemon.name == this.chosenPokemon.name){
          this.errorAddTeam = "This pokemon is already in your team"
          return;
        }
      }
    }
    // replace last not null pokemon
    for(let i=0; i<6; i++){
      if(!this.team[i]){
        this.team[i] = this.chosenPokemon;
        break;
      }
    }
    this.chosenPokemon = null;
    this.moveset = [];
    this.moveIndex = [null, null, null, null];
    this.selectedMoveIndex = null;
    this.searchName = "";
  }
  formatName(name: string): string{
    return name.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }
  selectPokemon(index: number){
    this.chosenPokemon = this.team[index];
    this.api.getPokemonByName(this.team[index].name)
    .subscribe(data => {
      var arrayObs: Array<Observable<any>> = [];
      var movesDetails: Array<Move> = []
      for(let move of data.moves){
        arrayObs.push(this.api.getObjectFromURL(move.move.url))
      }
      forkJoin(arrayObs).subscribe(results => {
        this.createMoveset(results)
        // need to find the selected moves on our chosen pokemon
        for(let i=0; i<this.moveset.length; i++){
          if(this.chosenPokemon.moves[0].name == this.moveset[i].name){
            this.moveIndex[0] = i
          }else if(this.chosenPokemon.moves[1].name == this.moveset[i].name){
            this.moveIndex[1] = i
          }else if(this.chosenPokemon.moves[2].name == this.moveset[i].name){
            this.moveIndex[2] = i
          }else if(this.chosenPokemon.moves[3].name == this.moveset[i].name){
            this.moveIndex[3] = i
          }
        }
      })
    })
  }
  constructor(private api :ApiService,
              private teamsService: TeamsService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    // this.listPokemon = this.api.getAllPokemon();
    var index = +this.route.snapshot.paramMap.get('index');
    this.team = this.teamsService.teams[index];
  }

}
