import { IAlbum } from './album'

export interface IArtist {
  artistId: number
  firstName: string
  lastName: string
  birthDate: Date
  description: string
  image: string
  albums: IAlbum[]
}
