import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SuperPowersComponent} from "./super-powers.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {SearchBarComponent} from "../../@core/components/search-bar/search-bar.component";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatChipsModule} from "@angular/material/chips";
import {MatTooltipModule} from "@angular/material/tooltip";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {RouterModule} from "@angular/router";
import {SuperHeroesComponent} from "../super-heroes/super-heroes.component";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {SuperPowersService} from "../../@core/services/super-powers.service";



@NgModule({
  declarations: [
    SuperPowersComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SuperPowersComponent,
        data: {
          title: 'Super Poderes',
          robots: 'noindex, nofollow',
        },
      },
    ]),
    CommonModule,
    MatPaginatorModule,
    SearchBarComponent,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatTooltipModule,
    NgxSkeletonLoaderModule,
    HttpClientModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    SuperPowersService,
  ],
  exports: [
    SuperPowersComponent
  ]
})
export class SuperPowersModule { }
