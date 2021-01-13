import { IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { Product } from './product.entity';

export class ShoppingCartProduct {
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @ValidateNested()
  product: Product
}
