import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async createUser(data: { name: string; email: string; password: string }) {
    return this.userModel.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  async findById(id: number) {
    return this.userModel.findByPk(id);
  }
}
