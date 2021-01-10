import { InfrastructureModule } from '@infrastructure/infrastrucuture.module';
import { ProductRepository } from '@infrastructure/repositores/product.repository';
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductsService } from './services/product.service';

@Module({
  imports: [
    InfrastructureModule,
  ],
  providers:[ProductsService],
  exports:[ProductsService]
})
export class DomainModule {}
