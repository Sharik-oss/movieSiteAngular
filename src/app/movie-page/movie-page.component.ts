import {AfterViewInit, Component, Inject, inject} from '@angular/core';
import {SingleMovieService} from '../services/single-movie.service';
import {TranslatePipe} from '@ngx-translate/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private route: ActivatedRoute){}

  width: number = 900;
  height: number = 660;

  ngAfterViewInit() {
    this.getMovie();
    this.resizeIframe();
  }


  getMovie() {
    const id = this.route.snapshot.paramMap.get('id')
    
    this.movieProps.getMovieProps(id).subscribe((props: any) => {

      this.movieProperties = props;
      
      this.safeMovieUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.movieProperties.movie_url)
    })
  }


  resizeIframe(){
    this.width = window.innerWidth / 2
    this.height = window.innerHeight / 2
    
    
  }


}
