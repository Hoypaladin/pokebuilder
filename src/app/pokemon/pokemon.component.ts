import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../model'

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  @Input() pokemon :Pokemon;
  @Input() editable: boolean;
  @Output() deleteEvent = new EventEmitter();
  constructor() { }

  delete(){
    this.deleteEvent.emit();
  }
  ngOnInit(): void {
  }

}
