import { Component, OnInit } from '@angular/core'

import { ConfigService } from '../config/config.service'

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
        console.log(data)
        for (let genre of data) {
          this.genres.push(genre)
          console.log(genre)
        }
      },
      error: (err) => (this.errorMessage = err),
    })
  }
}
