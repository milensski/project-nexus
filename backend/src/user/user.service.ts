import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User) 
        private userRepository: Repository<User>,
    ) {}

    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compareSync(password, hashedPassword)
      }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
      }

    async findByUsername(username:string): Promise<User | undefined> {
        return this.userRepository.findOne({where: {username}})
    }

    async findById(id:number): Promise<User | undefined>{
        return this.userRepository.findOne({where: {id}});
    }

    async createUser(user: Partial<User>): Promise<User> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = this.userRepository.create({ ...user, password: hashedPassword });
        return this.userRepository.save(newUser);
      }
    
}