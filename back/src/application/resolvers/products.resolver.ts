import { Resolver, Query, ResolveField, Args, Parent } from '@nestjs/graphql'
import { format } from 'currency-formatter'
import { Product } from '../entities/product.entity'
import { ProductsService } from '@domain/services/product.service'
import { Product as ProductDomain } from '@domain/entities/product.entity'

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) { }

  @Query(() => [Product], { name: 'products' })
  async findAll() {
    return this.productsService.findAll()
  }

  @ResolveField()
  price(@Args('locale', { defaultValue: 'pt-BR' }) locale: string, @Parent() product: ProductDomain) {
    return format(product.price, { locale })
  }
}
