import { Component, AfterViewInit, Input } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-download',
  standalone: false,
  templateUrl: './download.component.html',
  styleUrl: './download.component.css'
})
export class DownloadComponent  {
@Input() id:any;
@Input() category:any

 
}