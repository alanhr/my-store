import { Resolver, Query, ResolveField, Args, Parent, Mutation, ID } from '@nestjs/graphql'
import { ShoppingCartService } from '@domain/services/shopping-cart.service'
import { ShoppingCart as ShoppingCartDomain } from '@domain/entities/shopping-cart.entity'
import { ShoppingCart } from '@application/entities/shopping-cart.entity'
import { ShoppingCartProduct } from '@application/entities/shopping-cart-product.entity'

@Resolver(() => ShoppingCart)
export class ShoppingCartResolver {
  constructor(private readonly shoppingCartService: ShoppingCartService) { }

  @Mutation(() => ShoppingCart, { name: 'addProductInCart' })
  public async addProduct(
    @Args({ name: 'productId', type: () => ID }) productId?: number,
    @Args({ name: 'cartId', nullable: true, type: () => ID }) cardId?: string
  ) {
    return this.shoppingCartService.addProduct(productId, cardId)
  }

  @ResolveField()
  id(@Parent() shoppingCart: ShoppingCartDomain) {
    return shoppingCart.externalId
  }

  @ResolveField('items',() => [ShoppingCartProduct])
  async shoppingCartProduct(@Parent() shoppingCart: ShoppingCartDomain) {
    const shoppingCartProduct: ShoppingCartDomain = await this.shoppingCartService.getProducts(shoppingCart.externalId)

    return shoppingCartProduct.items
  }
}
