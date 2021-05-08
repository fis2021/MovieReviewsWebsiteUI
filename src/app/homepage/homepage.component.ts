import { enTag } from './../_utility/tag.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../_model/movie.model';
import { Tag } from '../_model/tag.model';
import { MovieService } from '../_services/movie.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  movies: Movie[];
  tags: any;

  constructor(
    private movieService: MovieService,
  ) { }

  StringIsNumber = value => isNaN(Number(value)) === false;

  ToArray(ennume) {
    return Object.keys(ennume)
        .filter(this.StringIsNumber)
        .map(key => ennume[key]);
  }

  ngOnInit(): void {
    this.tags = this.ToArray(enTag);
  }

  getAllMovies(){

    this.movieService.getAllMovies().subscribe(
      (response: Movie[]) => {
        this.movies = response;
        console.log(response);
      },

      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )

  }

  // getMoviesByTags(){

  //   this.tags = new Array(new Tag(1,"Trending"));
  //   this.movieService.getMoviesByTags(this.tags).subscribe(
  //     (response: Movie[]) => {
  //       this.movies = response;
  //       console.log(response);
  //     },

  //     (error: HttpErrorResponse) => {
  //       console.log(error);
  //     }
  //   )

  // }

}
