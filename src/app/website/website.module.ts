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
import { DownloadButtonComponent } from './components/download-button/download-button.component';
import { DownloadComponent } from './components/button/download/download.component';
import { WatchComponent } from './components/button/watch/watch.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SingupComponent } from './pages/singup/singup.component';
import { WatchingComponent } from './pages/watching/watching.component';


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
    DownloadButtonComponent,
    DownloadComponent,
    WatchComponent,
    LogInComponent,
    SingupComponent,
    WatchingComponent,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ]
})
export class WebsiteModule { }
