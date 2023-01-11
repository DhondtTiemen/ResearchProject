import { Injectable } from '@nestjs/common'

import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { Album } from './entities/album.entity'
import { CreateAlbumDto } from './dto/create-album.dto'
import { UpdateAlbumDto } from './dto/update-album.dto'

import { Artist } from 'src/artist/entities/artist.entity'

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,

    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  findAlbumById(albumId: number): Promise<Album> {
    return this.albumRepository.findOne({
      where: { albumId: albumId },
      relations: ['tracks'],
    })
  }

  findAlbumByTitle(title: string): Promise<Album> {
    return this.albumRepository.findOne({
      where: { title: title },
      relations: ['tracks'],
    })
  }

  findAlbums(): Promise<Album[]> {
    return this.albumRepository.find({ relations: ['tracks'] })
  }

  async createAlbumByArtist(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const artistId = createAlbumDto.artistId
    const artist = await this.artistRepository.findOneBy({ artistId })

    const newAlbum = this.albumRepository.create({ ...createAlbumDto, artist })
    return this.albumRepository.save(newAlbum)
  }

  async updateAlbum(updateAlbumDto: UpdateAlbumDto) {
    const update = new Album()
    update.albumId = updateAlbumDto.albumId
    update.title = updateAlbumDto.title
    update.price = updateAlbumDto.price

    const artistId = updateAlbumDto.artistId
    const artist = await this.artistRepository.findOneBy({ artistId })

    const updateAlbum = this.albumRepository.create({
      ...updateAlbumDto,
      artist,
    })
    return this.albumRepository.save(updateAlbum)
  }

  async removeAlbumById(albumId: number): Promise<void> {
    await this.albumRepository.delete(albumId)
  }
}
