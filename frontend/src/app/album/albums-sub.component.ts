import { Component, OnInit } from '@angular/core'

import { ConfigService } from '../config/config.service'

import { IAlbum } from '../interfaces/album'

@Component({
  selector: 'albums-sub',
  templateUrl: './albums-sub.component.html',
})
export class AlbumsSub implements OnInit {
  allAlbums: IAlbum[] = []
  preOrderAlbums: IAlbum[] = []

  errorMessage: string = ''

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.configService.getAlbums().subscribe({
      next: (data) => {
        for (let album of data) {
          const releaseDate = new Date(album.releaseDate)
          const todayDate = new Date()
          if (releaseDate > todayDate) {
            if (this.preOrderAlbums.length < 8) {
              this.preOrderAlbums.push(album)
            }
          }
        }
      },
      error: (err) => (this.errorMessage = err),
    })
  }
}
