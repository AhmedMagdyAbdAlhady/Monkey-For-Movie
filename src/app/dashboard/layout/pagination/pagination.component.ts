import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DashbordServiceService } from '../../../services/dashbord/dashbord-service.service';

@Component({
  selector: 'app-pagination',
  standalone: false,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() numberOfPage: number = 1; // إجمالي عدد الصفحات
  @Output() pageChange = new EventEmitter<number>(); // لما المستخدم يغير الصفحة
  @Input() searchQuery: any = '';
  countPage: number[] = [];
  activePage: number = 1;

  constructor(private service: DashbordServiceService) { }

  ngOnInit() {
    this.getPages();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['numberOfPage']) {
      this.getPages();
      console.log(this.numberOfPage)
    }
  }

 getPages() {
  this.service.getItemsOfMovies(1, this.searchQuery).subscribe(
    (res) => {
      const totalPages = res.NumberOFPage || 1;
      this.countPage = Array.from({ length: totalPages }, (_, i) => i + 1);
      this.activePage = 1;
      this.pageChange.emit(this.activePage);
    },
    (err) => {
      console.error('Error loading pages:', err);
    }
  );
}

  setActivePage(page: number) {
    if (page >= 1 && page <= this.countPage.length) {
      this.activePage = page;
      this.pageChange.emit(this.activePage);
    }
  }

  goToPrevious() {
    if (this.activePage > 1) {
      this.setActivePage(this.activePage - 1);
    }
  }

  goToNext() {
    if (this.activePage < this.countPage.length) {
      this.setActivePage(this.activePage + 1);
    }
  }

  get visiblePages(): number[] {
    const totalVisible = 4;
    const total = this.countPage.length;
    const current = this.activePage;

    let pages: number[] = [];

    const start = Math.max(2, current - Math.floor(totalVisible / 2));
    const end = Math.min(total - 1, start + totalVisible - 1);

    pages.push(1); // أول صفحة

    if (start > 2) {
      pages.push(-1); // يعني "..."
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < total - 1) {
      pages.push(-2); // يعني "..."
    }

    if (total > 1) {
      pages.push(total); // آخر صفحة
    }

    return pages;
  }
}
