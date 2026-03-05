import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing').then(m => m.Landing)
  },
  {
    path: 'auth',
    loadComponent: () => import('./layouts/auth-layout/auth-layout').then(m => m.AuthLayout),
    canActivate: [guestGuard],
    children: [
      {
        path: 'signin',
        loadComponent: () => import('./pages/auth/signin/signin').then(m => m.Signin)
      },
      {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./layouts/main-layouts/main-layouts').then(m => m.MainLayouts),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home').then(m => m.Home)
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/admin/users/users').then(m => m.Users)
      }
    ]
  }
];
