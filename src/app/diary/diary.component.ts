import { HttpErrorResponse } from '@angular/common/http';
import { Movie } from './../_model/movie.model';
import { Subscription } from 'rxjs';
import { AuthentificationService } from './../_service/authentification.service';
import { MovieService } from './../_service/movie.service';
import { UserService } from './../_service/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit, OnDestroy {

  movies: Movie[];

  getDiarySubscription: Subscription;
  removeDiarySubscription: Subscription;

  constructor(
    private userService:UserService,
    public movieService:MovieService,
    public authentificationService: AuthentificationService,
  ) { }

  ngOnInit(): void {

    if(this.authentificationService.isLoggedIn()) {
      this.getDiary();
    }
  }

  ngOnDestroy(): void {

    this.getDiarySubscription?.unsubscribe();
    this.removeDiarySubscription?.unsubscribe();
  }

  getDiary(): void {
    
    this.getDiarySubscription = this.userService.getDiary().subscribe(
      (response: Movie[]) => {
        this.movies = response;
      },

      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  removeDiary(movieId: number): void {
    
    this.removeDiarySubscription = this.userService.removeDiary(movieId).subscribe();
  }

}
