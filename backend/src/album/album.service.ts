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
      relations: ['tracks', 'genres', 'artist', 'orders', 'users'],
    })
  }

  async findAlbumByAlbumTitle(inputAlbumTitle: string): Promise<Album[]> {
    const title = inputAlbumTitle.replace('-', ' ')
    const albums = await this.albumRepository
      .createQueryBuilder('album')
      .innerJoin('album.artist', 'artist')
      .select([
        'album.albumId',
        'album.title',
        'album.releaseDate',
        'album.popular',
        'album.image',
        'artist.artistName',
        'artist.firstName',
        'artist.lastName',
      ])
      .where('album.title = :albumTitle', { albumTitle: title.toLowerCase() })
      .getMany()
    return albums
  }

  async findAlbumByYear(inputYear: number): Promise<Album[]> {
    const albums = await this.albumRepository
      .createQueryBuilder('album')
      .innerJoin('album.artist', 'artist')
      .select([
        'album.albumId',
        'album.title',
        'album.releaseDate',
        'album.popular',
        'album.image',
        'artist.artistName',
        'artist.firstName',
        'artist.lastName',
      ])
      .where('year(album.releaseDate) = :year', { year: inputYear })
      .getMany()
    return albums
  }

  async findAlbumByPopular(): Promise<Album[]> {
    const albums = await this.albumRepository
      .createQueryBuilder('album')
      .innerJoin('album.artist', 'artist')
      .select([
        'album.albumId',
        'album.title',
        'album.releaseDate',
        'album.popular',
        'album.image',
        'artist.artistName',
        'artist.firstName',
        'artist.lastName',
      ])
      .where('album.popular = :boolean', { boolean: true })
      .getMany()
    return albums
  }

  async findAlbums(): Promise<Album[]> {
    const albums = await this.albumRepository
      .createQueryBuilder('album')
      .innerJoin('album.artist', 'artist')
      .select([
        'album.albumId',
        'album.title',
        'album.releaseDate',
        'album.popular',
        'album.image',
        'artist.artistName',
        'artist.firstName',
        'artist.lastName',
      ])
      .getMany()
    return albums
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const artistId = createAlbumDto.artistId
    const artist = await this.artistRepository.findOneBy({ artistId })

    const newAlbum = this.albumRepository.create({ ...createAlbumDto, artist })
    return this.albumRepository.save(newAlbum)
  }

  async updateAlbum(updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    // const update = new Album()
    // update.albumId = updateAlbumDto.albumId
    // update.title = updateAlbumDto.title
    // update.price = updateAlbumDto.price

    // const artistId = updateAlbumDto.artistId
    // const artist = await this.artistRepository.findOneBy({ artistId })

    // console.log(updateAlbumDto)

    const updateAlbum = this.albumRepository.create({
      ...updateAlbumDto,
      // artist,
    })
    return this.albumRepository.save(updateAlbum)
  }

  async removeAlbumById(albumId: number): Promise<void> {
    await this.albumRepository.delete(albumId)
  }
}
