import { Component, OnInit } from '@angular/core'

import { ConfigService } from '../../services/config.service'

import { IOrder } from 'src/app/interfaces/order'

@Component({
  selector: 'orders-list',
  templateUrl: './orders-list.component.html',
})
export class OrdersCompleted implements OnInit {
  completedOrders: IOrder[] = []

  errorMessage: string = ''

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    const userId = 1

    this.configService.getCompletedOrdersByUserId(userId).subscribe({
      next: (data) => {
        for (let order of data.orders) {
          let totalPrice: number = 0

          for (let album of order.albums) {
            totalPrice += Number(album.price)
          }

          order.totalPrice = totalPrice
          this.completedOrders.push(order)
          console.log(this.completedOrders)
        }
      },
      error: (err) => (this.errorMessage = err),
    })
  }
}
