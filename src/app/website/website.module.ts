import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { WebsiteComponent } from './website.component';
import { HomeComponent } from './pages/home/home.component';
import { SingleMovieComponent } from './pages/single-movie/single-movie.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ErrorComponent } from './pages/error/error.component';
import { TrendingComponent } from './pages/trending/trending.component';
import { NewMoviesComponent } from './pages/new-movies/new-movies.component';
import { SliderHeaderComponent } from './components/slider-header/slider-header.component';
import { GoSinglePageComponent } from './components/button/go-single-page/go-single-page.component';


@NgModule({
  declarations: [
    WebsiteComponent,
    HomeComponent,
    SingleMovieComponent,
    NavComponent,
    FooterComponent,
    ErrorComponent,
    TrendingComponent,
    NewMoviesComponent,
    SliderHeaderComponent,
    GoSinglePageComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule
  ]
})
export class WebsiteModule { }
