import { Component, OnInit } from '@angular/core'

import { ConfigService } from '../../services/config.service'

import { IAlbum } from '../../interfaces/album'
import { AlanService } from 'src/app/services/alan.service'
import { IArtist } from 'src/app/interfaces/artist'

@Component({
  selector: 'search-page',
  templateUrl: './index.html',
})
export class SearchPageComponent implements OnInit {
  private _albumsFilter: string = ''

  get albumsFilter(): string {
    return this._albumsFilter
  }
  set albumsFilter(value: string) {
    this._albumsFilter = value
    this.filteredAlbums = this.performFilter(value)
    console.log(this.filteredAlbums)
  }

  constructor(
    private readonly configService: ConfigService,
    private readonly alanService: AlanService,
  ) {}

  searchedByVoiceArtist: string = ''
  searchedByVoiceAlbums: IAlbum[] = []
  filteredAlbums: IAlbum[] = []
  allAlbums: IAlbum[] = []

  errorMessage: string = ''

  performFilter(searchInput: string): IAlbum[] {
    searchInput = searchInput.toLocaleLowerCase()
    console.log(searchInput)

    return this.allAlbums.filter(
      (album: IAlbum) =>
        album.title.toLocaleLowerCase().includes(searchInput) ||
        album.artist.artistName.toLocaleLowerCase().includes(searchInput),
    )
  }

  ngOnInit(): void {
    // this.searchedByVoiceAlbums = this.alanService.getSearchedAlbums()

    if (this.searchedByVoiceArtist.length == 0) {
      console.log('Nog geen zoeking gedaan...')

      // Alle albums ophalen
      this.configService.getAlbums().subscribe({
        next: (allAlbums) => {
          this.allAlbums = allAlbums
          this.filteredAlbums = this.allAlbums
        },
        error: (err) => (this.errorMessage = err),
      })
    } else {
      console.log('Er is gezocht op artist...')
      console.log(this.searchedByVoiceArtist)
      this.albumsFilter = this.searchedByVoiceArtist
      // this.filteredAlbums = this.searchedByVoiceAlbums

      // if (this.searchedByVoice.length == 0) {
      //   this.configService.getAlbums().subscribe({
      //     next: (allAlbums) => {
      //       this.allAlbums = allAlbums
      //       this.filteredAlbums = this.allAlbums
      //     },
      //     error: (err) => (this.errorMessage = err),
      //   })
      // }
    }
  }
}
