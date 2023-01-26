import {
  Column,
  Double,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Artist } from 'src/artist/entities/artist.entity'
import { Genre } from 'src/genre/entities/genre.entity'
import { Track } from 'src/track/entities/track.entity'
import { Order } from 'src/order/entities/order.entity'
import { User } from 'src/user/entities/user.entity'

@Entity({ name: 'album' })
export class Album {
  @PrimaryGeneratedColumn({ type: 'int', name: 'albumId', unsigned: true })
  albumId: number

  @Column('varchar', { name: 'title', length: 255 })
  title: string

  @Column('decimal', { name: 'price', nullable: true })
  price: Double

  @Column({ type: 'longtext', name: 'description', nullable: true })
  description: string

  @Column({ type: 'date', name: 'releaseDate', nullable: true })
  releaseDate: Date

  @Column({ type: 'mediumtext', name: 'image', nullable: true })
  image: string

  @Column('varchar', { name: 'themeColor', length: 8, nullable: true })
  themeColor: string

  @Column('int', { name: 'stock', nullable: true })
  stock: number

  @Column('boolean', { name: 'popular', nullable: true })
  popular: boolean

  @ManyToOne(() => Artist, (artist: Artist) => artist.albums)
  artist: Artist

  @OneToMany(() => Track, (track: Track) => track.album)
  tracks: Track[]

  @ManyToMany(() => Genre, (genre: Genre) => genre.albums)
  @JoinTable()
  genres: Genre[]

  @ManyToMany(() => User, (user: User) => user.favorites)
  @JoinTable()
  users: User[]

  @ManyToMany(() => Order, (order: Order) => order.albums)
  @JoinTable()
  orders: Order[]
}
