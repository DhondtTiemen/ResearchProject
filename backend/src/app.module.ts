import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module'
import { graphqlConfig } from './bootstrap/graphQLConfig'

import { typeOrmConfig } from './bootstrap/typeORMConfig'

import { ArtistModule } from './artist/artist.module'
import { AlbumModule } from './album/album.module'
import { TrackModule } from './track/track.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ArtistModule,
    AlbumModule,
    TrackModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
