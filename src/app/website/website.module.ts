import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { WebsiteComponent } from './website.component';
import { HomeComponent } from './pages/home/home.component';
import { SingleMovieComponent } from './pages/single-movie/single-movie.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ErrorComponent } from './pages/error/error.component';
import { SliderHeaderComponent } from './components/slider-header/slider-header.component';
import { GoSinglePageComponent } from './components/button/go-single-page/go-single-page.component';
import { CreateCardsComponent } from './components/create-cards/create-cards.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    WebsiteComponent,
    HomeComponent,
    SingleMovieComponent,
    NavComponent,
    FooterComponent,
    ErrorComponent,
    SliderHeaderComponent,
    GoSinglePageComponent,
    CreateCardsComponent,
    CategoryPageComponent,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    NgxSpinnerModule
  ]
})
export class WebsiteModule { }
