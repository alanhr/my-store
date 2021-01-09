import { IsNotEmpty, IsString } from 'class-validator';

export class Category {
  @IsString()
  @IsNotEmpty()
  name: string;
}
