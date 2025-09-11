import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LogInDashbordComponent } from './pages/log-in-dashbord/log-in-dashbord.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PreloaderComponent } from './shared/preloader/preloader.component';
import { ChartComponent } from './shared/chart/chart.component';
import { TableComponent } from './shared/table/table.component';
import { HomeDashbordComponent } from './pages/home-dashbord/home-dashbord.component';
import { PaginationComponent } from './layout/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './pages/edit/edit.component';
import { CreateMovieComponent } from './pages/create-movie/create-movie.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { UsersComponent } from './pages/users/users.component';



@NgModule({
  declarations: [
    DashboardComponent,
    LogInDashbordComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    PreloaderComponent,
    ChartComponent,
    TableComponent,
    HomeDashbordComponent,
    PaginationComponent,
    EditComponent,
    CreateMovieComponent,
    AnalyticsComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    

  ]
})
export class DashboardModule { }
