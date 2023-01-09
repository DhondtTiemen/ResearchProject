import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module'

import { typeOrmConfig } from './bootstrap/typeORMConfig'
import { graphqlConfig } from './bootstrap/graphQLConfig'

import { ArtistModule } from './artist/artist.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig),
    ArtistModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
