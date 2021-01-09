import { Entity, Column, ManyToOne } from 'typeorm'
import { Product } from './product.model'
import { ShoppingCart } from './shopping-cart.model'

@Entity()
export class ShoppingCartProduct {
  @Column()
  quantity: number
  @ManyToOne(() => Product, (product) => product.shoppingCartProducts, { primary: true })
  product: Product
  @ManyToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.shoppingCartProducts, { primary: true })
  shoppingCart: ShoppingCart
}
