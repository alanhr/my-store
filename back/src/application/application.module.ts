import { DomainModule } from '@domain/domain.module'
import { Module } from '@nestjs/common'
import { ProductsResolver } from './resolvers/products.resolver'
import { ShoppingCartResolver } from './resolvers/shopping-cart.resolver'

@Module({
  imports: [DomainModule],
  providers:[ProductsResolver, ShoppingCartResolver],
  exports: [ProductsResolver, ShoppingCartResolver]
})
export class ApplicationModule {}
