import { IsNotEmpty, IsNumber } from 'class-validator';

export class NewCourier {
  @IsNotEmpty()
  @IsNumber()
  max_capacity: number;

  @IsNotEmpty()
  @IsNumber()
  id: number;
}
