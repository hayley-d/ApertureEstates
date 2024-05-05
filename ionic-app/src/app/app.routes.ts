import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'listings',
    pathMatch: 'full',
  },
  {
    path: 'listings',
    loadComponent: () => import('./pages/listings/listings.page').then( m => m.ListingsPage)
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search.page').then( m => m.SearchPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'listings/:id',
    loadComponent: () => import('./pages/property-details/property-details.page').then( m => m.PropertyDetailsPage)
  },
];
