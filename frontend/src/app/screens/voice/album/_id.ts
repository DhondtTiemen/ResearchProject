import { Component, OnInit } from '@angular/core'

import { AlanService } from 'src/app/services/alan.service'

import { IAlbum } from 'src/app/interfaces/album'

@Component({
  selector: 'chosen-album',
  templateUrl: './_id.html',
})
export class VoiceChosenAlbumPageComponent implements OnInit {
  constructor(private alanService: AlanService) {}

  loaded: boolean = false

  albumChosen: IAlbum[] = []

  ngOnInit(): void {
    this.albumChosen = this.alanService.getChosenAlbum()
    console.log(this.albumChosen)
    this.loaded = true
  }
}
