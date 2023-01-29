import { Component, OnInit } from '@angular/core'
import { IAlbum } from 'src/app/interfaces/album'

import { ConfigService } from 'src/app/services/config.service'

@Component({
  selector: 'favorites-page',
  templateUrl: './index.html',
})
export class FavoritesPageComponent implements OnInit {
  constructor(private configService: ConfigService) {}

  loaded: boolean = false
  userId: number = 1

  favoriteAlbums: IAlbum[] = []

  ngOnInit(): void {
    // GET FAVORITES
    this.configService.getFavoritesByUserId(this.userId).subscribe({
      next: (albums) => {
        for (let album of albums.favorites) {
          if (this.favoriteAlbums.length < 8) {
            this.favoriteAlbums.push(album)
            this.loaded = true
          }
        }
      },
      error: (err) => err,
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
