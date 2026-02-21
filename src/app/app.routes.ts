import { Routes } from '@angular/router';

export const routes: Routes = [

    { 
        path: 'home', 
        loadComponent: () => import('./home/home').then(m => m.Home),
        children: [
            {
                path: '',
                loadComponent: () => import('./home/hero-list/hero-list').then(m => m.HeroList),
            },
            {
                path: 'hero/:id',
                loadComponent: () => import('./home/hero-list/hero-item/hero-item').then(m => m.HeroItem),
            },
        ],
     },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },

];
