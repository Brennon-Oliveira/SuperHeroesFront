import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SuperHeroesComponent} from "./super-heroes.component";
import {RouterModule} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import {SuperHeroesService} from "../../@core/services/super-heroes.service";

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
    MatTableModule,
    HttpClientModule,
  ],
  providers: [
    SuperHeroesService
  ],
})
export class SuperHeroesModule { }
