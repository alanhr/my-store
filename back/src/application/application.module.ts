import { DomainModule } from '@domain/domain.module'
import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { ProductsResolver } from './resolvers/products.resolver'
import { ShoppingCartResolver } from './resolvers/shopping-cart.resolver'

@Module({
  imports: [
    DomainModule,
    MulterModule.register({
      dest: './upload',
    }),
  ],
  providers: [ProductsResolver, ShoppingCartResolver],
  exports: [ProductsResolver, ShoppingCartResolver],
})
export class ApplicationModule {}
