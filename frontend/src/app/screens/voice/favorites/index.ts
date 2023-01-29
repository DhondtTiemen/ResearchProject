import { Component, OnInit } from '@angular/core'
import { IAlbum } from 'src/app/interfaces/album'

import { AlanService } from 'src/app/services/alan.service'

@Component({
  selector: 'voice-favorites-page',
  templateUrl: './index.html',
})
export class VoiceFavoritesPageComponent implements OnInit {
  constructor(private alanService: AlanService) {}

  loaded: boolean = false

  favorites: IAlbum[] = []

  ngOnInit(): void {
    this.favorites = this.alanService.getFavorites()
    this.loaded = true
  }
}
