import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

import { UserWithoutPassword } from 'src/types/user.types';


@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @Get()
    async getAllUsers(): Promise<UserWithoutPassword[]> {
        const users: UserWithoutPassword[] = await this.userService.findAll();


        return users
    }


}
