import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Artist } from './entities/artist.entity'
import { ArtistService } from './artist.service'
import { ArtistController } from './artist.controller'

import { Album } from 'src/album/entities/album.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Album])],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
