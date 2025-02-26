import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteComponent } from './website.component';
import { HomeComponent } from './pages/home/home.component';
import { SingleMovieComponent } from './pages/single-movie/single-movie.component';
import { ErrorComponent } from './pages/error/error.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';

const routes: Routes = [{ path: '', component: WebsiteComponent , children:[
  { path: '', component: HomeComponent},
  { path: 'category/:categoryName', component: CategoryPageComponent},
  { path: 'single-movie/:id', component: SingleMovieComponent},
  { path: '**', component:ErrorComponent },
]}];

@NgModule({
  imports: [RouterModule.forChild(routes )],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
