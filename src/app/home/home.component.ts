import { Component, OnInit } from '@angular/core';
import { Pokemon,Type } from '../model';
import { TeamComponent } from '../team/team.component'
import {TeamsService} from '../teams.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  teams: Pokemon[][];
  createNewTeam(){
    this.teamsService.teams.push([null, null, null, null, null, null]);
    this.router.navigate(["/edit",this.teamsService.teams.length - 1]);
  }
  goToTeam(index:number){
    console.log(index)
    this.router.navigate(["/edit",index])
  }
  constructor(private teamsService: TeamsService,
              private router: Router) { }

  ngOnInit(): void {
    if(!this.teamsService.teams){
      this.teamsService.teams = [];
    }
    this.teams = this.teamsService.teams;
  }

}
