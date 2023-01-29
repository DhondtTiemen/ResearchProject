import { Controller, Body, Param, Get, Post, Put, Delete } from '@nestjs/common'

import { Album } from './entities/album.entity'
import { AlbumService } from './album.service'

import { CreateAlbumDto } from './dto/create-album.dto'
import { UpdateAlbumDto } from './dto/update-album.dto'

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get('albumId/:albumId')
  getAlbumById(@Param('albumId') albumId: number): Promise<Album> {
    return this.albumService.findAlbumById(albumId)
  }

  @Get('albumTitle/:albumTitle')
  getAlbumByAlbumTitle(
    @Param('albumTitle') albumTitle: string,
  ): Promise<Album[]> {
    return this.albumService.findAlbumByAlbumTitle(albumTitle)
  }

  @Get()
  getAlbum(): Promise<Album[]> {
    return this.albumService.findAlbums()
  }

  @Get('popular')
  getAlbumPopular(): Promise<Album[]> {
    return this.albumService.findAlbumByPopular()
  }

  @Get('preorder')
  getAlbumPreOrder(): Promise<Album[]> {
    return this.albumService.findAlbumByPreOrder()
  }

  @Get('year/:year')
  getAlbumByYear(@Param('year') year: number): Promise<Album[]> {
    return this.albumService.findAlbumByYear(year)
  }

  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumService.createAlbum(createAlbumDto)
  }

  @Put()
  updateAlbum(@Body() updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    return this.albumService.updateAlbum(updateAlbumDto)
  }

  @Delete(':albumId')
  async deleteAlbumById(@Param('albumId') albumId: number) {
    return this.albumService.removeAlbumById(albumId)
  }
}
