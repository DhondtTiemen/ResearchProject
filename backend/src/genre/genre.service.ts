import { Injectable } from '@nestjs/common'

import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { Genre } from './entities/genre.entity'
import { CreateGenreDto } from './dto/create-genre.dto'
import { UpdateGenreDto } from './dto/update-genre.dto'
import { Album } from 'src/album/entities/album.entity'

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,

    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async findGenreById(genreId: number): Promise<any> {
    return this.genreRepository.findOne({
      where: { genreId: genreId },
      relations: ['albums', 'albums.artist'],
    })
  }

  findGenreByGenreName(genreName: string): Promise<Genre> {
    return this.genreRepository.findOne({
      where: { name: genreName },
      relations: ['albums', 'albums.artist'],
    })
  }

  findGenres(): Promise<Genre[]> {
    return this.genreRepository.find({ relations: ['albums'] })
  }

  async createGenre(createGenreDto: CreateGenreDto): Promise<Genre> {
    // const newGenre = new Genre()
    // newGenre.name = createGenreDto.name
    // newGenre.image = createGenreDto.image

    // return this.genreRepository.save(newGenre)

    const newGenre = this.genreRepository.create({ ...createGenreDto })
    return this.genreRepository.save(newGenre)
  }

  async updateGenre(updateGenreDto: UpdateGenreDto): Promise<Genre> {
    // let albums: Album[] = []

    // for (let item of updateGenreDto.albums) {
    //   console.log(item)
    //   const album = await this.albumRepository.findOneBy({
    //     albumId: item.albumId,
    //   })
    //   albums.push(album)
    // }

    // const update = new Genre()
    // update.genreId = updateGenreDto.genreId
    // update.name = updateGenreDto.name
    // update.image = updateGenreDto.image
    // update.albums = updateGenreDto.albums

    console.log(updateGenreDto)

    const updateGenre = this.genreRepository.create({
      ...updateGenreDto,
      // albums,
    })
    return this.genreRepository.save(updateGenre)
  }

  async removeGenreById(genreId: number): Promise<void> {
    await this.genreRepository.delete(genreId)
  }
}
