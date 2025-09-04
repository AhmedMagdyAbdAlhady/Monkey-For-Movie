import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteComponent } from './website.component';
import { HomeComponent } from './pages/home/home.component';
import { SingleMovieComponent } from './pages/single-movie/single-movie.component';
import { ErrorComponent } from './pages/error/error.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SingupComponent } from './pages/singup/singup.component';
import { canDeactivateGuard } from './guards/can-deactivate.guard';
import { WatchingComponent } from './pages/watching/watching.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HistoryComponent } from './pages/history/history.component';

const routes: Routes = [
  {
    path: '',
    component: WebsiteComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'watching/:id', component: WatchingComponent },
      { path: 'logIn', component: LogInComponent, canDeactivate: [canDeactivateGuard] },
      { path: 'singup', component: SingupComponent, canDeactivate: [canDeactivateGuard] },
      { path: 'not-found', component: ErrorComponent },
      { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: ':category/:id', component: SingleMovieComponent },
      { path: ':categoryName', component: CategoryPageComponent },
      { path: '**', redirectTo: "not-found" }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
