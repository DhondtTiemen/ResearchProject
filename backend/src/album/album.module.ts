import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Album } from './entities/album.entity'
import { AlbumService } from './album.service'
import { AlbumController } from './album.controller'

import { Artist } from 'src/artist/entities/artist.entity'
import { Genre } from 'src/genre/entities/genre.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Album, Genre])],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
