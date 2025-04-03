import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteComponent } from './website.component';
import { HomeComponent } from './pages/home/home.component';
import { SingleMovieComponent } from './pages/single-movie/single-movie.component';
import { ErrorComponent } from './pages/error/error.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SingupComponent } from './pages/singup/singup.component';

const routes: Routes = [{ path: '', component: WebsiteComponent , children:[
  { path: '', component: HomeComponent},
  { path: 'category/:categoryName', component: CategoryPageComponent},
  { path: 'logIn', component: LogInComponent},
  { path: 'singup', component: SingupComponent},
  { path: 'single/:category/:id', component: SingleMovieComponent},
  { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: '**', component:ErrorComponent },
]}];

@NgModule({
  imports: [RouterModule.forChild(routes )],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
