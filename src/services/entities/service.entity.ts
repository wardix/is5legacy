import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Services', { synchronize: false })
export class Services extends BaseEntity {
  @PrimaryGeneratedColumn()
  ServiceId: number;
}
