import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  sidebar: any
  toggleBtn: any
  mainDashbord: any
  homeSearchQuery = '';
  OnInit() {

  }
  toggleSidebar = () => {

    this.sidebar = document.getElementsByClassName('dashbord');
    this.toggleBtn = document.querySelector('.toggle-btn');
    this.mainDashbord = document.querySelector('.contentDashbord');
    this.toggleBtn.classList.toggle("collapsed")
    this.mainDashbord.classList.toggle("collapsed")
    this.sidebar[0].childNodes[0].firstChild.firstChild.classList.toggle('collapsed');

    // this.sidebar[0].childNodes.forEach((element: any) => {
    //   element.firstChild.firstChild.classList.toggle('collapsed');
    // });
  }


  onNavSearch(query: string): void {
    this.homeSearchQuery = query;
  }
}
