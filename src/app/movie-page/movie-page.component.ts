import {AfterViewInit, Component, inject} from '@angular/core';
import {MovieService} from '../services/movie.service';

@Component({
  selector: 'app-movie-page',
  standalone: false,
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss'
})


export class MoviePageComponent implements AfterViewInit {
  private movie = inject(MovieService);

  ngAfterViewInit(): void {
    this.loadKinoboxScript();
  }

  private loadKinoboxScript(): void {
    const script = document.createElement('script');
    script.src = 'https://kinobox.tv/kinobox.min.js';
    script.async = true;

    script.onload = () => {
      console.log('Kinobox script loaded successfully');
      if ((window as any).kbox) {
        this.initializePlayer();
      } else {
        console.error('Kinobox script loaded, but `kbox` is not defined');
      }
    };

    script.onerror = () => {
      console.error('Failed to load Kinobox script');
    };

    document.body.appendChild(script);
  }

  private initializePlayer(): void {
    try {
      (window as any).kbox('.kinobox_player', {
        search: {
          kinopoisk: 4766559,
          title: ''
        },
        menu: {
          enable: false
        },
        players: {
          alloha: {
            enable: true,
            position: 1,
          }
        },
        params: {
          all: {
            translation: 93,
            only_translation: [
              93
            ],
            translation_hidden: [
              68,
              77,
              66,
              30,
              96,
              34,
              154,
              237,
              321,
              237,
              234,
              241,
              79,
              75
            ],
            audio: [],
            subtitle: []

          }

        }

      });

    } catch (error) {
      console.error('Error initializing Kinobox player:', error);
    }
  }


}
