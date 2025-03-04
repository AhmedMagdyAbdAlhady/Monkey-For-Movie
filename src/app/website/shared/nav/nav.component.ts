import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
Home: any;
navItems=[
  {
    title:"Trending",
    url:"Trending Movies"
  },
  {
    title:"New Movies",
    url:"New Movies"
  },
  {
    title:"  Animation  ",
    url:"Best Animation Movies"
  },
  {
    title:"Famility",
    url:"Famility-Time"
  }
]
}
