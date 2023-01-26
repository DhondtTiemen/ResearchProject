import { Component, OnInit } from '@angular/core'
import { IAlbum } from 'src/app/interfaces/album'
import { ConfigService } from 'src/app/services/config.service'

@Component({
  selector: 'albums-cart',
  templateUrl: './albums-cart.component.html',
})
export class AlbumsCart implements OnInit {
  cartAlbums: IAlbum[] = []
  orderId: number = 0

  errorMessage: string = ''

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    const userId: number = 1

    this.configService.getNotCompletedOrdersByUserId(userId).subscribe({
      next: (data) => {
        for (let order of data.orders) {
          this.orderId = order.orderId

          for (let album of order.albums) {
            this.cartAlbums.push(album)
          }
        }
      },
      error: (err) => (this.errorMessage = err),
    })
  }

  onRemoveBtnClick(albumId: number): void {
    this.configService.getAlbumByAlbumId(albumId).subscribe({
      next: (data) => {
        let album: any = data
        console.log(album.orders)

        if (album.orders.length > 0) {
          console.log('Some orders for this album...')

          for (let i = 0; i < album.orders.length; i++) {
            console.log('Checking all orders...')
            if (album.orders[i].orderId == this.orderId) {
              console.log('Is already in this order')
              delete album.orders[i]
              album.stock = album.stock + 1
              console.log(album.orders)
            } else {
              console.log('Adding to order...')
              album.orders.push({ orderId: this.orderId })
            }
          }

          this.configService.updateAlbum(album).subscribe({
            next: (data) => {
              let updatedAlbum = data
            },
          })
        } else {
          console.log('No orders for this album...')

          album.users.push({ orderId: this.orderId })

          this.configService.updateAlbum(album).subscribe({
            next: (data) => {
              let updatedAlbum = data
            },
          })
        }
      },
    })
  }

  onCheckOutBtnClick(orderId: number): void {
    console.log('Checking out...')
    console.log(orderId)

    this.configService.completeOrder(orderId).subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (err) => (this.errorMessage = err),
    })
  }
}
