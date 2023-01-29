import { Component, OnInit } from '@angular/core'
import { IOrder } from 'src/app/interfaces/order'
import { ConfigService } from 'src/app/services/config.service'

@Component({
  selector: 'user-page',
  templateUrl: './index.html',
})
export class UserPageComponent implements OnInit {
  constructor(private configService: ConfigService) {}

  userId: number = 1
  completedOrders: IOrder[] = []

  errorMessage: string = ''

  ngOnInit(): void {
    this.configService.getCompletedOrdersByUserId(this.userId).subscribe({
      next: (data) => {
        for (let order of data.orders) {
          let totalPrice: number = 0

          for (let album of order.albums) {
            totalPrice += Number(album.price)
          }

          order.totalPrice = totalPrice
          this.completedOrders.push(order)
        }
        console.log(this.completedOrders)
      },
      error: (err) => (this.errorMessage = err),
    })
  }
}
