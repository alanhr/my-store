import { Module } from '@nestjs/common'
import { DatabaseModule } from '@infrastructure/database/database.module'
import { ShoppingCartRepository } from './repositores/shopping-cart.repository'
import { ProductRepository } from './repositores/product.repository'

@Module({
  imports: [DatabaseModule],
  providers: [ShoppingCartRepository, ProductRepository],
  exports: [ShoppingCartRepository, ProductRepository],
})
export class InfrastructureModule {}
