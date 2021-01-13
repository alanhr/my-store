import { ObjectType, Field, ID } from '@nestjs/graphql'
import { ShoppingCartProduct } from './shopping-cart-product.entity'

@ObjectType()
export class ShoppingCart {
  @Field(() => ID)
  id: string

  @Field(() => [ShoppingCartProduct])
  items: ShoppingCartProduct[]
}
