import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from '../../srever/get-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-watching',
  standalone: false,
  templateUrl: './watching.component.html',
  styleUrl: './watching.component.css'
})
export class WatchingComponent {
  videoId!: string;
  safeUrl!: SafeResourceUrl;
  showMovie: any;
  category: any
  movie: any;
  id: any;
  constructor(private activated: ActivatedRoute,
    private getdata: GetDataService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit() {
    this.activated.paramMap.subscribe((params) => {

      this.id = params.get("id");
      const categoryName = params.get("category");
      this.category = categoryName
      if (!this.id) {
        this.router.navigate(['/']);
        return;
      }
      this.spinner.show()
      this.getdata.getMovieById(this.id).subscribe((res) => {
        
        if (!res) {
          this.router.navigate(['/']);
        } else {
          this.showMovie = res
        }
        const url = `${this.showMovie.movie.watchingTrailer}`;
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      }, (error) => {
        console.error(error)
      }, () => {
        this.spinner.hide();
      });
    });
  }



}
