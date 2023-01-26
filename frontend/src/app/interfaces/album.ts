import { IArtist } from './artist'
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
  tracks: ITrack[]
  orders?: IOrder[]
}
