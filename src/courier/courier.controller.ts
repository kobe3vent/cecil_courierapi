import {
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
import { NewCourier, QueryCourier, UpdateCourier } from './types';

@Controller('couriers')
export class CourierController {
  constructor(private readonly courier_service: CourierService) {}

  @Post('/')
  async createCourier(@Body() courier_data: NewCourier): Promise<Courier> {
    return this.courier_service.createCourier(courier_data);
  }
  @Get('/lookup')
  async findCouriers(@Query() query?: QueryCourier): Promise<Courier[]> {
    return this.courier_service.findCouriers(query);
  }

  @Put('/')
  async updateCourier(@Body() update_data: UpdateCourier): Promise<Courier> {
    return this.courier_service.updateCourier(update_data);
  }

  @Delete('/:id')
  async deleteCourier(@Param() id: number): Promise<DeleteResult> {
    return this.courier_service.deleteCourier(id);
  }
}
