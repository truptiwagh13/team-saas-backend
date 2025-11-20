import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './task.model';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';
import { User } from '../users/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Task, User])],
  providers: [TasksResolver, TasksService],
})
export class TasksModule {}
