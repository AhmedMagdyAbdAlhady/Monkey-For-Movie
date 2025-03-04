import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-create-cards',
  standalone: false,
  templateUrl: './create-cards.component.html',
  styleUrl: './create-cards.component.css'
})
export class CreateCardsComponent {
@Input() arraymovies:any 
@Input() category:any

}
