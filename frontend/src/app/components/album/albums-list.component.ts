import { Component, OnInit } from '@angular/core'

import { ConfigService } from '../../services/config.service'

import { IAlbum } from '../../interfaces/album'

@Component({
  selector: 'albums-list',
  templateUrl: './albums-list.component.html',
})
export class AlbumsFavorites implements OnInit {
  favoriteAlbums: IAlbum[] = []

  errorMessage: string = ''

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.configService.getAlbums().subscribe({
      next: (data) => {
        for (let album of data) {
          this.favoriteAlbums.push(album)
        }
      },
      error: (err) => (this.errorMessage = err),
    })
  }
}
