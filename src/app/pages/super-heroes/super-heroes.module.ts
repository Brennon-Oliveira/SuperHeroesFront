import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SuperHeroesComponent} from "./super-heroes.component";
import {RouterModule} from "@angular/router";
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [SuperHeroesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SuperHeroesComponent,
        data: {
          title: 'Super Heroes',
          robots: 'noindex, nofollow',
        },
      },
    ]),
    MatTableModule
  ],
})
export class SuperHeroesModule { }
