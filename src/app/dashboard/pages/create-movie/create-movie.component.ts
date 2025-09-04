import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DashbordServiceService } from '../../../services/dashbord/dashbord-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-movie',
  standalone: false,
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.css'
})
export class CreateMovieComponent {
  previewImage: string = ''
  previewBackgroundImage: string = ''
  urlBackgroundImage: string = ''
  previewTrailerUrl: string = ''
  previewTrailer!: SafeResourceUrl;
  urlTrailer: string = ''
  toster: any
  movie: any = {
  }
  urlImage: string = ''
  genres: any = [''];
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
  }
  updateImage() {
    if (this.urlImage) {
      this.previewImage = this.urlImage;
    }
  }
  updateBackgroundImage() {
    if (this.urlBackgroundImage) {
      this.previewBackgroundImage = this.urlBackgroundImage;
    }
  }
  updateTrailer() {

    if (this.urlTrailer) {
      this.previewTrailerUrl = this.urlTrailer
      this.previewTrailer = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlTrailer);
    }
    console.log("url movies", this.previewTrailerUrl)
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


  submit() {
    const dataMovie = {
      title: this.movie.title,
      collectionName: this.movie.collectionName,
      overview: this.movie.overview,
      original_title: this.movie.original_title,
      release_date: this.movie.release_date,
      poster_path: this.previewImage,
      backdrop_path: this.previewBackgroundImage,
      genres: this.genres,
      watchingTrailer: this.previewTrailerUrl

    };
    this.service.createMovie(dataMovie).subscribe(
      (res: any) => {
      },
      (err) => {
        console.error("Error updating movie:", err);
      }, () => {
        this.toastr.success('The movie was created.');

      }
    );
  }

}


