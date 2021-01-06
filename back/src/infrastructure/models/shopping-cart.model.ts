import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Generated } from 'typeorm'
import { ShoppingCartProductModel } from './shopping-cart-product.model'

@Entity()
export class ShoppingCartModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Generated('uuid')
  uuid: string

  @OneToMany(() => ShoppingCartProductModel, (shoppingCartProduct) => shoppingCartProduct.shoppingCart)
  shoppingCartProducts: ShoppingCartProductModel[]
}
