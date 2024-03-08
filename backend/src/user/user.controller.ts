import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

import { UserWithoutPassword } from 'src/types/user.types';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';


@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllUsers(): Promise<UserWithoutPassword[]> {
        const users: UserWithoutPassword[] = await this.userService.findAll();

        return users
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getUser(@Param('id') id: string): Promise<User> {

        const user: User = await this.userService.findById(id)

        return user
    }

}
