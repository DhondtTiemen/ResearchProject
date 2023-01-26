import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { IGenre } from 'src/app/interfaces/genre'
import { ConfigService } from 'src/app/services/config.service'

@Component({
  selector: 'genre-detail',
  templateUrl: './genre-detail.component.html',
})
export class GenreDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigService,
  ) {}

  genre: IGenre | undefined = undefined

  errorMessage: string = ''

  ngOnInit(): void {
    const genreId = Number(this.route.snapshot.paramMap.get('id'))
    this.configService.getGenreById(genreId).subscribe({
      next: (data) => {
        this.genre = data
      },
      error: (err) => (this.errorMessage = err),
    })
  }

  onBackBtnClick(): void {
    this.router.navigate(['..'])
  }
}
