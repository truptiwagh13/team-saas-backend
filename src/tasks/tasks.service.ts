import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { CreateTaskInput } from './dto/create-task.input';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskModel: typeof Task) {}

  async findAllForUser(userId: number) {
    return this.taskModel.findAll({ where: { userId } });
  }

async createTask(input: CreateTaskInput, userId: number) {
  return this.taskModel.create({
    title: input.title,
description: input.description ?? null,

    userId,
  });
}



  async toggleTask(userId: number, id: number) {
    const task = await this.taskModel.findByPk(id);
    if (!task || task.userId !== userId) {
      throw new ForbiddenException();
    }
    task.completed = !task.completed;
    return task.save();
  }

  async deleteTask(userId: number, id: number) {
    const task = await this.taskModel.findByPk(id);
    if (!task || task.userId !== userId) {
      throw new ForbiddenException();
    }
    await task.destroy();
    return true;
  }
}
