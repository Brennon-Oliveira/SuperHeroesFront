import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SuperHeroesComponent} from "./super-heroes.component";
import {RouterModule} from "@angular/router";

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
    ])
  ],
})
export class SuperHeroesModule { }
