import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { CreateTeamComponent } from './create-team/create-team.component'

const routes: Routes = [
  {path:'', redirectTo:"/home", pathMatch:'full'},
  {path:"home", component:HomeComponent},
  {path:'edit/:index', component:CreateTeamComponent}
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
