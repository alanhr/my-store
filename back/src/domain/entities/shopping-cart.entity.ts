import { IsUUID, IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ShoppingCartProduct } from './shopping-cart-product.entity';

export class ShoppingCart {
  @IsUUID()
  @IsNotEmpty()
  externalId: string;

  @IsInt()
  @IsNotEmpty()
  total: number;

  @ValidateNested()
  items: ShoppingCartProduct[] = []

}
