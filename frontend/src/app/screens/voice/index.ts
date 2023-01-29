import { Component, OnInit } from '@angular/core'

import { ConfigService } from 'src/app/services/config.service'
import { AlanService } from 'src/app/services/alan.service'

import { IAlbum } from 'src/app/interfaces/album'

@Component({
  selector: 'voice-page',
  templateUrl: './index.html',
})
export class VoiceHomePageComponent implements OnInit {
  constructor(
    private alanService: AlanService,
    private configService: ConfigService,
  ) {}

  loaded: boolean = false
  initAlan: boolean = false

  popularAlbums: IAlbum[] = []

  ngOnInit(): void {
    this.popularAlbums = []

    // GET POPULAR ALBUMS
    this.configService.getPopularAlbums().subscribe({
      next: (albums) => {
        for (let album of albums) {
          if (this.popularAlbums.length < 7) {
            this.popularAlbums.push(album)
            this.loaded = true
          }
        }
      },
      error: (err) => err,
    })
  }
}
