import {AfterViewInit, Component, inject} from '@angular/core';
import {SingleMovieService} from '../services/single-movie.service';

@Component({
  selector: 'app-movie-page',
  imports: [
  ],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss'
})


export class MoviePageComponent implements AfterViewInit {
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
