import { Injectable } from '@nestjs/common'

import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { Artist } from './entities/artist.entity'
import { CreateArtistDto } from './dto/create-artist.dto'
import { UpdateArtistDto } from './dto/update-artist.dto'

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  findArtistById(artistId: number): Promise<Artist> {
    return this.artistRepository.findOne({
      where: { artistId: artistId },
      relations: ['albums'],
    })
  }

  findArtistByArtistName(artistName: string): Promise<Artist> {
    const artist = artistName.replace('-', ' ')
    return this.artistRepository.findOne({
      where: { artistName: artist.toLowerCase() },
      relations: ['albums', 'albums.artist'],
    })
  }

  findArtists(): Promise<Artist[]> {
    return this.artistRepository.find({ relations: ['albums'] })
  }

  async findArtistsByPopular(): Promise<Artist[]> {
    const artists = await this.artistRepository
      .createQueryBuilder('artist')
      .innerJoin('artist.albums', 'albums')
      .select([
        'artist.artistId',
        'artist.artistName',
        'artist.firstName',
        'artist.lastName',
        'artist.image',
        'artist.description',
        'artist.birthDate',
        'artist.popular',
        'albums.albumId',
        'albums.title',
      ])
      .where('artist.popular = :boolean', { boolean: true })
      .getMany()
    return artists
  }

  createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = new Artist()
    newArtist.artistName = createArtistDto.artistName
    newArtist.firstName = createArtistDto.firstName
    newArtist.lastName = createArtistDto.lastName
    newArtist.birthDate = createArtistDto.birthDate
    newArtist.description = createArtistDto.description
    newArtist.image = createArtistDto.image

    return this.artistRepository.save(newArtist)
  }

  updateArtist(updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const update = new Artist()
    update.artistId = updateArtistDto.artistId
    update.artistName = updateArtistDto.artistName
    update.firstName = updateArtistDto.firstName
    update.lastName = updateArtistDto.lastName
    update.birthDate = updateArtistDto.birthDate
    update.description = updateArtistDto.description
    update.image = updateArtistDto.image

    return this.artistRepository.save(update)
  }

  async removeArtistById(artistId: number): Promise<void> {
    await this.artistRepository.delete(artistId)
  }
}
