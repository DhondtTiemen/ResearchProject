import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { IAlbum } from 'src/app/interfaces/album'
import { IArtist } from 'src/app/interfaces/artist'
import { IOrder } from 'src/app/interfaces/order'
import { ConfigService } from 'src/app/services/config.service'

@Component({
  selector: 'album-detail',
  templateUrl: './album-detail.component.html',
})
export class AlbumDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigService,
  ) {}

  album: IAlbum | undefined = undefined
  artistId: number | undefined = undefined
  artist: IArtist | undefined = undefined
  order: IOrder | undefined = undefined

  notCompletedOrder: IOrder[] | undefined = undefined

  errorMessage: string = ''

  ngOnInit(): void {
    const albumId = Number(this.route.snapshot.paramMap.get('id'))
    this.configService.getAlbumByAlbumId(albumId).subscribe({
      next: (data) => {
        this.album = data

        this.artistId = data.artist.artistId
        this.getArtist(this.artistId)
      },
      error: (err) => (this.errorMessage = err),
    })
  }

  async getArtist(artistId: number): Promise<void> {
    this.configService.getArtistById(artistId).subscribe({
      next: (data) => {
        this.artist = data
      },
      error: (err) => (this.errorMessage = err),
    })
  }

  onCheckOutBtnClick(albumId: number): void {
    console.log('Checking out...')

    const userId: number = 1
    this.configService.getNotCompletedOrdersByUserId(userId).subscribe({
      next: (data) => {
        this.notCompletedOrder = data.orders
        this.checkCreateOrder(this.notCompletedOrder, albumId)
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

  onBackBtnClick(): void {
    this.router.navigate(['..'])
  }

  onFavoriteBtnClick(albumId: number): void {
    const userId: number = 1

    this.configService.getAlbumByAlbumId(albumId).subscribe({
      next: (data) => {
        let album: any = data

        console.log(album.users)

        if (album.users.length > 0) {
          console.log('Some favorites for this album...')

          for (let i = 0; i < album.users.length; i++) {
            console.log('Checking all users...')
            if (album.users[i].userId == userId) {
              console.log('Is already favorite')
              delete album.users[i]
              console.log(album.users)
            } else {
              console.log('Adding to favorites...')
              album.users.push({ userId: userId })
            }
          }

          this.configService.updateAlbum(album).subscribe({
            next: (data) => {
              let updatedAlbum = data
            },
          })
        } else {
          console.log('No favorites for this album...')
          album.users.push({ userId: userId })

          this.configService.updateAlbum(album).subscribe({
            next: (data) => {
              let updatedAlbum = data
            },
          })
        }
      },
    })
  }

  async onAlbumClick(albumId: number): Promise<void> {
    console.log(albumId)
    await this.router.navigate([`/albums/${albumId}`])
    window.location.reload()
  }
}
