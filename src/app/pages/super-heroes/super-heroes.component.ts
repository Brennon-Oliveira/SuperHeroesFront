import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SuperHeroesService} from "../../@core/services/super-heroes.service";

@Component({
  selector: 'app-super-heroes',
  templateUrl: './super-heroes.component.html',
  styleUrl: './super-heroes.component.scss'
})
export class SuperHeroesComponent {
  constructor(private superHeroesService: SuperHeroesService) {}

  ngOnInit() {
    this.superHeroesService.getSuperHeroes().subscribe((response) => {
      console.log(response);
    });
  }
}
