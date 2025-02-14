import {Component, Input, OnInit} from '@angular/core';
import {MovieService} from '../services/movie.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-movies-list',
  standalone: false,

  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
})
export class MoviesListComponent implements OnInit {
  selectedGenres: string[] = [];
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
      if (genreParam) {
        this.selectedGenres = genreParam.split(',').map(genre => genre.trim()); // Convert string to array
        this.getMovieGenre(this.selectedGenres);
      } else {
        this.getMovieGenre();
      }
    });
  }


  getMovieGenre(selectedGenres ?: string[]) {
    this.movieService.getMovies().subscribe((data: any) => {
      if (selectedGenres) {
        this.movies = data.filter((movie: any) =>
          movie.genre.split(',').some((g: string) => selectedGenres.includes(g.trim()))
        );
        return this.movies
      } else {
        this.movies = data;
        return this.movies
      }
    });
  }

  getMovieList() {
    this.movieService.getMovies().subscribe((data: any) => {

      const movieName = this.movieName.value;  // Get the trimmed value from the form control

      if (movieName) {
        // Filter movies by name using case-insensitive matching
        const filteredMovies = data.filter((movie: any) => {
          console.log('Checking movie:', movie.name);  // Log each movie's name
          return movie.name.toLowerCase().includes(movieName.toLowerCase());
        });

        // If no movies match the search term, set this.movies to an empty array
        if (filteredMovies.length > 0) {
          this.movies = filteredMovies;
        } else {
          this.movies = []; // Return an empty list if no matches
        }
      } else {
        // If no search term, return all movies
        this.movies = data;
      }
    });
  }

  redirectToMovie(movieId: any) {
    this.router.navigate([movieId]);
  }


  getInput() {
    this.getMovieList();
  }
}
