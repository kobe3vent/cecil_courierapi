import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class NewCourier {
  @IsNotEmpty()
  @IsNumber()
  max_capacity: number;

  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class QueryCourier {
  @IsOptional()
  @IsNumber()
  capacity_required?: number;

  @IsOptional()
  @IsNumber()
  id?: number;
}

export class UpdateCourier {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  readonly remove_item?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  readonly add_item?: number;

  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
}
