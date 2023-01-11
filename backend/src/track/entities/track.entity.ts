import { Album } from 'src/album/entities/album.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'track' })
export class Track {
  @PrimaryGeneratedColumn()
  trackId: number

  @Column()
  trackNumber: number

  @Column()
  title: string

  @ManyToOne(() => Album, (album: Album) => album.tracks)
  album: Album
}
