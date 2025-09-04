import { Component, OnInit } from '@angular/core';
import { DashbordServiceService } from './../../../services/dashbord/dashbord-service.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
   sidebar:any
  constructor(public server: DashbordServiceService) { }

ngOnInit(){
 
}
// toggleSidebar = () => {
//   console.log("onclick arrow")
//            this.sidebar = document.querySelector('.sidebar');
//             this.sidebar.classList.toggle('collapsed');
//         }
}
