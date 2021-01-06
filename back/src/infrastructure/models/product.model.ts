import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { CategoryModel } from './category.model'
import { ShoppingCartProductModel } from './shopping-cart-product.model'

@Entity()
export class ProductModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: 'decimal' })
  price: number

  @Column()
  image: string

  @ManyToOne(() => CategoryModel)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryModel

  @OneToMany(() => ShoppingCartProductModel, (shoppingCartProduct) => shoppingCartProduct.shoppingCart)
  shoppingCartProducts: ShoppingCartProductModel[]
}
