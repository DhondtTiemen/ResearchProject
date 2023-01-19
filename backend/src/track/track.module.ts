import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Track } from './entities/track.entity'
import { TrackService } from './track.service'
import { TrackController } from './track.controller'

import { Album } from 'src/album/entities/album.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Album, Track])],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
