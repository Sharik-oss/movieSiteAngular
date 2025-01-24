import {AfterViewInit, Component, inject} from '@angular/core';
import {MovieService} from '../services/movie.service';
import {SingleMovieService} from '../services/single-movie.service';
import {MatTab, MatTabGroup} from '@angular/material/tabs';

@Component({
  selector: 'app-movie-page',
  imports: [MatTabGroup, MatTab],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss'
})


export class MoviePageComponent implements AfterViewInit {
  private movie = inject(MovieService);
  private movieProps = inject(SingleMovieService);

  ngAfterViewInit() {
    this.getMovie();
  }


  getMovie() {
    this.movieProps.getMovieProps().subscribe((props: any) => {
      console.log(props)
    })
  }


}
