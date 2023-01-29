import { Component, OnInit } from '@angular/core'
import { IAlbum } from 'src/app/interfaces/album'
import { AlanService } from 'src/app/services/alan.service'
import { ConfigService } from 'src/app/services/config.service'

@Component({
  selector: 'voice-search-genre',
  templateUrl: './voice-search-genre.component.html',
})
export class VoiceSearchGenreComponent implements OnInit {
  constructor(
    private alanService: AlanService,
    private configService: ConfigService,
  ) {}

  albumsByGenre: IAlbum[] = []

  ngOnInit(): void {
    let genre = this.alanService.getSearchedGenre()
    console.log(genre)

    // GET ALBUMS BY GENRE
    this.configService.getGenreByName(genre).subscribe({
      next: (genre) => {
        this.albumsByGenre = genre.albums
        console.log(this.albumsByGenre)

        this.alanService.alanBtnInstance.playText(
          `Here are all the albums with the genre ${genre.name}`,
        )
        for (let album of this.albumsByGenre) {
          this.alanService.alanBtnInstance.playText(album.title)
        }
      },
      error: (err) => err,
    })
  }

  showAlbum(album: IAlbum): void {
    console.log(`This album is ${album.title}`)
  }
}
