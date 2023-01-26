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
    const userId: number = 1

    this.configService.getFavoritesByUserId(userId).subscribe({
      next: (data) => {
        console.log(data)

        for (let album of data.favorites) {
          this.favoriteAlbums.push(album)
        }
      },
      error: (err) => (this.errorMessage = err),
    })
  }

  onFavoriteBtnClick(albumId: number): void {
    const userId: number = 1

    this.configService.getAlbumByAlbumId(albumId).subscribe({
      next: (data) => {
        let album: any = data

        console.log(album.users)

        if (album.users.length > 0) {
          console.log('Some favorites for this album...')

          for (let i = 0; i < album.users.length; i++) {
            console.log('Checking all users...')
            if (album.users[i].userId == userId) {
              console.log('Is already favorite')
              delete album.users[i]
              console.log(album.users)
            } else {
              console.log('Adding to favorites...')
              album.users.push({ userId: userId })
            }
          }

          this.configService.updateAlbum(album).subscribe({
            next: (data) => {
              let updatedAlbum = data
            },
          })
        } else {
          console.log('No favorites for this album...')
          album.users.push({ userId: userId })

          this.configService.updateAlbum(album).subscribe({
            next: (data) => {
              let updatedAlbum = data
            },
          })
        }
      },
    })
  }
}
