import { AfterViewInit, Component, Input } from '@angular/core';
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
export class SliderHeaderComponent implements AfterViewInit {
  @Input() sliderHeader: any;
  @Input() categoryHeader: any;
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
        breakpoints: {
    // للموبايل (أقل من 768px)
    0: {
      slidesPerView: 1,  // صورة واحدة أكبر
      spaceBetween: 5,
    },
    // التابلت
    768: {
      slidesPerView: "auto",
      spaceBetween: 5,
    },
    // الديسكتوب
    1024: {
      slidesPerView: "auto",
      spaceBetween: 5,
    }
  }
      });
    }, 5000); // Small delay to ensure DOM is ready
  }
  ngAfterViewInit(): void {
    this.swiperfunction()
  }
}
