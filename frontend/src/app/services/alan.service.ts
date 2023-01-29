import { Injectable, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import alanBtn from '@alan-ai/alan-sdk-web'

import { ConfigService } from './config.service'

import { IArtist } from '../interfaces/artist'
import { IGenre } from '../interfaces/genre'
import { IAlbum } from '../interfaces/album'
import { IOrder } from '../interfaces/order'

@Injectable({
  providedIn: 'root',
})
export class AlanService implements OnInit {
  alanBtnInstance: any

  COMMANDS = {
    OPEN_HOME: 'open-home',
    OPEN_FAVORITES: 'open-favorites',
    OPEN_CART: 'open-cart',
    OPEN_USER: 'open-user',

    SHOW_ARTISTS: 'show-artists',
    SHOW_GENRES: 'show-genres',
    SHOW_ALBUMTITLES: 'show-albumTitles',

    SHOW_ALBUMS_BY_FILTER: 'show-albums-by-filter',
    SHOW_CHOSEN_ALBUM: 'show-chosen-album',

    ADD_TO_CART: 'add-to-cart',

    CHECKOUT: 'check-out',
  }

  constructor(private router: Router, private configService: ConfigService) {
    this.alanBtnInstance = alanBtn({
      key: '2149838387f2deadab532c2564554eb42e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData: any) => {
        if (commandData.command == this.COMMANDS.OPEN_HOME) {
          this.openHome()
        } else if (commandData.command == this.COMMANDS.OPEN_FAVORITES) {
          this.openFavorites(commandData.allFavorites)
        } else if (commandData.command == this.COMMANDS.OPEN_CART) {
          this.openCart(commandData.allItems)
        } else if (commandData.command == this.COMMANDS.OPEN_USER) {
          this.openUser(commandData.allOrders)
        } else if (commandData.command == this.COMMANDS.SHOW_ARTISTS) {
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
        } else if (commandData.command == this.COMMANDS.CHECKOUT) {
          this.checkOut(commandData.notCompletedOrder)
        }
      },
    })
  }

  allFavorites: IAlbum[] = []
  allItems: IAlbum[] = []
  allOrders: IOrder[] = []

  allArtists: IArtist[] = []
  allGenres: IGenre[] = []
  allAlbumTitles: IAlbum[] = []

  albumsByFilter: IAlbum[] = []
  albumChosen: IAlbum[] = []

  errorMessage = ''

  ngOnInit(): void {}

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

  checkOut(order: IOrder): void {
    console.log(order)

    this.configService.completeOrder(order.orderId).subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (err) => (this.errorMessage = err),
    })
  }

  openHome() {
    this.router.navigate(['voice'])
  }

  openFavorites(favorites: IAlbum[]) {
    console.log(favorites)
    this.allFavorites = favorites

    this.router.navigate(['voice/favorites'])
  }

  getFavorites(): IAlbum[] {
    return this.allFavorites
  }

  openCart(items: IAlbum[]) {
    console.log(items)
    this.allItems = items

    this.router.navigate(['voice/cart'])
  }

  getItems(): IAlbum[] {
    return this.allItems
  }

  openUser(orders: IOrder[]) {
    console.log(orders)
    this.allOrders = orders

    this.router.navigate(['voice/user'])
  }

  getOrders(): IOrder[] {
    return this.allOrders
  }
}
