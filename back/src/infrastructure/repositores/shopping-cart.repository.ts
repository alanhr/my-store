import { Injectable } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { ShoppingCart } from '../models/shopping-cart.model'

@EntityRepository(ShoppingCart)
export class ShoppingCartRepository extends Repository<ShoppingCart> {}
