import { Component, OnInit } from '@angular/core'

import { AlanService } from 'src/app/services/alan.service'

import { IGenre } from 'src/app/interfaces/genre'

@Component({
  selector: 'voice-genre-page',
  templateUrl: './index.html',
})
export class VoiceGenrePageComponent implements OnInit {
  constructor(private alanService: AlanService) {}

  loaded: boolean = false

  genres: IGenre[] = []

  ngOnInit(): void {
    this.genres = this.alanService.getGenres()
    this.loaded = true
  }
}
