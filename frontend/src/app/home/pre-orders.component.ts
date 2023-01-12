import { Component } from '@angular/core'

@Component({
  selector: 'pre-orders',
  templateUrl: './pre-orders.component.html',
})
export class PreOrderComponent {
  preOrders: any[] = [
    {
      albumId: 1,
      artist: 'Harry Styles',
      title: 'Harry Styles',
      price: 30,
      description: 'First album',
      releaseDate: '2017-05-11T22:00:00.000Z',
      image:
        'https://upload.wikimedia.org/wikipedia/en/a/a0/HarryStyles-albumcover.png',
      themeColor: '#D8B691',
      tracks: [
        {
          trackId: 11,
          trackNumber: 10,
          title: 'From the Dining Table',
        },
        {
          trackId: 10,
          trackNumber: 9,
          title: 'Woman',
        },
        {
          trackId: 9,
          trackNumber: 8,
          title: 'Ever Since New York',
        },
        {
          trackId: 8,
          trackNumber: 7,
          title: 'Kiwi',
        },
        {
          trackId: 7,
          trackNumber: 6,
          title: 'Only Angel',
        },
        {
          trackId: 6,
          trackNumber: 5,
          title: 'Sweet Creature',
        },
        {
          trackId: 5,
          trackNumber: 4,
          title: 'Two Ghosts',
        },
        {
          trackId: 4,
          trackNumber: 3,
          title: 'Carolina',
        },
        {
          trackId: 3,
          trackNumber: 2,
          title: 'Sign of the Times',
        },
        {
          trackId: 2,
          trackNumber: 1,
          title: 'Meet Me in the Hallway',
        },
      ],
    },
    {
      albumId: 2,
      artist: 'Harry Styles',
      title: 'Fine Line',
      price: 30,
      description: 'Second album',
      releaseDate: '2019-12-12T23:00:00.000Z',
      image:
        'https://upload.wikimedia.org/wikipedia/en/b/b1/Harry_Styles_-_Fine_Line.png',
      themeColor: '#C58484',
      tracks: [],
    },
    {
      albumId: 3,
      artist: 'Harry Styles',
      title: "Harry's House",
      price: 30,
      description: 'Third album',
      releaseDate: '2022-05-19T22:00:00.000Z',
      image:
        'https://upload.wikimedia.org/wikipedia/en/d/d5/Harry_Styles_-_Harry%27s_House.png',
      themeColor: '#C7A474',
      tracks: [],
    },
  ]
}
