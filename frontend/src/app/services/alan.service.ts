import alanBtn from '@alan-ai/alan-sdk-web'

import { Injectable, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { IAlbum } from '../interfaces/album'
import { IArtist } from '../interfaces/artist'
import { IGenre } from '../interfaces/genre'
import { IOrder } from '../interfaces/order'
import { SearchPageComponent } from '../screens/search'

import { ConfigService } from './config.service'

@Injectable({
  providedIn: 'root',
})
export class AlanService implements OnInit {
  alanBtnInstance: any

  COMMANDS = {
    SHOW_ARTISTS: 'show-artists',
    SHOW_GENRES: 'show-genres',
    SHOW_ALBUMTITLES: 'show-albumTitles',

    SHOW_ALBUMS_BY_FILTER: 'show-albums-by-filter',
    SHOW_CHOSEN_ALBUM: 'show-chosen-album',

    ADD_TO_CART: 'add-to-cart',

    // SEARCH_ARTIST: 'search-artist',
    // SEARCH_GENRE: 'search-genre',
    // SEARCH_TITLE: 'search-title',

    // OPEN_HOME: 'open-home',
    // OPEN_FAVORITES: 'open-favorites',
    // SEARCH_ALBUM: 'search-album',
    // SEARCH_ALBUM_BY_ARTIST: 'albums-by-artist',
    // OPEN_CART: 'open-cart',
    // OPEN_USER: 'open-user',

    // ADD_ALBUM: 'add-album',
  }

  constructor(private router: Router, private configService: ConfigService) {
    this.alanBtnInstance = alanBtn({
      key: '2149838387f2deadab532c2564554eb42e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData: any) => {
        if (commandData.command == this.COMMANDS.SHOW_ARTISTS) {
          this.showArtists(commandData.allArtists)
        } else if (commandData.command == this.COMMANDS.SHOW_GENRES) {
          this.showGenres(commandData.allGenres)
        } else if (commandData.command == this.COMMANDS.SHOW_ALBUMTITLES) {
          this.showAlbumTitles(commandData.allAlbumTitles)
        } else if (commandData.command == this.COMMANDS.SHOW_ALBUMS_BY_FILTER) {
          this.showAlbumsByFilter(commandData.allAlbumsByFilter)
        } else if (commandData.command == this.COMMANDS.SHOW_CHOSEN_ALBUM) {
          this.showChosenAlbum(commandData.album)
        } else if (commandData.command == this.COMMANDS.ADD_TO_CART) {
          this.addToCart(commandData.orderedAlbum)
        }

        // if (commandData.command == this.COMMANDS.SEARCH_ARTIST) {
        //   this.searchArtist(commandData.artist)
        // } else if (commandData.command == this.COMMANDS.SEARCH_GENRE) {
        //   this.searchGenre(commandData.genre)
        // }

        // else if (commandData.command == this.COMMANDS.SEARCH_ALBUM) {
        //   this.searchAlbum(commandData.album)
        // }

        // if (commandData.command == this.COMMANDS.OPEN_HOME) {
        //   this.openHome()
        // } else if (commandData.command == this.COMMANDS.OPEN_FAVORITES) {
        //   this.openFavorites()
        // } else if (commandData.command == this.COMMANDS.SEARCH_ALBUM) {
        //   this.searchAlbum()
        // } else if (
        //   commandData.command == this.COMMANDS.SEARCH_ALBUM_BY_ARTIST
        // ) {
        //   this.searchAlbumByArtist(commandData.artist)
        // } else if (commandData.command == this.COMMANDS.OPEN_CART) {
        //   this.openCart()
        // } else if (commandData.command == this.COMMANDS.OPEN_USER) {
        //   this.openUser()
        // }

        //  else if (commandData.command == this.COMMANDS.OPEN_FAVORITES) {
        //   this.addAlbum(commandData.payload)
        // }
      },
    })
  }

  allArtists: IArtist[] = []
  allGenres: IGenre[] = []
  allAlbumTitles: IAlbum[] = []

  albumsByFilter: IAlbum[] = []
  albumChosen: IAlbum[] = []

  albumsList: any = []
  savedAlbums: any = []
  savedArtist: string = ''

  artist: string = ''
  genre: string = ''
  album: string = ''

  chosenAlbumName: string = ''

  errorMessage = ''

  ngOnInit(): void {
    this.initAlan()
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

  initAlan() {
    this.alanBtnInstance.playText('Welcome, to Elpee! What do you want to do?')
  }

  showArtists(artists: IArtist[]) {
    console.log(artists)
    this.allArtists = artists
    this.router.navigate(['voice/artists'])
  }

  getArtists(): IArtist[] {
    return this.allArtists
  }

  showGenres(genres: IGenre[]) {
    console.log(genres)
    this.allGenres = genres
    this.router.navigate(['/voice/genres'])
  }

  getGenres(): IGenre[] {
    return this.allGenres
  }

  showAlbumTitles(albums: IAlbum[]) {
    console.log(albums)
    this.allAlbumTitles = albums
    this.router.navigate(['voice/titles'])
  }

  getAlbumTitles(): IAlbum[] {
    return this.allAlbumTitles
  }

  showAlbumsByFilter(albums: IAlbum[]) {
    console.log(albums)
    this.albumsByFilter = albums
    this.router.navigate([`/voice/filter`])
  }

  getAlbumsByFilter(): IAlbum[] {
    return this.albumsByFilter
  }

  showChosenAlbum(chosenAlbum: IAlbum[]) {
    this.albumChosen = chosenAlbum
    console.log(this.albumChosen)
    this.router.navigate(['/voice/album'])
  }

  getChosenAlbum() {
    return this.albumChosen
  }

  notCompletedOrder: IOrder[] | undefined = undefined
  order: IOrder | undefined = undefined

  addToCart(orderedAlbum: IAlbum) {
    console.log(orderedAlbum)

    const userId: number = 1
    this.configService.getNotCompletedOrdersByUserId(userId).subscribe({
      next: (data) => {
        this.notCompletedOrder = data.orders
        this.checkCreateOrder(this.notCompletedOrder, orderedAlbum.albumId)
      },
      error: (err) => (this.errorMessage = err),
    })
  }

  // Creating order if needed
  checkCreateOrder(orders: IOrder[], albumId: number): void {
    if (orders.length <= 0) {
      // Creating an order
      this.configService.createOrder().subscribe({
        next: (data) => {
          this.order = data
          this.addAlbumToOrder(this.order.orderId, albumId)
        },
        error: (err) => (this.errorMessage = err),
      })
    } else {
      this.addAlbumToOrder(orders[0].orderId, albumId)
    }
  }

  addAlbumToOrder(orderId: number, albumId: number): void {
    this.configService.getAlbumByAlbumId(albumId).subscribe({
      next: (data) => {
        let album: any = data

        album.stock = album.stock - 1
        album.orders.push({ orderId: orderId })

        this.configService.updateAlbum(album).subscribe({
          next: (data) => {
            let updatedAlbum = data
          },
        })
      },
    })
  }

  searchArtist(artist: string) {
    this.alanBtnInstance.playText(artist)
    this.artist = artist

    this.router.navigate(['/voice/artist'])
  }

  searchGenre(genre: string) {
    this.alanBtnInstance.playText(genre)
    this.genre = genre

    this.router.navigate(['/voice/genre'])
  }

  getSearchedGenre(): string {
    return this.genre
  }

  searchAlbum(album: string) {
    this.alanBtnInstance.playText(album)
    this.album = album

    this.router.navigate(['/voice/album'])
  }

  openHome() {
    this.alanBtnInstance.playText('Opening home page')
    this.router.navigate(['/'])
  }

  openFavorites() {
    this.alanBtnInstance.playText('Opening your favorites')
    this.router.navigate(['favorites'])
  }

  // searchAlbum() {
  //   this.alanBtnInstance.playText('Opening search page')
  //   this.router.navigate(['albums'])
  // }

  async searchAlbumByArtist(artist?: any) {
    this.alanBtnInstance.playText(
      `Here are the albums from ${artist.artistName}`,
    )

    this.savedArtist = artist.artistName
    this.router.navigate(['albums'])

    this.savedAlbums = artist.albums
  }

  getSearchedAlbums() {
    return this.savedAlbums
  }

  getSearchedArtist() {
    return this.savedArtist
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
