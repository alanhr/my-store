import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Product } from './product.entity'

@ObjectType()
export class ShoppingCartProduct {
  @Field(() => Int)
  quantity: number

  @Field(() => Product)
  product: Product
}
