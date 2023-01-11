import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Album } from 'src/album/entities/album.entity'

@Entity({ name: 'artist' })
export class Artist {
  @PrimaryGeneratedColumn()
  artistId: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ nullable: true })
  birthDate: Date

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  image: string

  @OneToMany(() => Album, (album: Album) => album.artist)
  albums: Album[]
}
