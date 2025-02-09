import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  standalone: false,

  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
})
export class MoviesListComponent implements OnInit {
  genreList: string[] = [
    "ანიმაცია", "ბიოგრაფია", "დეტექტივი", "დოკუმენტური", "დრამა", "ვესტერნი",
    "კრიმინალური", "კომედია", "ისტორიული", "მელოდრამა", "მისტიური", "მიუზიკლი",
    "ეროტიული", "მძაფრსიუჟეტიანი", "საახალწლო", "რომანტიკული", "ზღაპრული",
    "სათავგადასავლო", "საომარი", "საოჯახო", "საშინელება", "სპორტული",
    "ტრილერი", "საბავშვო", "ფანტასტიკა"
  ];
  movies: any;

  ngOnInit() {
    this.getMovieList();
  }
  
  constructor(private movieService: MovieService, public router: Router) {}

  getMovieList() {
    this.movieService.getMovies().subscribe((data: any) => {
      this.movies = data;
    });
  }


  redirectToMovie(movieId: any){
    this.router.navigate([movieId]);
  }
}
