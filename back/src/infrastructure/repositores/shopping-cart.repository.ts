import { Injectable } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { ShoppingCartModel } from '../models/shopping-cart.model'

@EntityRepository()
@Injectable()
export class ShoppingCartRepository extends Repository<ShoppingCartModel> {}
