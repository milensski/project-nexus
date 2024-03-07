import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
// const fakeUsers = [
//   {
//     id: 1,
//     username: 'anson',
//     password: 'password',
//   },
//   {
//     id: 2,
//     username: 'jack',
//     password: 'password123',
//   },
// ];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UserService) {}

  async validateUser({ username, password }: AuthPayloadDto) {
    const findUser = await this.userService.findByUsername(username);
    if (!findUser) return null;

    const isPasswordValid = await bcrypt.compare(password, findUser.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const { password: userPassword, ...user } = findUser;

    return this.jwtService.sign(user);
    
  }

  async generateToken(user: any) {
    return this.jwtService.sign(user);
  }
}