import { Component, Input } from '@angular/core';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

@Component({
  selector: 'app-slider-header',
  standalone: false,
  templateUrl: './slider-header.component.html',
  styleUrl: './slider-header.component.css'
})
export class SliderHeaderComponent {
  @Input() sliderHeader: any;
  swiperfunction() {
    setTimeout(() => {
      const swipermain = new Swiper(".mySwiper", {
        loop: true,
        spaceBetween: 5,
        slidesPerView: 5,
        freeMode: true,
        watchSlidesProgress: true,
        centeredSlides: true,
      });

      new Swiper(".mySwiper2", {
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        },
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 50,
          stretch: 100,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        loop: true,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        thumbs: {
          swiper: swipermain,
        },
      });
    }, 200); // Small delay to ensure DOM is ready
  }
  ngAfterViewInit(): void {
    this.swiperfunction()
  }
}
