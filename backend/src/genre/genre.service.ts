import { Injectable } from '@nestjs/common'

import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { Genre } from './entities/genre.entity'
import { CreateGenreDto } from './dto/create-genre.dto'
import { UpdateGenreDto } from './dto/update-genre.dto'

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  findGenreById(genreId: number): Promise<Genre> {
    return this.genreRepository.findOne({
      where: { genreId: genreId },
      relations: ['albums'],
    })
  }

  findGenreByGenreName(genreName: string): Promise<Genre> {
    return this.genreRepository.findOne({
      where: { name: genreName },
      relations: ['albums'],
    })
  }

  findGenres(): Promise<Genre[]> {
    return this.genreRepository.find({ relations: ['albums'] })
  }

  createGenre(createGenreDto: CreateGenreDto): Promise<Genre> {
    const newGenre = new Genre()
    newGenre.name = createGenreDto.name
    newGenre.image = createGenreDto.image

    return this.genreRepository.save(newGenre)
  }

  async updateGenre(updateGenreDto: UpdateGenreDto): Promise<Genre> {
    const update = new Genre()
    update.genreId = updateGenreDto.genreId
    update.name = updateGenreDto.name
    update.image = updateGenreDto.image

    return this.genreRepository.save(update)
  }

  async removeGenreById(genreId: number): Promise<void> {
    await this.genreRepository.delete(genreId)
  }
}
