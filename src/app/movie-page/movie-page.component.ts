import {AfterViewInit, Component, inject} from '@angular/core';
import {SingleMovieService} from '../services/single-movie.service';
import {TranslatePipe} from '@ngx-translate/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-page',
  imports: [
    TranslatePipe
  ],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss'
})


export class MoviePageComponent implements AfterViewInit {
  private movieProps = inject(SingleMovieService);
  movieProperties: any = {};
  safeMovieUrl!: SafeResourceUrl;
  sanitizer =  inject(DomSanitizer);

  ngAfterViewInit() {
    this.getMovie();
  }


  getMovie() {
    this.movieProps.getMovieProps().subscribe((props: any) => {
      this.movieProperties = props;
      this.safeMovieUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.movieProperties.movie_url)
    })
  }


}
