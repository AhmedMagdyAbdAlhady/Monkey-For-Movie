import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeDashbordComponent } from './pages/home-dashbord/home-dashbord.component';
import { EditComponent } from './pages/edit/edit.component';
import { CreateMovieComponent } from './pages/create-movie/create-movie.component';

const routes: Routes = [{
  path: '', component: DashboardComponent,
  children: [
    { path: '', component: HomeDashbordComponent },
    { path: 'create', component: CreateMovieComponent },
    { path: 'edit/:id', component: EditComponent },]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
