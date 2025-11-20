import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  BelongsTo,
} from 'sequelize-typescript';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../users/user.model';

export interface TaskAttributes {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  userId: number;
}

export interface TaskCreationAttributes {
  title: string;
  description?: string | null;
  userId: number;
}

@ObjectType()      // <<< REQUIRED FOR GRAPHQL
@Table({ tableName: 'Tasks' })
export class Task extends Model<TaskAttributes, TaskCreationAttributes> {
  @Field(() => Int)
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Field(() => String)
  @AllowNull(false)
  @Column(DataType.STRING)
  declare title: string;

  @Field(() => String, { nullable: true })
  @AllowNull(true)
  @Column(DataType.STRING)
  declare description: string | null;

  @Field(() => Boolean)
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare completed: boolean;

  @Field(() => Int)
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;
}
