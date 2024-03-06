import { Controller, Get } from '@nestjs/common';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
}
