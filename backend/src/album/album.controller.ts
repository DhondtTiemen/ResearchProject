import { Controller, Body, Param, Get, Post, Put, Delete } from '@nestjs/common'

import { Album } from './entities/album.entity'
import { AlbumService } from './album.service'
import { CreateAlbumDto } from './dto/create-album.dto'
import { UpdateAlbumDto } from './dto/update-album.dto'

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get(':albumId')
  getAlbumById(@Param('albumId') albumId: number): Promise<Album> {
    return this.albumService.findAlbumById(albumId)
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

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.albumService.remove(+id)
  // }
}
