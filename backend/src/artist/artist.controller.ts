import { Controller, Body, Param, Get, Post, Put, Delete } from '@nestjs/common'

import { Artist } from './entities/artist.entity'
import { ArtistService } from './artist.service'

import { CreateArtistDto } from './dto/create-artist.dto'
import { UpdateArtistDto } from './dto/update-artist.dto'

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get('artistId/:artistId')
  getArtistById(@Param('artistId') artistId: number): Promise<Artist> {
    return this.artistService.findArtistById(artistId)
  }

  @Get('artistName/:artistName')
  getArtistByArtistName(
    @Param('artistName') artistName: string,
  ): Promise<Artist> {
    return this.artistService.findArtistByArtistName(artistName)
  }

  @Get()
  getArtists(): Promise<Artist[]> {
    return this.artistService.findArtists()
  }

  @Get('popular')
  getArtistByPopular(): Promise<Artist[]> {
    return this.artistService.findArtistsByPopular()
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
