import { IsDecimal, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Category } from './category.entity';

export class Product {
  // tslint:disable-next-line: variable-name
  readonly id?: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDecimal({force_decimal:true,locale:'pt-BR'})
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  image: string;

  @ValidateNested()
  category: Category

}
