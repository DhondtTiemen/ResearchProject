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

  findArtists(): Promise<Artist[]> {
    return this.artistRepository.find({ relations: ['albums'] })
  }

  createArtist(createArtistInput: CreateArtistDto): Promise<Artist> {
    const newArtist = new Artist()
    newArtist.firstName = createArtistInput.firstName
    newArtist.lastName = createArtistInput.lastName
    // a.birthDate = createArtistInput.birthDate
    // a.description = createArtistInput.description
    // a.image = createArtistInput.image

    return this.artistRepository.save(newArtist)
  }

  updateArtist(updateArtistInput: UpdateArtistDto): Promise<Artist> {
    const update = new Artist()
    update.artistId = updateArtistInput.artistId
    update.firstName = updateArtistInput.firstName
    update.lastName = updateArtistInput.lastName
    // update.birthDate = updateArtistInput.birthDate
    // update.description = updateArtistInput.description
    // update.image = updateArtistInput.image

    return this.artistRepository.save(update)
  }

  async removeArtistById(artistId: number): Promise<void> {
    await this.artistRepository.delete(artistId)
  }
}
