import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { ObjectType, Field } from '@nestjs/graphql'

@Entity()
@ObjectType({ description: 'artist' })
export class Artist {
  @PrimaryGeneratedColumn()
  @PrimaryColumn()
  artistId: number

  @Field()
  @Column()
  firstName: string

  @Field()
  @Column()
  lastName: string

  @Field()
  @Column()
  birthDate: string

  @Field()
  @Column()
  description: string

  @Field()
  @Column()
  image: string
}
