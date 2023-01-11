import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Artist } from 'src/artist/entities/artist.entity'
import { Track } from 'src/track/entities/track.entity'

@Entity({ name: 'album' })
export class Album {
  @PrimaryGeneratedColumn()
  albumId: number

  @Column()
  title: string

  @Column()
  price: number

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  releaseDate: Date

  @Column({ nullable: true })
  image: string

  @Column({ nullable: true })
  themeColor: string

  @ManyToOne(() => Artist, (artist: Artist) => artist.albums)
  artist: Artist

  @OneToMany(() => Track, (track: Track) => track.album)
  tracks: Track[]
}
