import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'library', pathMatch: 'full' },
    {
        path: 'library'
    },
    { path: '**', redirectTo: 'library' }
];
