import { Component, OnInit } from '@angular/core'

import { ConfigService } from '../../services/config.service'

@Component({
  selector: 'genres-component',
  templateUrl: './genres.component.html',
})
export class GenresComponent implements OnInit {
  genres: any[] = []

  errorMessage: string = ''

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.configService.getGenres().subscribe({
      next: (data) => {
        for (let genre of data) {
          this.genres.push(genre)
        }
      },
      error: (err) => (this.errorMessage = err),
    })
  }
}
