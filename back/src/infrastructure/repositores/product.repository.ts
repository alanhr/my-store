import { Injectable } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { ProductModel } from '../models/product.model'

@EntityRepository()
@Injectable()
export class ProductRepository extends Repository<ProductModel> {}
