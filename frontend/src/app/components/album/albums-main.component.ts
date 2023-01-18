import { Component, OnInit } from '@angular/core'

import { ConfigService } from '../../services/config.service'

import { IAlbum } from '../../interfaces/album'

@Component({
  selector: 'albums-main',
  templateUrl: './albums-main.component.html',
})
export class AlbumsMain implements OnInit {
  popularAlbums: IAlbum[] = []

  errorMessage: string = ''

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.configService.getAlbums().subscribe({
      next: (data) => {
        for (let album of data) {
          if (album.popular) {
            this.popularAlbums.push(album)
          }
        }
      },
      error: (err) => (this.errorMessage = err),
    })
  }
}
