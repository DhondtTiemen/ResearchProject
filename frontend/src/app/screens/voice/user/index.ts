import { Component, OnInit } from '@angular/core'

import { AlanService } from 'src/app/services/alan.service'

import { IOrder } from 'src/app/interfaces/order'

@Component({
  selector: 'voice-user-page',
  templateUrl: './index.html',
})
export class VoiceUserPageComponent implements OnInit {
  constructor(private alanService: AlanService) {}

  loaded: boolean = false

  orders: IOrder[] = []
  completedOrders: IOrder[] = []

  ngOnInit(): void {
    this.orders = this.alanService.getOrders()

    for (let order of this.orders) {
      let totalPrice: number = 0

      for (let album of order.albums) {
        totalPrice += Number(album.price)
      }

      order.totalPrice = totalPrice
      this.completedOrders.push(order)
    }

    this.loaded = true
  }
}
