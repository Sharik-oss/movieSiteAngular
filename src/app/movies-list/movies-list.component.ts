import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies-list',
  standalone: false,

  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
})
export class MoviesListComponent implements OnInit {
  @Input() page: any = 'page-1000.json';
  movies: any;

  ngOnInit() {
    this.getMovieList();
  }
  
  constructor(private movieService: MovieService) {}

  getMovieList() {
    this.movieService.getMovies(this.page).subscribe((data: any) => {
      this.movies = data.data;
    });
  }
}
