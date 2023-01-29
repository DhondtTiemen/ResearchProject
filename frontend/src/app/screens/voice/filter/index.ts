import { Component, OnInit } from '@angular/core'

import { AlanService } from 'src/app/services/alan.service'

import { IAlbum } from 'src/app/interfaces/album'

@Component({
  selector: 'voice-filter-page',
  templateUrl: './index.html',
})
export class VoiceFilterPageComponent implements OnInit {
  constructor(private alanService: AlanService) {}

  loaded: boolean = false

  albums: IAlbum[] = []

  ngOnInit(): void {
    this.albums = this.alanService.getAlbumsByFilter()
    this.loaded = true
  }
}
