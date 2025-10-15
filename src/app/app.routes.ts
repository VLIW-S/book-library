import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'library', pathMatch: 'full' },
  {
    path: 'library',
    // Lazy loading
    loadChildren: () => import('./features/routes/book.routes').then((m) => m.LIBRARY_ROUTES),
  },
  { path: '**', redirectTo: 'library' },
];
