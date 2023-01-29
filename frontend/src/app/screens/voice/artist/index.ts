import { Component, OnInit } from '@angular/core'

import { AlanService } from 'src/app/services/alan.service'

import { IArtist } from 'src/app/interfaces/artist'

@Component({
  selector: 'voice-artist-page',
  templateUrl: './index.html',
})
export class VoiceArtistPageComponent implements OnInit {
  constructor(private alanService: AlanService) {}

  loaded: boolean = false

  artists: IArtist[] = []

  ngOnInit(): void {
    this.artists = this.alanService.getArtists()
    this.loaded = true
  }
}
