import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
   sidebar:any

OnInit(){
    
}
// toggleSidebar = () => {
//   console.log("onclick arrow")
//            this.sidebar = document.querySelector('.sidebar');
//             this.sidebar.classList.toggle('collapsed');
//         }
}
