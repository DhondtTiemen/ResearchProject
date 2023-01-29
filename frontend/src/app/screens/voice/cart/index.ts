import { Component, OnInit } from '@angular/core'

import { AlanService } from 'src/app/services/alan.service'

import { IAlbum } from 'src/app/interfaces/album'

@Component({
  selector: 'voice-cart-page',
  templateUrl: './index.html',
})
export class VoiceCartPageComponent implements OnInit {
  constructor(private alanService: AlanService) {}

  loaded: boolean = false

  items: IAlbum[] = []

  ngOnInit(): void {
    this.items = this.alanService.getItems()
    this.loaded = true
  }
}
