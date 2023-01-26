import { IAlbum } from './album'

export interface IGenre {
  genreId: number
  name: string
  image: string
  albums: IAlbum[]
}
