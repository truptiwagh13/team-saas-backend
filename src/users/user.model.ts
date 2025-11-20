import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import { Task } from 'src/tasks/task.model';
import { ObjectType, Field, Int } from '@nestjs/graphql';

export interface UserCreationAttrs {
  name: string;
  email: string;
  password: string;
}

@ObjectType()
@Table({ tableName: 'Users' })
export class User extends Model<User, UserCreationAttrs> {
  @Field(() => Int)
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Field()
  @Column
  declare name: string;

  @Field()
  @Column
  declare email: string;

  @Column
  declare password: string;

  @HasMany(() => Task)
  declare tasks: Task[];
}
