import {
  Column,
  Double,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { User } from 'src/user/entities/user.entity'
import { Album } from 'src/album/entities/album.entity'

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn({ type: 'int', name: 'orderId', unsigned: true })
  orderId: number

  @Column('decimal', { name: 'totalPrice', nullable: true })
  totalPrice: Double

  @Column('boolean', { name: 'complete', nullable: true })
  complete: boolean

  @Column({ type: 'date', name: 'orderDate', nullable: true })
  orderDate: Date

  @ManyToOne(() => User, (user: User) => user.orders)
  user: User

  @ManyToMany(() => Album, (album: Album) => album.orders)
  @JoinTable()
  albums: Album[]
}
