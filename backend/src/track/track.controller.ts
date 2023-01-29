import { Controller, Body, Param, Get, Post, Put, Delete } from '@nestjs/common'

import { Track } from './entities/track.entity'
import { TrackService } from './track.service'

import { CreateTrackDto } from './dto/create-track.dto'
import { UpdateTrackDto } from './dto/update-track.dto'

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get(':trackId')
  getTrackById(@Param('trackId') trackId: number): Promise<Track> {
    return this.trackService.findTrackById(trackId)
  }

  @Get()
  getTrack(): Promise<Track[]> {
    return this.trackService.findTracks()
  }

  @Post()
  createTrack(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return this.trackService.createTrackByAlbum(createTrackDto)
  }

  @Put()
  updateTrack(@Body() updateTrackDto: UpdateTrackDto): Promise<Track> {
    return this.trackService.updateTrack(updateTrackDto)
  }

  @Delete(':trackId')
  async deleteTrackById(@Param('trackId') trackId: number) {
    return this.trackService.removeTrackById(trackId)
  }
}
