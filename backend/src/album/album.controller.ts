import { Controller, Body, Param, Get, Post, Put, Delete } from '@nestjs/common'

import { Album } from './entities/album.entity'
import { AlbumService } from './album.service'
import { CreateAlbumDto } from './dto/create-album.dto'
import { UpdateAlbumDto } from './dto/update-album.dto'

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get('id/:albumId')
  getAlbumById(@Param('albumId') albumId: number): Promise<Album> {
    return this.albumService.findAlbumById(albumId)
  }

  @Get('title/:title')
  getAlbumByTitle(@Param('title') title: string): Promise<Album> {
    return this.albumService.findAlbumByTitle(title)
  }

  @Get()
  getAlbum(): Promise<Album[]> {
    return this.albumService.findAlbums()
  }

  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumService.createAlbumByArtist(createAlbumDto)
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
