import { ShoppingCartProductRepository } from '@infrastructure/repositores/shopping-cart-product.repository';
import { ShoppingCartRepository } from '@infrastructure/repositores/shopping-cart.repository';
import { Injectable } from '@nestjs/common'

@Injectable()
export class SoppingCartService { 
  constructor(private readonly shoppingCartRepository: ShoppingCartRepository, private readonly shoppingCartProductRepository: ShoppingCartProductRepository) {
  }
  
  public async getAll(): Promise<any> {
    return this.shoppingCartRepository.create()
  }
}
