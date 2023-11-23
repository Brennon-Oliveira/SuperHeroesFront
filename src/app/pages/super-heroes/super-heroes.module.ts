import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SuperHeroesComponent} from "./super-heroes.component";
import {RouterModule} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import {SuperHeroesService} from "../../@core/services/super-heroes.service";
import {MatChipsModule} from "@angular/material/chips";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {SearchBarComponent} from "../../@core/components/search-bar/search-bar.component";
import {ToastrModule} from "ngx-toastr";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [SuperHeroesComponent, ],
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
    MatChipsModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatIconModule,
    SearchBarComponent,
    NgxSkeletonLoaderModule,
    MatButtonModule
  ],
  providers: [
    SuperHeroesService
  ],
})
export class SuperHeroesModule { }
