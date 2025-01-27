import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { PopularService } from '../services/popular.service';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {SwiperComponent} from '../swiper/swiper.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  templateUrl: './main-page.component.html',
  imports: [CommonModule, TranslateModule, SwiperComponent],
  styleUrl: './main-page.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainPageComponent implements OnInit {
  firstImages: any[] = [
    { img: 'background-1.jpg' },
    { img: 'background-2.jpg' },
    { img: 'background-3.jpg' },
    { img: 'background-4.jpg' },
    { img: 'background-5.jpg' },
    { img: 'background-6.jpg' },
    { img: 'background-7.jpg' },
    { img: 'background-8.jpg' },
    { img: 'background-10.jpg' },
    { img: 'background-11.jpg' },
    { img: 'background-12.jpg' },
    { img: 'background-13.jpg' },
  ];
  secondImages: any[] = [
    { img: 'background-14.jpg' },
    { img: 'background-15.jpg' },
    { img: 'background-16.jpg' },
    { img: 'background-17.jpg' },
    { img: 'background-18.jpg' },
    { img: 'background-19.jpg' },
    { img: 'background-20.jpg' },
    { img: 'background-21.jpg' },
    { img: 'background-22.jpg' },
    { img: 'background-23.jpg' },
    { img: 'background-24.jpg' },
    { img: 'background-25.jpg' },
  ];
  currentIndex = 0;

  ngOnInit() {
    this.startImageSlider();
  }

  startImageSlider() {
    setInterval(() => {
      this.changeFirstImages();
    }, 5000);

    setInterval(() => {
      this.changeSecondImages();
    }, 5000);
  }

  changeFirstImages() {
    this.currentIndex = (this.currentIndex + 1) % this.firstImages.length;
  }

  changeSecondImages() {
    this.currentIndex = (this.currentIndex + 1) % this.secondImages.length;
  }
}
