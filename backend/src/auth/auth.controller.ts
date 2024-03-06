import { Body, Controller, Post } from "@nestjs/common";
import { create } from "domain";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/user.service";

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.createUser(createUserDto)
        return {user, message: "Registered"}
    }
}