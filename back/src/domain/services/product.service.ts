import { ProductRepository } from '@infrastructure/repositores/product.repository';
import { Injectable } from '@nestjs/common'
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService { 
  constructor(private readonly productRepository: ProductRepository) {
  }
  
  public async findAll(): Promise<Product[]> {
    return this.productRepository.find()
  }
}
