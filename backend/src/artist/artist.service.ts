import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Artist } from './entities/artist.entity'

import { CreateArtistInput } from './dto/create-artist.input'
import { UpdateArtistInput } from './dto/update-artist.input'
import { Query } from '@nestjs/graphql'

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  create(createArtistInput: CreateArtistInput): Promise<Artist> {
    const a = new Artist()
    a.firstName = createArtistInput.firstName
    a.lastName = createArtistInput.lastName
    a.birthDate = createArtistInput.birthDate
    a.description = createArtistInput.description
    a.image = createArtistInput.image

    return this.artistRepository.save(a)
  }

  @Query(() => [Artist], { name: 'artists' })
  findAll(): Promise<Artist[]> {
    return this.artistRepository.find()
  }

  findOne(artistId: number): Promise<Artist> {
    return this.artistRepository.findOneBy({ artistId })
  }

  update(updateArtistInput: UpdateArtistInput): Promise<Artist> {
    const update = new Artist()
    update.artistId = updateArtistInput.artistId
    update.firstName = updateArtistInput.firstName
    update.lastName = updateArtistInput.lastName
    update.birthDate = updateArtistInput.birthDate
    update.description = updateArtistInput.description
    update.image = updateArtistInput.image

    return this.artistRepository.save(update)
  }

  async remove(artistId: number): Promise<void> {
    await this.artistRepository.delete(artistId)
  }
}
