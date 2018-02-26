import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HeroesComponent} from "./heroes/heroes.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

@NgModule({
    //Add an @NgModule.exports array with RouterModule in it.
    //Exporting RouterModule makes router directives available for use in the AppModule components that will need them.
    exports: [RouterModule],


    //The forRoot() method supplies the service providers and directives needed for routing,
    // and performs the initial navigation based on the current browser URL.
    imports: [RouterModule.forRoot(routes)],

  //generally don't declare components in a routing module so you can delete the @NgModule.declarations array and delete CommonModule references too.
  // imports: [
  //   CommonModule
  // ],
  // declarations: [],
})

const routes: Routes = [
    {path: 'heroes', component: HeroesComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];
export class AppRoutingModule { }
