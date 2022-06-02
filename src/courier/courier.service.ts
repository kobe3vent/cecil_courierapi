import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Courier } from '../db/tables/courier.table';
import { NewCourier } from './types';

@Injectable()
export class CourierService {
  constructor(
    @InjectRepository(Courier) private courier_repo: Repository<Courier>,
  ) {}

  async createCourier({ max_capacity, id }: NewCourier) {
    return await this.courier_repo.save({
      max_capacity,
      available_capacity: max_capacity,
      id,
    });
  }

  async findCouriers(): Promise<Courier[]> {
    const couriers = await this.courier_repo.find({});
    return couriers;
  }
}
