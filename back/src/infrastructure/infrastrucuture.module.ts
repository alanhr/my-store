import { Module } from '@nestjs/common'
import { DatabaseModule } from '@infrastructure/database/database.module'
import { ShoppingCartRepository } from './repositores/shopping-cart.repository'
import { ProductRepository } from './repositores/product.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ShoppingCartProductRepository } from './repositores/shopping-cart-product.repository'
import { CategoryRepository } from './repositores/category.repository'

@Module({
  imports: [
    DatabaseModule, 
    TypeOrmModule.forFeature([ShoppingCartRepository, ProductRepository,ShoppingCartProductRepository,CategoryRepository])
  ],
  exports: [TypeOrmModule],
})
export class InfrastructureModule {}
