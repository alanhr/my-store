import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Generated } from 'typeorm'
import { BaseModel } from './base.model'
import { ShoppingCartProduct } from './shopping-cart-product.model'

@Entity()
export class ShoppingCart extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Generated('uuid')
  externalId: string

  @OneToMany(() => ShoppingCartProduct, (shoppingCartProduct) => shoppingCartProduct.shoppingCart)
  shoppingCartProducts: ShoppingCartProduct[]
}
