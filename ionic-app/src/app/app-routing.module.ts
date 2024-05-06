import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, Router } from '@angular/router'; // Import Router
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule),
    canActivate: [AuthGuard] // Apply AuthGuard to the listings route
  },
  {
    path: 'listings',
    loadChildren: () => import('./pages/listings/listings.module').then( m => m.ListingsPageModule),
    canActivate: [AuthGuard] // Apply AuthGuard to the listings route
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule),
    canActivate: [AuthGuard] // Apply AuthGuard to the listings route
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
  }
}
