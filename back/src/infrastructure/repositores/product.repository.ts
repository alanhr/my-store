import { EntityRepository, Repository } from 'typeorm'
import { Product } from '../models/product.model'

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}
