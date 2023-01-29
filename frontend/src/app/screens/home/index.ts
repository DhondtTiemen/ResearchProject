import { Component, OnInit } from '@angular/core'

import { ConfigService } from 'src/app/services/config.service'

import { IAlbum } from 'src/app/interfaces/album'
import { IGenre } from 'src/app/interfaces/genre'

@Component({
  selector: 'home-page',
  templateUrl: './index.html',
})
export class HomePageComponent implements OnInit {
  constructor(private configService: ConfigService) {}

  loaded: boolean = false

  popularAlbums: IAlbum[] = []
  genres: IGenre[] = []
  preOrderAlbums: IAlbum[] = []

  ngOnInit(): void {
    // GET POPULAR ALBUMS
    this.configService.getPopularAlbums().subscribe({
      next: (albums) => {
        for (let album of albums) {
          if (this.popularAlbums.length < 8) {
            this.popularAlbums.push(album)
            this.loaded = true
          }
        }
      },
      error: (err) => err,
    })

    // GET GENRES
    this.configService.getGenres().subscribe({
      next: (genres) => {
        this.genres = genres
      },
      error: (err) => err,
    })

    // GET PRE-ORDERS
    this.configService.getPreOrderAlbums().subscribe({
      next: (albums) => {
        this.preOrderAlbums = albums
      },
      error: (err) => err,
    })
  }
}
