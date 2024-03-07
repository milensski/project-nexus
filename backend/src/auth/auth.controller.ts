import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) { }

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() createUserDto: CreateUserDto): Promise<{token: string}> {

    if (createUserDto.password !== createUserDto.rePassword) {
      throw new HttpException('Passwords dont match', HttpStatus.BAD_REQUEST)
    }

    try {

      const {password,  ...createdUser } = await this.userService.createUser(createUserDto);
      console.log(createdUser);
      
      const token = await this.authService.generateToken(createdUser);

      return {token};


    } catch (e) {
      console.log(e);
      
      throw new HttpException('User with this username or email already exists', HttpStatus.CONFLICT);
    }

  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    return req.user;
  }


}