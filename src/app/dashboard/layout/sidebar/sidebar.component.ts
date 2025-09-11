import { Component, OnInit } from '@angular/core';
import { DashbordServiceService } from './../../../services/dashbord/dashbord-service.service';
import { AuthService } from '../../../website/srever/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
   sidebar:any
   user:any
  constructor(public server: DashbordServiceService,public auth: AuthService) { }

ngOnInit(){
 this.user= this.auth.user
}
// toggleSidebar = () => {
//   console.log("onclick arrow")
//            this.sidebar = document.querySelector('.sidebar');
//             this.sidebar.classList.toggle('collapsed');
//         }
}
