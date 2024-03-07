import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

import { UserWithoutPassword } from 'src/types/user.types';
import { User } from './user.entity';


@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @Get()
    async getAllUsers(): Promise<UserWithoutPassword[]> {
        const users: UserWithoutPassword[] = await this.userService.findAll();


        return users
    }

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {

        const user: User = await this.userService.findById(id)

        return user
    }


}
