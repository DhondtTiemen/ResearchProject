import { Component, OnInit } from '@angular/core'

import { ConfigService } from '../../config/config.service'

import { IAlbum } from '../../interfaces/album'

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

  constructor(private configService: ConfigService) {}

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
    this.configService.getAlbums().subscribe({
      next: (allAlbums) => {
        this.allAlbums = allAlbums
        this.filteredAlbums = this.allAlbums
      },
      error: (err) => (this.errorMessage = err),
    })
  }
}
