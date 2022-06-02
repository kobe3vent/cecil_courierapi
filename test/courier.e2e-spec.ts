import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Courier } from '../src/db/tables/courier.table';
import { Repository } from 'typeorm';
import { CourierController } from '../src/courier/courier.controller';
import { CourierService } from '../src/courier/courier.service';
import { ConfigModule } from '@nestjs/config';

let app: INestApplication;
let repository: Repository<Courier>;

beforeAll(async () => {
  const module = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5434,
        username: 'stuart',
        password: 'password',
        database: 'stuartTest',
        synchronize: true,
        autoLoadEntities: true,
      }),
      TypeOrmModule.forFeature([Courier]),
    ],
    controllers: [CourierController],
    providers: [CourierService],
  }).compile();

  app = module.createNestApplication();
  await app.init();
  repository = module.get(getRepositoryToken(Courier));
});

afterAll(async () => {
  await app.close();
});

describe('Create new courier => POST /courier', () => {
  afterEach(async () => {
    await repository.query(`DELETE FROM couriers;`);
  });

  it('should create new courier', () => {
    return request(app.getHttpServer())
      .post('/couriers')
      .send({ id: 1, max_capacity: 70 })
      .expect(201)
      .expect({ id: 1, max_capacity: 70, available_capacity: 70 });
  });

  it('should return 409 error on creating couriers with same id', async () => {
    await repository.save({ id: 1, max_capacity: 70, available_capacity: 70 });
    await request(app.getHttpServer())
      .post('/couriers')
      .send({ id: 1, max_capacity: 80, available_capacity: 80 })
      .expect(409);
  });
});

describe('GET /courier/lookup', () => {
  const COURIERS_LIST = [
    { id: 1, max_capacity: 70, available_capacity: 70 },
    { id: 2, max_capacity: 80, available_capacity: 80 },
    { id: 3, max_capacity: 90, available_capacity: 90 },
  ];
  beforeAll(async () => {
    await repository.save(COURIERS_LIST);
  });

  afterAll(async () => {
    await repository.query(`DELETE FROM couriers;`);
  });

  it('should return all couriers', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/couriers/lookup')
      .expect(200);

    expect(body).toEqual(COURIERS_LIST);
  });

  it('should return couriers with more or equal available capacity requested', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/couriers/lookup?capacity_required=85')
      .expect(200);

    expect(body).toEqual([{ id: 3, max_capacity: 90, available_capacity: 90 }]);
  });
});

describe('update Courier available capacity => PUT /courier', () => {
  beforeEach(async () => {
    await repository.save([
      { id: 1, max_capacity: 70, available_capacity: 30 },
    ]);
  });
  afterEach(async () => {
    await repository.query(`DELETE FROM couriers;`);
  });

  it('should increase avaliable capacity for courier', async () => {
    await request(app.getHttpServer())
      .put('/couriers')
      .send({ id: 1, remove_item: 10 })
      .expect(200)
      .expect({ id: 1, max_capacity: 70, available_capacity: 40 });
  });

  it('should decrease available capcity to courier', async () => {
    await request(app.getHttpServer())
      .put('/couriers')
      .send({ id: 1, add_item: 10 })
      .expect(200)
      .expect({
        id: 1,
        max_capacity: 70,
        available_capacity: 20,
      });
  });
});

describe('remove courier based on its ID => DELETE /courier', () => {
  it('should remove item from courier', async () => {
    await repository.save([
      { id: 1, max_capacity: 45, available_capacity: 45 },
    ]);
    await request(app.getHttpServer())
      .delete('/couriers/1')
      .expect(200)
      .expect({ raw: [], affected: 1 });
  });
});
