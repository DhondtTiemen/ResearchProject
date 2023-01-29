import { Component, OnInit } from '@angular/core'

import { ConfigService } from '../../services/config.service'

import { IAlbum } from '../../interfaces/album'

@Component({
  selector: 'search-page',
  templateUrl: './index.html',
})
export class SearchPageComponent implements OnInit {
  constructor(private readonly configService: ConfigService) {}

  loaded: boolean = false

  searchedByVoiceArtist: string = ''
  searchedByVoiceAlbums: IAlbum[] = []
  filteredAlbums: IAlbum[] = []
  allAlbums: IAlbum[] = []

  errorMessage: string = ''

  private _albumsFilter: string = ''

  get albumsFilter(): string {
    return this._albumsFilter
  }
  set albumsFilter(value: string) {
    this._albumsFilter = value
    this.filteredAlbums = this.performFilter(value)
    console.log(this.filteredAlbums)
  }

  ngOnInit(): void {
    if (this.searchedByVoiceArtist.length == 0) {
      this.configService.getAlbums().subscribe({
        next: (allAlbums) => {
          this.allAlbums = allAlbums
          this.filteredAlbums = this.allAlbums
          this.loaded = true
        },
        error: (err) => (this.errorMessage = err),
      })
    } else {
      this.albumsFilter = this.searchedByVoiceArtist
    }
  }

  performFilter(searchInput: string): IAlbum[] {
    searchInput = searchInput.toLocaleLowerCase()

    return this.allAlbums.filter(
      (album: IAlbum) =>
        album.title.toLocaleLowerCase().includes(searchInput) ||
        album.artist.artistName.toLocaleLowerCase().includes(searchInput),
    )
  }
}
