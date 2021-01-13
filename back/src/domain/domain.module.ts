import { InfrastructureModule } from '@infrastructure/infrastrucuture.module';
import { Module } from '@nestjs/common'
import { ProductsService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';

@Module({
  imports: [
    InfrastructureModule,
  ],
  providers:[ProductsService, ShoppingCartService],
  exports: [ProductsService, ShoppingCartService]
})
export class DomainModule {}
