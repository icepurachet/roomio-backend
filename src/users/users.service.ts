import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);
    }

    findAll(): Promise<User[]> { 
        return this.usersRepository.find();
    }

    async findOne(user_id: number): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { user_id } });
        if (!user) throw new NotFoundException(`User with id ${user_id} not found`);
        return user;
    }

    async update(user_id: number, updateUserDto: UpdateUserDto): Promise<User> { 
        await this.usersRepository.update(user_id, updateUserDto);
        return this.findOne(user_id);
    }

    async remove(user_id: number): Promise<void> {
        const { affected } = await this.usersRepository.delete(user_id);
        if (!affected) throw new NotFoundException(`User wiht is ${user_id} not found`);
    }
}

