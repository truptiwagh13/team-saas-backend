import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
  import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(input: RegisterInput) {
    const existing = await this.usersService.findByEmail(input.email);
    if (existing) {
      throw new ConflictException('Email is already registered');
    }

    const hashed = await bcrypt.hash(input.password, 10);
    const user = await this.usersService.createUser({
      name: input.name,
      email: input.email,
      password: hashed,
    });

    const payload = { sub: user.id };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }

  async login(input: LoginInput) {
    const user = await this.usersService.findByEmail(input.email);
    console.log("USER FROM DB:", user);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(input.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
