import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { typeOrmConfig } from './bootstrap/typeORMConfig'

import { ArtistModule } from './artist/artist.module'
import { AlbumModule } from './album/album.module'
import { TrackModule } from './track/track.module'
import { GenreModule } from './genre/genre.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ArtistModule,
    AlbumModule,
    TrackModule,
    GenreModule,
    OrderModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
