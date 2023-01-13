import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Album } from 'src/album/entities/album.entity'

@Entity({ name: 'artist' })
export class Artist {
  @PrimaryGeneratedColumn({ type: 'int', name: 'artistId', unsigned: true })
  artistId: number

  @Column('varchar', { name: 'artistName', length: 255 })
  artistName: string

  @Column('varchar', { name: 'firstName', length: 255, nullable: true })
  firstName: string

  @Column('varchar', { name: 'lastName', length: 255, nullable: true })
  lastName: string

  @Column({ type: 'date', name: 'birthDate', nullable: true })
  birthDate: Date

  @Column({ type: 'longtext', name: 'description', nullable: true })
  description: string

  @Column({ type: 'mediumtext', name: 'image', nullable: true })
  image: string

  @OneToMany(() => Album, (album: Album) => album.artist)
  albums: Album[]
}
