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
    this.configService.getProducts().subscribe({
      next: (data) => {
        for (let album of data) {
          const releaseDate = new Date(album.releaseDate)
          const todayDate = new Date()
          if (releaseDate < todayDate) {
            if (this.preOrderAlbums.length < 8) {
              // let artistName: string = ''

              // this.configService.getArtistById(album.artistArtistId).subscribe({
              //   next: (data) => {
              //     console.log(data.firstName)
              //     artistName = data.firstName
              //   },
              //   error: (err) => (this.errorMessage = err),
              // })
              // console.log(artistName)
              // album.artistName = artistName

              this.preOrderAlbums.push(album)
            }
          }
        }
      },
      error: (err) => (this.errorMessage = err),
    })
  }

  getArtistById(artistId: number): string {
    console.log('Searching for artist...')
    let artistFullName: string = ''
    this.configService.getArtistById(artistId).subscribe({
      next: (data) => {
        console.log(data)
        artistFullName = data.firstName + data.lastName
      },
      error: (err) => (this.errorMessage = err),
    })

    return artistFullName
  }
}
