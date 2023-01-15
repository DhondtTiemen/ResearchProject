import { IAlbum } from './album'

export interface IArtist {
  artistId: number
  artistName: string
  firstName: string
  lastName: string
  birthDate: Date
  description: string
  image: string
  albums: IAlbum[]
}
