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

  ngOnInit(): void {
    this.orders = this.alanService.getOrders()
    this.loaded = true
  }
}
