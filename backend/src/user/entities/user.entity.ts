import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Order } from 'src/order/entities/order.entity'

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'userId', unsigned: true })
  userId: number

  @Column('varchar', { name: 'uid', length: 255 })
  uid: string

  @Column({ type: 'int', name: 'ordersCount', nullable: true })
  ordersCount: number

  @OneToMany(() => Order, (order: Order) => order.user)
  orders: Order[]
}
