import { Injectable } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { ShoppingCartProduct } from '../models/shopping-cart-product.model'

@EntityRepository(ShoppingCartProduct)
@Injectable()
export class ShoppingCartProductRepository extends Repository<ShoppingCartProduct> {}
