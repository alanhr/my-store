import { DomainModule } from '@domain/domain.module'
import { Module } from '@nestjs/common'
import { ProductsResolver } from './resolvers/products.resolver'

@Module({
  imports: [DomainModule],
  providers:[ProductsResolver],
  exports:[ProductsResolver]
})
export class ApplicationModule {}
