import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class NewCourier {
  @IsNotEmpty()
  @IsNumber()
  max_capacity: number;

  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class CreateNewCourier extends NewCourier {
  constructor(readonly courier: NewCourier) {
    super();
    this.id = courier.id;
    this.max_capacity = courier.max_capacity;
    return this;
  }
}

export class QueryCourier {
  @IsOptional()
  capacity_required?: number;

  @IsOptional()
  id?: number;
}

export class CreateQueryCourier extends QueryCourier {
  constructor(readonly query: QueryCourier) {
    super();
    this.id = query?.id;
    this.capacity_required = query?.capacity_required;
    return this;
  }
}

export class UpdateCourier {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  remove_item?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  add_item?: number;

  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class CreateUpdateCourier extends UpdateCourier {
  constructor(readonly updateParams: UpdateCourier) {
    super();
    this.id = updateParams.id;
    this.add_item = updateParams?.add_item;
    this.remove_item = updateParams?.remove_item;
    return this;
  }
}
