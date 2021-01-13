import { EntityRepository, Repository } from 'typeorm'
import { ShoppingCartProduct } from '../models/shopping-cart-product.model'

@EntityRepository(ShoppingCartProduct)
export class ShoppingCartProductRepository extends Repository<ShoppingCartProduct> {

  public getProductsByShoppingCartExternalId(externalId: string): Promise<ShoppingCartProduct[]> {
    return this.createQueryBuilder('scp')
      .innerJoin('scp.shoppingCart', 'shopping_cart')
      .innerJoinAndSelect('scp.product', 'product')
      .where('shopping_cart.externalId= :externalId', { externalId })
      .getMany()
  }

  public getProductByExternalIdAndProductId(externalId: string, productId:number): Promise<ShoppingCartProduct> {
    return this.createQueryBuilder('scp')
      .innerJoinAndSelect('scp.shoppingCart', 'shopping_cart')
      .innerJoinAndSelect('scp.product', 'product')
      .where('shopping_cart.externalId= :externalId', { externalId })
      .andWhere('product.id= :productId', { productId})
      .getOne()
  }
}
