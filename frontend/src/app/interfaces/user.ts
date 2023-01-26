import { IAlbum } from './album'
import { IOrder } from './order'

export interface IUser {
  userId: number
  uid: string
  favorites: IAlbum[]
  orders: IOrder[]
}
