import { InfrastructureModule } from '@infrastructure/infrastrucuture.module';
import { Module } from '@nestjs/common'
import { ProductsService } from './services/product.service';

@Module({
  imports: [
    InfrastructureModule
  ],
  providers:[ProductsService],
  exports:[ProductsService]
})
export class DomainModule {}
