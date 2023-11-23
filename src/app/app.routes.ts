import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'herois', pathMatch: 'full' },
  { path: 'herois', loadChildren: async ()=>(await import('./pages/super-heroes/super-heroes.module')).SuperHeroesModule },
  { path: 'poderes', loadChildren: async ()=>(await import('./pages/super-powers/super-powers.module')).SuperPowersModule },
  { path: '**', redirectTo: 'herois' }
];
