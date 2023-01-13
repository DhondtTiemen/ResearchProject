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

  // findArtistByFirstName(firstName: string): Promise<Artist> {
  //   return this.artistRepository.findOne({
  //     where: { firstName: firstName },
  //     relations: ['albums'],
  //   })
  // }

  // findArtistByLastName(lastName: string): Promise<Artist> {
  //   return this.artistRepository.findOne({
  //     where: { lastName: lastName },
  //     relations: ['albums'],
  //   })
  // }

  findArtists(): Promise<Artist[]> {
    return this.artistRepository.find({ relations: ['albums'] })
  }

  createArtist(createArtistInput: CreateArtistDto): Promise<Artist> {
    const newArtist = new Artist()
    newArtist.artistName = createArtistInput.artistName
    newArtist.firstName = createArtistInput.firstName
    newArtist.lastName = createArtistInput.lastName
    newArtist.birthDate = createArtistInput.birthDate
    newArtist.description = createArtistInput.description
    newArtist.image = createArtistInput.image

    return this.artistRepository.save(newArtist)
  }

  updateArtist(updateArtistInput: UpdateArtistDto): Promise<Artist> {
    const update = new Artist()
    update.artistId = updateArtistInput.artistId
    update.artistName = updateArtistInput.artistName
    update.firstName = updateArtistInput.firstName
    update.lastName = updateArtistInput.lastName
    update.birthDate = updateArtistInput.birthDate
    update.description = updateArtistInput.description
    update.image = updateArtistInput.image

    return this.artistRepository.save(update)
  }

  async removeArtistById(artistId: number): Promise<void> {
    await this.artistRepository.delete(artistId)
  }
}
