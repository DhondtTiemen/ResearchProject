import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { Artist } from './entities/artist.entity'
import { ArtistService } from './artist.service'

import { CreateArtistInput } from './dto/create-artist.input'
import { UpdateArtistInput } from './dto/update-artist.input'

@Resolver(() => Artist)
export class ArtistResolver {
  constructor(private readonly artistService: ArtistService) {}

  @Mutation(() => Artist)
  createArtist(
    @Args('createArtistInput') createArtistInput: CreateArtistInput,
  ): Promise<Artist> {
    return this.artistService.create(createArtistInput)
  }

  @Query(() => [Artist], { name: 'artists' })
  findAll(): Promise<Artist[]> {
    return this.artistService.findAll()
  }

  @Query(() => Artist, { name: 'artist' })
  findOne(
    @Args('artistId', { type: () => Int }) artistId: number,
  ): Promise<Artist> {
    return this.artistService.findOne(artistId)
  }

  @Mutation(() => Artist)
  updateArtist(
    @Args('updateArtistInput') updateArtistInput: UpdateArtistInput,
  ): Promise<Artist> {
    return this.artistService.update(updateArtistInput)
  }

  @Mutation(() => Artist)
  removeArtist(@Args('artistId') artistId: number) {
    return this.artistService.remove(artistId)
  }
}
