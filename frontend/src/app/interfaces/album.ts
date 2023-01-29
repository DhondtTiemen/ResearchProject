import { IArtist } from './artist'
import { IGenre } from './genre'
import { IOrder } from './order'
import { ITrack } from './track'

export interface IAlbum {
  albumId: number
  title: string
  price: number
  description: string
  releaseDate: string
  image: string
  themeColor: string
  stock: number
  popular: boolean
  artist: IArtist
  genres: IGenre[]
  tracks: ITrack[]
  orders?: IOrder[]
}
