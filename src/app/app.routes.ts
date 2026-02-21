import { Routes } from '@angular/router';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },

    { path: 'home', loadComponent: () => import('./home/home').then(m => m.Home) },

    { path: 'home/hero/:id', loadComponent: () => import('./home/hero-list/hero-item/hero-item').then(m => m.HeroItem) },

    { path: '**', redirectTo: 'home', pathMatch: 'full' }

];
