import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-go-single-page',
  standalone: false,
  templateUrl: './go-single-page.component.html',
  styleUrl: './go-single-page.component.css'
})
export class GoSinglePageComponent {
@Input() id:any;
@Input() category:any

}
