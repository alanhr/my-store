import { ObjectType, Field, Int, ID } from '@nestjs/graphql'

@ObjectType()
export class Product {
  @Field(() => ID)
  id: number

  @Field()
  name: string

  @Field()
  price: string
}
