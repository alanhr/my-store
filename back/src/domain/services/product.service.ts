import { ProductRepository } from '@infrastructure/repositores/product.repository'
import { Injectable } from '@nestjs/common'
import { MoreThan } from 'typeorm'
import { Product } from '../entities/product.entity'

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      where: {
        quantity: MoreThan(0),
      },
    })
  }
}
