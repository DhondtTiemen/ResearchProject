import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Album } from 'src/album/entities/album.entity'

@Entity({ name: 'track' })
export class Track {
  @PrimaryGeneratedColumn({ type: 'int', name: 'trackId', unsigned: true })
  trackId: number

  @Column('int', { name: 'trackNumber', nullable: true })
  trackNumber: number

  @Column('varchar', { name: 'title', length: 255 })
  title: string

  @ManyToOne(() => Album, (album: Album) => album.tracks)
  album: Album
}
