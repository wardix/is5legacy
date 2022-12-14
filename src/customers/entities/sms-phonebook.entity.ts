import {
  BaseEntity,
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'sms_phonebook', synchronize: false })
export class SMSPhonebook extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  phone: string;

  @Column()
  name: string;

  @Column()
  custId: string;

  @Column()
  billing: boolean;

  @Column()
  technical: boolean;

  @CreateDateColumn()
  insertTime: Date;

  @Column()
  insertBy: string;
}
