import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateTeamComponent } from './create-team/create-team.component';
import { TeamComponent } from './team/team.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PokemonComponent } from './pokemon/pokemon.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateTeamComponent,
    TeamComponent,
    PokemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
