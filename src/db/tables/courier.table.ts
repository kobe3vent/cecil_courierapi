import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('couriers')
export class Courier {
  @PrimaryColumn()
  id: number;

  @Column()
  max_capacity: number;

  @Column()
  available_capacity: number;
}
