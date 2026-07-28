import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './owner.entity';
import { Repository } from 'typeorm';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OwnersService {
    constructor(
        @InjectRepository(Owner)
        private readonly ownerRepository: Repository<Owner> 
    ) {}

    async create(createOwnerDto: CreateOwnerDto): Promise<Owner> {

        const hashedPassword = await bcrypt.hash(createOwnerDto.password, 10);

        const owner = this.ownerRepository.create({
            ...createOwnerDto,
            password: hashedPassword,
        });
        return this.ownerRepository.save(owner);
    }

    findAll(): Promise<Owner[]> {
        return this.ownerRepository.find({ relations: ['hotels']});
    }

    async findOne(owner_id: number): Promise<Owner> {
        const owner = await this.ownerRepository.findOne({ where: {owner_id}, relations: ['hotels']})
        if (!owner) {
            throw new NotFoundException(`Owner with ID ${owner_id} not found`)
        }
        return owner;
    }

    async findByUsername(username: string): Promise<Owner | null> {
        return this.ownerRepository.findOne({ where: { username }})
    }

    async update(owner_id: number, updateOwnerDto: UpdateOwnerDto): Promise<Owner> {
        const owner = await this.ownerRepository.findOne({ where: {owner_id} })
        if (!owner) {
            throw new NotFoundException(`Owner with ID ${owner_id} not found`)
        }
        await this.ownerRepository.update(owner_id, updateOwnerDto)
        return this.findOne(owner_id)
    }

    async remove(owner_id: number): Promise<void> {
        const result = await this.ownerRepository.delete(owner_id);
        if(result.affected === 0) {
            throw new NotFoundException(`Owner with ID ${owner_id} not found`)
        }
    }
}
