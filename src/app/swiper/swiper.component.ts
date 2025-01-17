import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  AfterViewInit,
} from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { CommonModule } from '@angular/common';
import { PopularService } from '../services/popular.service';

Swiper.use([Navigation, Pagination]);

@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
})
export class SwiperComponent implements AfterViewInit {
  @Input() header: String = '';
  @Input() page: String = '';
  private scrollArrow: number = 100;
  @ViewChild('main') elementReference!: ElementRef;
  moviesList: any[] = [];
  private isDragging = false;
  startX!: number;
  scrollLeft!: any;

  constructor(public popularMovies: PopularService) {}

  ngAfterViewInit(): void {
    const container = document.querySelector(
      '.swiper-container'
    ) as HTMLElement;

    this.getMovies();
  }

  async getMovies() {
    this.popularMovies.getPopularMovies(this.page).subscribe((data: any) => {
      this.moviesList = data.data.filter(
        (movie: any) =>
          movie.category === 'Фильм' && movie.original_name && movie.poster
      );
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
}
