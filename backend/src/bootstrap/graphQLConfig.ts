import { ApolloDriver } from '@nestjs/apollo'
import { GqlModuleOptions } from '@nestjs/graphql'

export const graphqlConfig: GqlModuleOptions = {
  driver: ApolloDriver,
  sortSchema: true,
  autoSchemaFile: true,
}
