import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-watch',
  standalone: false,
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css'
})
export class WatchComponent {
  @Input()id: any;
}