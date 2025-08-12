import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DashbordServiceService } from '../../../services/dashbord/dashbord-service.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-edit',
  standalone: false,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  previewImage: string = ''
  previewTrailerUrl: string = ''
  previewTrailer!: SafeResourceUrl;
  urlTrailer: string = ''
  movie: any
  urlImage: string = ''
  genres: any = [];
  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private activated: ActivatedRoute,
    private spinner: NgxSpinnerService,
    public service: DashbordServiceService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {

    this.activated.paramMap.subscribe((params) => {
      const id = params.get("id");
      console.log(id)
      if (!id) {
        this.router.navigate(['/not-found']);
        return;
      }
      this.spinner.show()
      this.service.getMovieById(id).subscribe((res: any) => {
        console.log(res.movie.watchingTrailer)
        if (!res || res.length === 0) {
          this.router.navigate(['/not-found']);
        } else {
          this.movie = res.movie
          this.previewImage = res.movie.poster_path
          if (res.movie.watchingTrailer) {
            this.previewTrailerUrl =res.movie.watchingTrailer
            this.previewTrailer = this.sanitizer.bypassSecurityTrustResourceUrl(res.movie.watchingTrailer)
          }
          this.genres = res.movie.genres

        }
      }, (error) => {
        console.error(`error:${error}`)
      }, () => {
        this.spinner.hide();
      });
    });


  }
  updateImage() {
    if (this.urlImage) {
      this.previewImage = this.urlImage;
    }
  }
  updateTrailer() {

    if (this.urlTrailer) {
      this.previewTrailerUrl = this.urlTrailer
      this.previewTrailer = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlTrailer);
    }
    console.log("url movies", this.previewTrailer)
  }
  handelGennresInpout() {
    this.genres.push(``);

  }
  removeGenre(index: number) {

    this.genres.splice(index, 1);
  }
  trackByIndex(index: number, obj: any): any {
    return index;
  }


  submitEdit() {
    const updatedMovie = {
      title: this.movie.title,
      collectionName: this.movie.collectionName,
      overview: this.movie.overview,
      poster_path: this.previewImage,
      genres: this.genres,
      watchingTrailer: this.previewTrailerUrl
    };
    this.service.updateMovie(this.movie._id, updatedMovie).subscribe(
      (res: any) => {
        this.movie = res
        this.previewImage = res.poster_path
        this.genres = res.genres
      },
      (err) => {
        console.error("Error updating movie:", err);
      }, () => {
        this.toastr.success('The movie has been updated.');

      }
    );
    
  }

}
