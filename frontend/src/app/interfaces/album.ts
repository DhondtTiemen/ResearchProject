import { IArtist } from './artist'
import { ITrack } from './track'

export interface IAlbum {
  albumId: number
  title: string
  price: number
  description: string
  releaseDate: string
  image: string
  themeColor: string
  popular: boolean
  artist: IArtist
  tracks: ITrack[]
}
