import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateArtistInput {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  birthDate: string

  @Field()
  description: string

  @Field()
  image: string
}
