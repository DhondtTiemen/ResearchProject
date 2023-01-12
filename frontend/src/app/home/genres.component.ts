import { Component } from '@angular/core'

@Component({
  selector: 'genres',
  templateUrl: './genres.component.html',
})
export class GenresComponent {
  genres: any[] = [
    {
      genreId: 1,
      name: 'Pop',
      image:
        'https://images.pexels.com/photos/1876279/pexels-photo-1876279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      genreId: 2,
      name: 'Dance',
      image:
        'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      genreId: 3,
      name: 'Classic',
      image:
        'https://images.pexels.com/photos/45243/saxophone-music-gold-gloss-45243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      genreId: 4,
      name: 'Rock',
      image:
        'https://images.pexels.com/photos/811838/pexels-photo-811838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ]
}
