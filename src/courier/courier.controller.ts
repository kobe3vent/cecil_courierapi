import { Body, Controller, Get, Post } from '@nestjs/common';
import { Courier } from 'src/db/tables/courier.table';
import { CourierService } from './courier.service';
import { NewCourier } from './types';

@Controller('couriers')
export class CourierController {
  constructor(private readonly courier_service: CourierService) {}

  @Post('/')
  async createCourier(@Body() courier_data: NewCourier): Promise<Courier> {
    return this.courier_service.createCourier(courier_data);
  }
  @Get('/')
  async findCouriers(): Promise<Courier[]> {
    return this.courier_service.findCouriers();
  }
}
