import { Injectable } from '@nestjs/common'

import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { Track } from './entities/track.entity'
import { CreateTrackDto } from './dto/create-track.dto'
import { UpdateTrackDto } from './dto/update-track.dto'

import { Album } from 'src/album/entities/album.entity'

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,

    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  findTrackById(trackId: number): Promise<Track> {
    return this.trackRepository.findOneBy({ trackId })
  }

  findTracks(): Promise<Track[]> {
    return this.trackRepository.find()
  }

  async createTrackByAlbum(createTrackDto: CreateTrackDto): Promise<Track> {
    const albumId = createTrackDto.albumId
    const album = await this.albumRepository.findOneBy({ albumId })

    const newTrack = this.trackRepository.create({ ...createTrackDto, album })
    return this.trackRepository.save(newTrack)
  }

  async updateTrack(updateTrackDto: UpdateTrackDto) {
    const update = new Track()
    update.trackId = updateTrackDto.trackId
    update.trackNumber = updateTrackDto.trackNumber
    update.title = updateTrackDto.title

    const albumId = updateTrackDto.albumId
    const album = await this.albumRepository.findOneBy({ albumId })

    const updateTrack = this.trackRepository.create({
      ...updateTrackDto,
      album,
    })
    return this.trackRepository.save(updateTrack)
  }

  async removeTrackById(trackId: number): Promise<void> {
    await this.trackRepository.delete(trackId)
  }
}
