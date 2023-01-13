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

  findGenreById(genreId: number): Promise<Genre> {
    return this.genreRepository.findOne({
      where: { genreId: genreId },
      relations: ['albums'],
    })
  }

  async findGenres(): Promise<Genre[]> {
    return this.genreRepository.find({ relations: ['albums'] })
  }

  createGenre(createGenreDto: CreateGenreDto): Promise<Genre> {
    const newGenre = new Genre()
    newGenre.name = createGenreDto.name
    newGenre.image = createGenreDto.image

    return this.genreRepository.save(newGenre)
    // this.createGenreToAlbum(genre)
  }

  //   async createGenreToAlbum(newGenre: Genre): Promise<Genre> {
  //     const genre = await this.genreRepository.findOne({ where: { genreId: newGenre.genreId }})
  //     const album = await this.albumRepository.findOne({ where: { albumId: newGenre.albumId }})
  //   }

  //   async addUserToGroup(userId: number, groupId: number) {
  //     const user = await this.userRepository.findOne(userId);
  //     const group = await this.groupRepository.findOne(groupId);
  //     user.groups = [...user.groups, group];
  //     await this.userRepository.save(user);
  // }

  // async removeUserFromGroup(userId: number, groupId: number) {
  //     const user = await this.userRepository.findOne(userId);
  //     user.groups = user.groups.filter(group => group.id !== groupId);
  //     await this.userRepository.save(user);
  // }

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
