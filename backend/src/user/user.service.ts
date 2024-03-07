import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "./dto/create-user.dto";
import { UserWithoutPassword } from "src/types/user.types";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async createUser({ password, rePassword, ...createUserDtoPayload }: CreateUserDto): Promise<User> {

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ ...createUserDtoPayload, password: hashedPassword });
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<UserWithoutPassword[]> {
    const users: User[] = await this.userRepository.find();
    return users.map(({ password, ...user }) => user);
  }

  async findByUsername(username: User['username']): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } })
  }

  async findById(id: User['id']): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

}