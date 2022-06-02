/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { CourierController } from './courier.controller';
import { CourierService } from './courier.service';

describe('CourierController', () => {
  let controller: CourierController;

  let spyService: CourierService;
  const CourierServiceSpy = {
    provide: CourierService,
    useFactory: () => ({
      createCourier: jest.fn(() => {}),
      findCouriers: jest.fn(() => {}),
      deleteCourier: jest.fn(() => {}),
      updateCourier: jest.fn(() => {}),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourierController],
      providers: [CourierServiceSpy],
    }).compile();

    controller = module.get<CourierController>(CourierController);
    spyService = module.get<CourierService>(CourierService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call courierService.createCourier', async () => {
    const newCourier = { id: 1, max_capacity: 75 };
    controller.createCourier(newCourier);
    expect(spyService.createCourier).toHaveBeenCalledWith(newCourier);
    expect(spyService.createCourier).toHaveBeenCalledTimes(1);
  });

  it('should call courierService.findCouriers', async () => {
    const capacity_required = 30;
    controller.findCouriers({ capacity_required });
    expect(spyService.findCouriers).toHaveBeenCalledWith({ capacity_required });
  });

  it('should call courierService.updateCourier', async () => {
    const update_courier_data = { id: 1, add_item: 25 };
    controller.updateCourier(update_courier_data);
    expect(spyService.updateCourier).toHaveBeenCalledWith(update_courier_data);
    expect(spyService.updateCourier).toHaveBeenCalledTimes(1);
  });

  it('should call courierService.DeleteCourier', async () => {
    controller.deleteCourier({ id: 1 });
    expect(spyService.deleteCourier).toHaveBeenCalledTimes(1);
  });
});
