import { Album } from 'src/album/entities/album.entity'

export class CreateGenreDto {
  name: string
  image: string
  albums: Album[]
}
