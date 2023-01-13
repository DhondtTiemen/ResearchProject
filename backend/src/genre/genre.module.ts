import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Genre } from './entities/genre.entity'
import { GenreService } from './genre.service'
import { GenreController } from './genre.controller'

import { Album } from 'src/album/entities/album.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Genre, Album])],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}
