import { Component, OnInit } from '@angular/core'

import { ConfigService } from '../../services/config.service'

import { IAlbum } from '../../interfaces/album'
import { AlanService } from 'src/app/services/alan.service'

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

  searchedByVoice: IAlbum[] = []
  filteredAlbums: IAlbum[] = []
  allAlbums: IAlbum[] = []

  errorMessage: string = ''

  performFilter(searchInput: string): IAlbum[] {
    searchInput = searchInput.toLocaleLowerCase()
    console.log(searchInput)

    return this.allAlbums.filter((album: IAlbum) =>
      album.title.toLocaleLowerCase().includes(searchInput),
    )
  }

  ngOnInit(): void {
    this.searchedByVoice = this.alanService.getSearchedAlbums()
    console.log(this.searchedByVoice)

    if (this.searchedByVoice.length == 0) {
      this.configService.getAlbums().subscribe({
        next: (allAlbums) => {
          this.allAlbums = allAlbums
          this.filteredAlbums = this.allAlbums
        },
        error: (err) => (this.errorMessage = err),
      })
    }
  }
}
