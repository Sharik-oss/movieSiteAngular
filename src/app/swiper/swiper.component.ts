import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  AfterViewInit, inject,
  Inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularService } from '../services/popular.service';
import {map} from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
})
export class SwiperComponent implements AfterViewInit {
  @Input() header: String = '';
  @Input() type: "topMoviesArray" | 'bottomMoviesArray' = 'topMoviesArray';

  private readonly popularMovies = inject(PopularService)


  private scrollArrow: number = 100;
  @ViewChild('main') elementReference!: ElementRef;
  moviesList: any[] = [];
  private isDragging = false;
  startX!: number;
  scrollLeft!: any;
  
  
  constructor(public router: Router){}

  movies$ = this.popularMovies.getPopularMovies().pipe(
    map((res) => {
      const topMoviesArray = res.filter((i) => i.movieType === 'Top')
      const bottomMoviesArray = res.filter((i) => i.movieType === 'New')
      return {
        topMoviesArray,
        bottomMoviesArray
      }
    })
  )


  ngAfterViewInit(): void {
    const container = document.querySelector(
      '.swiper-container'
    ) as HTMLElement;

    this.getMovies(this.type);
  }

  async getMovies(type: any) {
    this.popularMovies.getPopularMovies().subscribe((data: any) => {
      this.moviesList = data;
    });
  }

  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.startX = event.pageX - this.elementReference.nativeElement.offsetLeft;
    this.scrollLeft = this.elementReference.nativeElement.scrollLeft;
    event.preventDefault();
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;

    const x = event.pageX - this.elementReference.nativeElement.offsetLeft;
    const scroll = x - this.startX;
    this.elementReference.nativeElement.scrollLeft = this.scrollLeft - scroll;
  }

  onMouseUp(): void {
    this.isDragging = false;
  }

  onMouseLeave(): void {
    this.isDragging = false;
  }

  rightClick() {
    this.elementReference.nativeElement.scrollLeft += this.scrollArrow;
  }

  leftClick() {
    this.elementReference.nativeElement.scrollLeft -= this.scrollArrow;
  }


  redirectToMovie(movieId: any){
    this.router.navigate([movieId]);
  }
}
