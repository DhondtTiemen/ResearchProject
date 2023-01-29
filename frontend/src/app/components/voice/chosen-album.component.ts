import { Component, OnInit } from '@angular/core'
import { IAlbum } from 'src/app/interfaces/album'
import { AlanService } from 'src/app/services/alan.service'
import { ConfigService } from 'src/app/services/config.service'

@Component({
  selector: 'chosen-album',
  templateUrl: './chosen-album.component.html',
})
export class VoiceChosenAlbumComponent implements OnInit {
  constructor(private alanService: AlanService) {}

  loaded: boolean = false

  albumChosen: IAlbum[] = []

  ngOnInit(): void {
    this.albumChosen = this.alanService.getChosenAlbum()
    console.log(this.albumChosen)
    this.loaded = true
  }
}
