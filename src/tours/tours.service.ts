import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tour } from './tour.entity';
import { Repository } from 'typeorm';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { Hotel } from 'src/hotels/hotel.entity';

@Injectable()
export class ToursService {
    constructor(
        @InjectRepository(Tour)
        private readonly tourRepository: Repository<Tour>,

        @InjectRepository(Hotel)
        private readonly hotelRepository: Repository<Hotel>
    ) {}

    async create(createTourDto: CreateTourDto): Promise<Tour>{
        const hotel = await this.hotelRepository.findOne({ where: { hotel_id: createTourDto.hotels_hotel_id}});
        if (!hotel) {
            throw new NotFoundException(`Hotel with id ${createTourDto.hotels_hotel_id} not found`);
        }
        const tour = this.tourRepository.create({
            name: createTourDto.name,
            price: createTourDto.price,
            image_url: createTourDto.image_url,
            description: createTourDto.description,
            hotel: hotel
        })
        return this.tourRepository.save(tour) ;
    }

    findAll(): Promise<Tour[]> {
        return this.tourRepository.find() ;
    }

    async findOne(id: number): Promise<Tour> {
        const tour = await this.tourRepository.findOne({ where: {tour_id: id}});
        if (!tour) {
            throw new NotFoundException(`Tour with id ${id} not found`) ;
        }
        return tour ;
    }
    
    async update(id: number, updateTourDto: UpdateTourDto): Promise<Tour> {
        await this.tourRepository.update(id, updateTourDto);
        return this.findOne(id)
    }

    async remove(id: number): Promise<void> {
        const result = await this.tourRepository.delete(id)
        if (result.affected === 0) {
            throw new NotFoundException(`Tour with id ${id} not found`)
        }
    }
}
