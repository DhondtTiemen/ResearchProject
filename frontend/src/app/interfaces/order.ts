import { IAlbum } from './album'

export interface IOrder {
  orderId: number
  totalPrice: number
  orderDate: Date
  complete: boolean
  userUserId: string
  albums: IAlbum[]
}
