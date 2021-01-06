import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { ProductModel } from './product.model'

@Entity()
export class CategoryModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => ProductModel, (product) => product.category)
  products: ProductModel[]
}
