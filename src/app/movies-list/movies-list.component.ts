import {Component, Input, OnInit} from '@angular/core';
import {MovieService} from '../services/movie.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import {filter} from 'rxjs';

@Component({
  selector: 'app-movies-list',
  standalone: false,

  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
})
export class MoviesListComponent implements OnInit {
  selectedGenres: string[] = [];
  selectedYear: string[] = [];
  searchTerm: string = "";
  public movieName = new FormControl('', [
    Validators.required,
  ]);
  dropdownOpen: boolean = false;
  genreList: string[] = [
    "ანიმაცია", "ბიოგრაფია", "დეტექტივი", "დოკუმენტური", "დრამა", "ვესტერნი",
    "კრიმინალური", "კომედია", "ისტორიული", "მელოდრამა", "მისტიური", "მიუზიკლი",
    "ეროტიული", "მძაფრსიუჟეტიანი", "საახალწლო", "რომანტიკული", "ზღაპრული",
    "სათავგადასავლო", "საომარი", "საოჯახო", "საშინელება", "სპორტული",
    "ტრილერი", "საბავშვო", "ფანტასტიკა"
  ];
  filteredGenreList: string[] = [...this.genreList];

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  filterGenres() {
    this.filteredGenreList = this.genreList.filter(genre =>
      genre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleSelection(genre: string) {
    if (this.selectedGenres.includes(genre)) {
      this.selectedGenres = this.selectedGenres.filter(g => g !== genre);
      console.log(this.selectedGenres);
    } else {
      this.selectedGenres.push(genre);
      console.log(this.selectedGenres);
    }
  }

  removeSelection(genre: string) {
    this.selectedGenres = this.selectedGenres.filter(g => g !== genre);
    console.log(this.selectedGenres);
  }

  movies: any;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const genreParam = params.get('genre');
      console.log(genreParam);

      if (genreParam) {
        this.selectedGenres = genreParam.split(',').map(genre => genre.trim()); // Convert string to array
        this.getMovieByParam(this.selectedGenres);
      } else {
        this.getMovieList();
      }
    });


  }





  getMoviesBasedOnParams() {
    this.route.paramMap.subscribe(params => {
      const genreParam = params.get('genre');

      // If genre and year parameters are provided
      if (genreParam) {
        const selectedGenres = genreParam.split(',').map(g => g.trim());

        this.getMovieByParam(selectedGenres);

        // If only genre is provided
      } else if (genreParam) {
        const selectedGenres = genreParam.split(',').map(g => g.trim());
        this.getMovieByParam(selectedGenres);
      } else {
        this.getMovieList();
      }
    });
  }

  getMovieByParam(selectedGenres?: string[], selectedYear?: string | number) {
    this.movieService.getMovies().subscribe((data: any) => {
      let filteredMovies = data;

      // If selectedGenres is provided and is not a year, filter by genre
      if (selectedGenres && selectedGenres.length > 0 && isNaN(Number(selectedGenres[0]))) {
        filteredMovies = filteredMovies.filter((movie: any) =>
          movie.genre.split(',').some((g: string) => selectedGenres.includes(g.trim()))
        );
      }

      // If selectedGenres is actually a year, filter by year
      if (selectedGenres && selectedGenres.length === 1 && !isNaN(Number(selectedGenres[0]))) {
        filteredMovies = filteredMovies.filter((movie: any) =>
          movie.year === selectedGenres[0]
        );
      }

      this.movies = filteredMovies;
      return this.movies;
    });
  }
  getMovieByName(){
    this.movieService.getMovies().subscribe((data: any) => {
      const movieName = this.movieName.value;
      console.log(movieName);
      if (movieName) {
        const trimmedMovieName = movieName.trim(); // Remove trailing spaces

        const filteredMovies = data.filter((movie: any) =>
          movie.name.toLowerCase().indexOf(trimmedMovieName.toLowerCase()) >= 0
        );

        this.movies = filteredMovies.length > 0 ? filteredMovies : [];
      } else {
        this.movies = data;
      }



    })
  }

  getMovieList() {
    this.movieService.getMovies().subscribe((data: any) => {
      this.movies = data;
      return this.movies;
    });
  }


  redirectToMovie(movieId: any) {
    this.router.navigate([movieId]);
  }


  getInput() {
    this.getMovieByName();
  }
}
