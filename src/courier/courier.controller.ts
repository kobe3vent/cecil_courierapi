import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Courier } from 'src/db/tables/courier.table';
import { DeleteResult } from 'typeorm';
import { CourierService } from './courier.service';
import { NewCourier, QueryCourier, UpdateCourier } from './courier.types';
@Controller('couriers')
export class CourierController {
  constructor(private readonly courier_service: CourierService) {}

  @Post('/')
  async createCourier(@Body() new_courier_data: NewCourier): Promise<Courier> {
    return this.courier_service.createCourier(new_courier_data);
  }
  @Get('/lookup')
  async findCouriers(@Query() query?: QueryCourier): Promise<Courier[]> {
    return this.courier_service.findCouriers(query);
  }

  @Put('/') // BONUS GOAL 1: allowing courier capacity to be updated on the go.
  async updateCourier(@Body() update_data: UpdateCourier): Promise<Courier> {
    return this.courier_service.updateCourier(update_data);
  }

  @Delete('/:id')
  async deleteCourier(@Param() param: { id: number }): Promise<DeleteResult> {
    const { id } = param;
    if (isNaN(id)) throw new BadRequestException(`invalid delete input`);
    return this.courier_service.deleteCourier(id);
  }
}
