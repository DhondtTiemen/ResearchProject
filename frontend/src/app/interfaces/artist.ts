import { IAlbum } from './album'

export interface IArtist {
  artistId: number
  artistName: string
  firstName: string
  lastName: string
  popular: boolean
  birthDate: Date
  description: string
  image?: string
  albums: IAlbum[]
}
