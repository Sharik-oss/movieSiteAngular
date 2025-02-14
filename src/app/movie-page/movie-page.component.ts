import {AfterViewInit, Component, Inject, inject} from '@angular/core';
import {SingleMovieService} from '../services/single-movie.service';
import {TranslatePipe} from '@ngx-translate/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {AdService} from '../services/ad.service';
import {filter} from 'rxjs';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-movie-page',
  imports: [
    TranslatePipe,
    CommonModule
  ],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss'
})


export class MoviePageComponent implements AfterViewInit {
  private movieProps = inject(SingleMovieService);
  movieProperties: any = {};
  safeMovieUrl!: SafeResourceUrl;
  adService = inject(AdService);
  adUrlSafeUrl!: SafeResourceUrl;
  movieAd!: any;
  showSkipButton = false;
  sanitizer = inject(DomSanitizer);
  width: number = 900;
  height: number = 660;

  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit() {
    this.getMovie();
    this.resizeIframe();
    this.getAdvertisment();
  }

  getMovie() {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieProps.getMovieProps(id).subscribe((props: any) => {
      this.movieProperties = props;
      this.safeMovieUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.movieProperties.movie_url);
    });
  }

  resizeIframe() {
    this.width = window.innerWidth / 2;
    this.height = window.innerHeight / 2;
  }

  getAdvertisment() {
    this.adService.getAds().subscribe((ads: any) => {
      const filteredAds = ads.filter((ad: any) => ad.leftOrRight === 'Movie');
      if (filteredAds.length > 0) {
        this.movieAd = filteredAds[0];

        // Append autoplay=1 to the ad URL
        const adUrlWithAutoplay = this.movieAd.imgUrl.includes('?')
          ? `${this.movieAd.imgUrl}&autoplay=1`
          : `${this.movieAd.imgUrl}?autoplay=1`;

        this.adUrlSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(adUrlWithAutoplay);

        // Show skip button after 15 seconds
        setTimeout(() => {
          this.showSkipButton = true;
        }, 15000);
      }
    });
  }


  redirectToAd() {
    if (this.movieAd && this.movieAd.redirectUrl) {
      window.open(this.movieAd.redirectUrl, '_blank');
    }
  }

  removeAd() {
    this.movieAd = null;
  }
}
