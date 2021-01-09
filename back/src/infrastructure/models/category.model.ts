import { Entity, Column, PrimaryGeneratedColumn, OneToMany, } from 'typeorm'
import { BaseModel } from './base.model'
import { Product } from './product.model'

@Entity()
export class Category extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => Product, (product) => product.category)
  products: Product[]
}
