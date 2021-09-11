import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './CreateUserDto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = new User();

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    user.first_name = createUserDto.firstName;
    user.last_name = createUserDto.lastName;
    user.email = createUserDto.email;
    user.role = 'admin';
    user.project_id = uuid();
    user.password = hashedPassword;
    return this.userService.save(user);
  }
}
