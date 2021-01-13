import { ShoppingCart } from '@domain/entities/shopping-cart.entity';
import { ShoppingCartProductRepository } from '@infrastructure/repositores/shopping-cart-product.repository';
import { ShoppingCartRepository } from '@infrastructure/repositores/shopping-cart.repository';
import { ShoppingCart as ShoppingCartModel } from '@infrastructure/models/shopping-cart.model';
import { Injectable } from '@nestjs/common'

@Injectable()
export class ShoppingCartService {
  constructor(private readonly shoppingCartRepository: ShoppingCartRepository, private readonly shoppingCartProductRepository: ShoppingCartProductRepository) {
  }

  public async addProduct(productId: number, cartExternalId?: string): Promise<ShoppingCart> {
    let cart: ShoppingCartModel

    if (!cartExternalId) {
      cart = await this.shoppingCartRepository.save({})
    } else {
      cart = await this.shoppingCartRepository.findOneOrFail({ externalId: cartExternalId })
    }

    const recoveryProductInCart = await this.shoppingCartProductRepository.getProductByExternalIdAndProductId(cart.externalId, productId)

    const newProductInCart = {
      quantity:1,
      shoppingCart: cart,
      product:{
        id: productId
      }
    }

    if (recoveryProductInCart) {
      recoveryProductInCart.quantity +=1
    }

    await this.shoppingCartProductRepository.save(recoveryProductInCart || newProductInCart)

    const shoppingCart = new ShoppingCart()

    shoppingCart.externalId = cart.externalId

    return shoppingCart
  }

  public async getProducts(cartExternalId: string): Promise<ShoppingCart> {
    const shoppingCartProducts = await this.shoppingCartProductRepository.getProductsByShoppingCartExternalId(cartExternalId)


    const shoppingCart = new ShoppingCart()
    shoppingCart.externalId = cartExternalId
    shoppingCart.items = shoppingCartProducts

    return shoppingCart
  }
}
