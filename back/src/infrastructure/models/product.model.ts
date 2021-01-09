import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseModel } from './base.model'
import { Category } from './category.model'
import { ShoppingCartProduct } from './shopping-cart-product.model'

@Entity()
export class Product extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: 'decimal' })
  price: number

  @Column()
  image: string

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category

  @OneToMany(() => ShoppingCartProduct, (shoppingCartProduct) => shoppingCartProduct.shoppingCart)
  shoppingCartProducts: ShoppingCartProduct[]
}
