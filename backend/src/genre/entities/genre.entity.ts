import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Album } from 'src/album/entities/album.entity'

@Entity({ name: 'genre' })
export class Genre {
  @PrimaryGeneratedColumn({ type: 'int', name: 'genreId', unsigned: true })
  genreId: number

  @Column('varchar', { name: 'name', length: 255 })
  name: string

  @Column({ type: 'mediumtext', name: 'image', nullable: true })
  image: string

  @ManyToMany(() => Album, (album: Album) => album.genres)
  @JoinTable()
  albums: Album[]
}
