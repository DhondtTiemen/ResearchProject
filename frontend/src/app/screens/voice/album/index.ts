import { Component, OnInit } from '@angular/core'

import { AlanService } from 'src/app/services/alan.service'

import { IAlbum } from 'src/app/interfaces/album'

@Component({
  selector: 'voice-albumTitle-page',
  templateUrl: './index.html',
})
export class VoiceAlbumsTitlePageComponent implements OnInit {
  constructor(private alanService: AlanService) {}

  loaded: boolean = false

  albums: IAlbum[] = []

  ngOnInit(): void {
    this.albums = this.alanService.getAlbumTitles()
    this.loaded = true
  }
}
