import alanBtn from '@alan-ai/alan-sdk-web'

import { Injectable, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { SearchPageComponent } from '../screens/search'

import { ConfigService } from './config.service'

@Injectable({
  providedIn: 'root',
})
export class AlanService implements OnInit {
  alanBtnInstance: any

  COMMANDS = {
    OPEN_HOME: 'open-home',
    OPEN_FAVORITES: 'open-favorites',
    SEARCH_ALBUM: 'search-album',
    SEARCH_ALBUM_BY_ARTIST: 'albums-by-artist',
    OPEN_CART: 'open-cart',
    OPEN_USER: 'open-user',

    ADD_ALBUM: 'add-album',
  }

  constructor(private router: Router, private configService: ConfigService) {
    this.alanBtnInstance = alanBtn({
      key: '2149838387f2deadab532c2564554eb42e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData: any) => {
        if (commandData.command == this.COMMANDS.OPEN_HOME) {
          this.openHome()
        } else if (commandData.command == this.COMMANDS.OPEN_FAVORITES) {
          this.openFavorites()
        } else if (commandData.command == this.COMMANDS.SEARCH_ALBUM) {
          this.searchAlbum()
        } else if (
          commandData.command == this.COMMANDS.SEARCH_ALBUM_BY_ARTIST
        ) {
          this.searchAlbumByArtist(commandData.albums)
        } else if (commandData.command == this.COMMANDS.OPEN_CART) {
          this.openCart()
        } else if (commandData.command == this.COMMANDS.OPEN_USER) {
          this.openUser()
        }

        //  else if (commandData.command == this.COMMANDS.OPEN_FAVORITES) {
        //   this.addAlbum(commandData.payload)
        // }
      },
    })
  }

  albumsList: any = []
  savedAlbums: any = []

  errorMessage = ''

  ngOnInit(): void {
    // this.configService.getAlbums().subscribe({
    //   next: (data) => {
    //     console.log(data)
    //     data.forEach((element) => {
    //       this.albumsList.push(
    //         element.title.replace(/[^a-zA-Z ]/g, '') + '~' + element.albumId,
    //       )
    //     })
    //     // project.albums = this.albumsList.join('|')
    //     this.savedAlbums = data
    //   },
    //   error: (err) => (this.errorMessage = err),
    // })
  }

  // searchData() {}

  openHome() {
    this.alanBtnInstance.playText('Opening home page')
    this.router.navigate(['/'])
  }

  openFavorites() {
    this.alanBtnInstance.playText('Opening your favorites')
    this.router.navigate(['favorites'])
  }

  searchAlbum() {
    this.alanBtnInstance.playText('Opening search page')
    this.router.navigate(['albums'])
  }

  searchAlbumByArtist(artist?: any) {
    this.alanBtnInstance.playText(
      `Here are the albums from ${artist.artistName}`,
    )
    this.router.navigate(['albums'])
    this.savedAlbums = artist.albums
    console.log(this.savedAlbums)
  }

  getSearchedAlbums() {
    return this.savedAlbums
  }

  openCart() {
    this.alanBtnInstance.playText('Opening your shopping bag')
    this.router.navigate(['cart'])
  }

  openUser() {
    this.alanBtnInstance.playText('Opening your account')
    this.router.navigate(['user'])
  }

  addAlbum(payload: any) {
    console.log(payload)
  }
}
