import { Controller, Body, Param, Get, Post, Put, Delete } from '@nestjs/common'

import { Genre } from './entities/genre.entity'
import { GenreService } from './genre.service'
import { CreateGenreDto } from './dto/create-genre.dto'
import { UpdateGenreDto } from './dto/update-genre.dto'

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get(':genreId')
  findOne(@Param('genreId') genreId: number): Promise<Genre> {
    return this.genreService.findGenreById(genreId)
  }

  @Get()
  getGenre(): Promise<Genre[]> {
    return this.genreService.findGenres()
  }

  @Post()
  create(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genreService.createGenre(createGenreDto)
  }

  @Put()
  update(@Body() updateGenreDto: UpdateGenreDto): Promise<Genre> {
    return this.genreService.updateGenre(updateGenreDto)
  }

  @Delete(':genreId')
  async deleteGenreById(@Param('genreId') genreId: number) {
    return this.genreService.removeGenreById(genreId)
  }
}
