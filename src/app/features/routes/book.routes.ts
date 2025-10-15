import { Routes } from '@angular/router';
// import { bookResolver } from './resolvers/book.resolver';
import { BookListComponent } from '../components/library/book-list/book-list.component';
import { BookDetailComponent } from '../components/library/book-detail/book-detail.component';
import { bookResolver } from '../resolvers/book.resolver';

export const LIBRARY_ROUTES: Routes = [
    {
        // /library
        path: '',
        component: BookListComponent,
    },
    {
        // /library/add
        path: 'add',
        component: BookDetailComponent,
    },
    {
        // /library/edit/:id
        path: 'edit/:id',
        component: BookDetailComponent,
        resolve: {
            book: bookResolver 
        }
    }
];