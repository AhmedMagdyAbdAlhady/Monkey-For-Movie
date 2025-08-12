import { Component, OnInit } from '@angular/core';
import { ApiHomeService } from '../../../services/api-home.service';
import { DashbordServiceService } from '../../../services/dashbord/dashbord-service.service';
import { connect } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-dashbord',
  standalone: false,
  templateUrl: './home-dashbord.component.html',
  styleUrl: './home-dashbord.component.css'
})
export class HomeDashbordComponent {
  items: any;
  totalPages: number = 0;
  currentQuery: string | undefined;

  constructor(public service: DashbordServiceService, private router: Router) { }
  ngOnInit() {
    this.loadPage(1); // تحميل أول صفحة بدون فلتر

    this.service.searchQuery$.subscribe(query => {
      this.currentQuery = query ?? undefined;
      this.loadPage(1, this.currentQuery);
    })
  }

  loadPage(page: number, searchQuery?: string) {
    this.service.getItemsOfMovies(page, searchQuery).subscribe(
      (data) => {
        this.items = data.Movies;
        this.totalPages = data.NumberOFPage;
        console.log("Pages:", this.totalPages);
      },
      (err) => {
        console.log('Error fetching data', err);
      }
    );
  }
  editItem(item: any): void {
    console.log('Editing item:', item._id);

  this.router.navigate([`dashboard/edit`,item._id])
  }

  deleteItem(id: string): void {
    if (confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
      this.service.deleteMovie(id).subscribe(
        (res) => {
          alert(res)
          this.loadPage(1, this.currentQuery)
        },
        (err) => {
          console.error('Error deleting item', err);
        }
      );
    }
  }
}
