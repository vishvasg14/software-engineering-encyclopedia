import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

// Functional guard
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  if (auth.isLoggedIn()) return true;
  return inject(Router).parseUrl('/login');
};

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Lazy-loaded standalone component
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },

  // Lazy-loaded feature with its own routes
  {
    path: 'admin',
    canMatch: [authGuard],
    loadChildren: () => import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },

  // Wildcard
  { path: '**', redirectTo: '/home' },
];

// Mock service
class AuthService {
  isLoggedIn() { return true; }
}