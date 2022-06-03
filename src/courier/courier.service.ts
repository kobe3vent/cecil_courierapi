import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validateOrReject } from 'class-validator';
import {
  DeleteResult,
  FindManyOptions,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Courier } from '../db/tables/courier.table';
import {
  CreateNewCourier,
  CreateQueryCourier,
  CreateUpdateCourier,
  NewCourier,
  QueryCourier,
  UpdateCourier,
} from './courier.types';

const MAX_CAPACITY = 300;

@Injectable()
export class CourierService {
  constructor(
    @InjectRepository(Courier) private courier_repo: Repository<Courier>,
  ) {}

  async createCourier({ max_capacity, id }: NewCourier) {
    const input = new CreateNewCourier({ max_capacity, id });
    try {
      await validateOrReject(input);
    } catch (errors) {
      throw new BadRequestException(`invalid request input ${errors}`);
    }
    if (max_capacity > MAX_CAPACITY) {
      throw new BadRequestException(
        `max_capacity cannot exceed ${MAX_CAPACITY}`,
      );
    }
    const courier = await this.courier_repo.findOneBy({ id });
    if (courier) {
      throw new ConflictException(`Duplicate: Courier id ${id} exists`);
    }
    return await this.courier_repo.save({
      max_capacity,
      available_capacity: max_capacity,
      id,
    });
  }

  async findCouriers({ capacity_required }: QueryCourier): Promise<Courier[]> {
    const validateQuery = new CreateQueryCourier({ capacity_required });
    try {
      await validateOrReject(validateQuery);
    } catch (errors) {
      throw new BadRequestException(`invalid look up request input ${errors}`);
    }

    const query: FindManyOptions<Courier> = {};
    if (capacity_required) {
      query.where = {
        available_capacity: MoreThanOrEqual(capacity_required),
      };
    }
    const couriers = await this.courier_repo.find(query);
    return couriers;
  }

  async deleteCourier(id: number): Promise<DeleteResult> {
    return await this.courier_repo.delete({ id });
  }

  async updateCourier({ remove_item, add_item, id }: UpdateCourier) {
    const validateUpdateData = new CreateUpdateCourier({
      remove_item,
      add_item,
      id,
    });
    try {
      await validateOrReject(validateUpdateData);
    } catch (errors) {
      throw new BadRequestException(`invalid update request input ${errors}`);
    }

    const courier = await this.courier_repo.findOneBy({ id });
    if (!courier) {
      throw new NotFoundException(`Courier does not exist (id ${id})`);
    }
    let avaliable_capacity = courier.available_capacity;
    if (remove_item) {
      // available capacity cant exceed max capacity
      avaliable_capacity = Math.min(
        avaliable_capacity + remove_item,
        courier.max_capacity,
      );
    }
    if (add_item) {
      avaliable_capacity -= add_item;
    }
    if (avaliable_capacity < 0) {
      throw new BadRequestException(
        `courier capacity exceeded by an excess of ${avaliable_capacity} `,
      );
    }
    return this.courier_repo.save({
      ...courier,
      available_capacity: avaliable_capacity,
    });
  }
}
