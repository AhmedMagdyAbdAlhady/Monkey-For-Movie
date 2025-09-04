import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeDashbordComponent } from './pages/home-dashbord/home-dashbord.component';
import { EditComponent } from './pages/edit/edit.component';
import { CreateMovieComponent } from './pages/create-movie/create-movie.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';

const routes: Routes = [{
  path: '', component: DashboardComponent,
  children: [
    { path: 'home', component: HomeDashbordComponent },
    { path: 'create', component: CreateMovieComponent },
    { path: 'Analytics', component: AnalyticsComponent },
    { path: 'edit/:id', component: EditComponent },
        { path: '', redirectTo: "home",pathMatch: 'full'  },

    { path: '**', redirectTo: "not-found" }

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
