import { Controller, Body, Param, Get, Post, Put, Delete } from '@nestjs/common'

import { Artist } from './entities/artist.entity'
import { ArtistService } from './artist.service'
import { CreateArtistDto } from './dto/create-artist.dto'
import { UpdateArtistDto } from './dto/update-artist.dto'

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get(':artistId')
  getArtistById(@Param('artistId') artistId: number): Promise<Artist> {
    return this.artistService.findArtistById(artistId)
  }

  @Get('artistName/:artistName')
  getArtistByArtistName(
    @Param('artistName') artistName: string,
  ): Promise<Artist> {
    return this.artistService.findArtistByArtistName(artistName)
  }

  @Get('firstName/:firstName')
  getArtistByFirstName(@Param('firstName') firstName: string): Promise<Artist> {
    return this.artistService.findArtistByFirstName(firstName)
  }

  @Get('lastName/:lastName')
  getArtistByLastName(@Param('lastName') lastName: string): Promise<Artist> {
    return this.artistService.findArtistByLastName(lastName)
  }

  @Get()
  getArtists(): Promise<Artist[]> {
    return this.artistService.findArtists()
  }

  @Post()
  createArtist(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistService.createArtist(createArtistDto)
  }

  @Put()
  updateArtist(@Body() updateArtistDto: UpdateArtistDto): Promise<Artist> {
    return this.artistService.updateArtist(updateArtistDto)
  }

  @Delete(':artistId')
  async deleteArtistById(@Param('artistId') artistId: number) {
    await this.artistService.removeArtistById(artistId)
  }
}
