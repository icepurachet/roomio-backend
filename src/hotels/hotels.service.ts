import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './hotel.entity';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Owner } from 'src/owners/owner.entity';

@Injectable()
export class HotelsService {
    constructor(
        @InjectRepository(Hotel)
        private readonly hotelRepository: Repository<Hotel>,

        @InjectRepository(Owner)
        private readonly ownerRepository: Repository<Owner>
    ) {}

    async create(createHotelDto: CreateHotelDto): Promise<Hotel> {
        const owner = await this.ownerRepository.findOne({ where: {owner_id: createHotelDto.owner_id}})
        if (!owner) {
            throw new NotFoundException(`Owner with id ${createHotelDto.owner_id} not found`)
        }
        const hotel = this.hotelRepository.create({
            hotel_name: createHotelDto.hotel_name,
            country: createHotelDto.country,
            rating: createHotelDto.rating,
            owner: owner
        });
        return this.hotelRepository.save(hotel)
    }

    findAll(): Promise<Hotel[]> {
        return this.hotelRepository.find() ;
    }

    async findOne(id: number): Promise<Hotel> {
        const hotel = await this.hotelRepository.findOne({ where: {hotel_id: id}})
        if (!hotel) {
            throw new NotFoundException(`Hotel with id ${id} not found`)
        }
        return hotel ;
    }

    async update(id: number, updateHotelDto: UpdateHotelDto): Promise<Hotel> {
        const hotel = await this.hotelRepository.findOne({ where: {hotel_id: id}})
        if (!hotel) {
            throw new NotFoundException(`Hotel with id ${id} not found`)
        }

        if (updateHotelDto.owner_id) {
            const owner = await this.ownerRepository.findOne({ where: {owner_id: updateHotelDto.owner_id}})
            if (!owner) {
                throw new NotFoundException(`Owner with id ${updateHotelDto.owner_id} not found`)
            }
            hotel.owner = owner
        }

        if (updateHotelDto.hotel_name !== undefined) hotel.hotel_name = updateHotelDto.hotel_name ;
        if (updateHotelDto.country !== undefined) hotel.country = updateHotelDto.country ;
        if (updateHotelDto.rating !== undefined) hotel.rating = updateHotelDto.rating ;

        return this.hotelRepository.save(hotel)
    }

    async remove(id: number): Promise<void> {
        const result = await this.hotelRepository.delete(id);
        if (result.affected === 0) {
            throw new  NotFoundException(`Hotel with id ${id} not found`)
        }
    }
}
