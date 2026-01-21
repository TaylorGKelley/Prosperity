import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { type UUID } from 'node:crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Transaction {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Field(() => String)
  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Field(() => Float)
  @Column({ type: 'float' })
  amount: number;
}
