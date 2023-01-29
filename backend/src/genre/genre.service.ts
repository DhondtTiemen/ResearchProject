import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
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
    const newGenre = this.genreRepository.create({ ...createGenreDto })
    return this.genreRepository.save(newGenre)
  }

  async updateGenre(updateGenreDto: UpdateGenreDto): Promise<Genre> {
    const updateGenre = this.genreRepository.create({
      ...updateGenreDto,
    })
    return this.genreRepository.save(updateGenre)
  }

  async removeGenreById(genreId: number): Promise<void> {
    await this.genreRepository.delete(genreId)
  }
}
