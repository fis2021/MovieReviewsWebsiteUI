import { MovieService } from './../_service/movie.service';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from './../_model/movie.model';
import { UserService } from './../_service/user.service';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { enMovieInfoFormType } from '../_model/movie-info-form.enum';

@Component({
  selector: 'app-movie-info-dialog',
  templateUrl: './movie-info-dialog.component.html',
  styleUrls: ['./movie-info-dialog.component.css']
})
export class MovieInfoDialogComponent implements OnInit {

  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  myfilename = 'Image Poster';

  movie: Movie = {
    movieId: null,
    movieTitle: '',
    movieDesc: '',
    posterImgUrl: '',
    releaseDate: null,
    trailerUrl: '',
    lengthMinutes: 0,
    movieDirectors: '',
    movieWriters: '',
    movieActors: '',
    isEnabled: false
  };
  
  cardTitle: string;

  isInvalid = false;

  formType: enMovieInfoFormType;

  constructor(

    private userService: UserService,
    private dialogRef: MatDialogRef<MovieInfoDialogComponent>,
    private movieService: MovieService,
    @Inject(MAT_DIALOG_DATA) public data: { movie: Movie, cardTitle: string, formType: enMovieInfoFormType }
  ) { 
    
    if(data.movie) {
      this.movie = data.movie;
    }

    this.cardTitle = data.cardTitle;
    this.formType = data.formType;
  }

  ngOnInit(): void {
  }


  fileChangeEvent(fileInput: any) {

    if (fileInput.target.files && fileInput.target.files[0]) {


      this.myfilename = '';
      Array.from(fileInput.target.files).forEach((file: File) => {
        console.log(file);
        this.myfilename += file.name + ',';
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {

          // Return Base64 Data URL
          const imgBase64Path = e.target.result;

        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);

      // Reset File Input to Selct Same file again
      this.uploadFileInput.nativeElement.value = "";
    } else {
      this.myfilename = 'Image Poster';
    }
  }

  validateForm(): boolean {

    if(this.movie.movieTitle == '')
      return false;
    
      return true;
  }

  submit(): void {
    
    if(!this.validateForm()){
      return;
    }

    switch(this.formType) {

      case enMovieInfoFormType.MovieRequest:
        this.movieService.addMovie(this.movie).subscribe(
          () => this.dialogRef.close(),
          (error) => console.log(error)
        );
        break;
      case enMovieInfoFormType.AddMovie:
        this.userService.sendMovieRequest(this.movie).subscribe(
          () => this.dialogRef.close(),
          (error) => console.log(error)
        );
        break;
      case enMovieInfoFormType.UpdateMovie:
        this.movieService.updateMovie(this.movie).subscribe(
          () => this.dialogRef.close(),
          (error) => console.log(error)

        );
        break;
    }

  }

}
    