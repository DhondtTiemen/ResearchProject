import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Order } from 'src/order/entities/order.entity'
import { Album } from 'src/album/entities/album.entity'

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'userId', unsigned: true })
  userId: number

  @Column('varchar', { name: 'uid', length: 255 })
  uid: string

  @Column({ type: 'int', name: 'ordersCount', nullable: true })
  ordersCount: number

  @ManyToMany(() => Album, (album: Album) => album.users)
  @JoinTable()
  favorites: Album[]

  @OneToMany(() => Order, (order: Order) => order.user)
  orders: Order[]
}
