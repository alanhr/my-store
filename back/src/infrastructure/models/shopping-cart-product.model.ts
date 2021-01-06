import { Entity, Column, ManyToOne } from 'typeorm'
import { ProductModel } from './product.model'
import { ShoppingCartModel } from './shopping-cart.model'

@Entity()
export class ShoppingCartProductModel {
  @Column()
  quantity: number
  @ManyToOne(() => ProductModel, (product) => product.shoppingCartProducts, { primary: true })
  product: ProductModel
  @ManyToOne(() => ShoppingCartModel, (shoppingCart) => shoppingCart.shoppingCartProducts, { primary: true })
  shoppingCart: ShoppingCartModel
}
