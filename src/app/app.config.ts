import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideToastr} from "ngx-toastr";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {SuperHeroesDateAdapter} from "./@core/utils/data-adapter";
import {HttpClientModule} from "@angular/common/http";

const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {

    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM-YYYY',
  },
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr(),
    { provide: DateAdapter, useClass: SuperHeroesDateAdapter },
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
      HttpClientModule
  ]
};
