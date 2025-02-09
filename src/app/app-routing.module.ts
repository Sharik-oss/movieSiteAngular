import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AboutComponent } from './about/about.component';
import { MoviePageComponent } from './movie-page/movie-page.component';

const routes: Routes = [
    {
        path: '',
        component: MainPageComponent
    },
    {
        path: 'movies',
        component: MoviesListComponent
    },{
        path: 'about',
        component: AboutComponent
    },
    {
        path: ':id',
        component: MoviePageComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
