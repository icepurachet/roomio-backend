import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel_facility } from './hotel_facility.entity';
import { Repository } from 'typeorm';
import { CreateHotelFacilityDto } from './dto/create-hotel_facility.dto';
import { UpdateHotelFacilityDto } from './dto/update-hotel_facility.dto';
import { Hotel } from 'src/hotels/hotel.entity';

@Injectable()
export class HotelFacilitiesService {
    constructor(
        @InjectRepository(Hotel_facility)
        private readonly hotelFacilityRepository: Repository<Hotel_facility>,

        @InjectRepository(Hotel)
        private readonly hotelRepository: Repository<Hotel>
    ) {}

    async create(createHotelFacilityDto: CreateHotelFacilityDto): Promise<Hotel_facility> {
        const hotel = await this.hotelRepository.findOne({ where: {hotel_id: createHotelFacilityDto.hotels_hotel_id}})
        if (!hotel) {
            throw new NotFoundException(`Hotel with hotel_id ${createHotelFacilityDto.hotels_hotel_id} not found`)
        }
        const facility = this.hotelFacilityRepository.create({
            name: createHotelFacilityDto.name,
            icon_url: createHotelFacilityDto.icon_url,
            hotel: hotel
        });
        return this.hotelFacilityRepository.save(facility);
    }

    findAll(): Promise<Hotel_facility[]> {
        return this.hotelFacilityRepository.find({ relations: ['hotel']});
    }

    async findOne(facility_id: number): Promise<Hotel_facility> {
        const facility = await this.hotelFacilityRepository.findOne({ where: { facility_id }, relations: ['hotel']})
        if (!facility) {
            throw new NotFoundException(`Hotel facility with ID ${facility_id} not found`)
        }
        return facility;
    }

    async update(facility_id: number, updateHotelFacilityDto: UpdateHotelFacilityDto): Promise<Hotel_facility> {
        const hotelFa = await this.hotelFacilityRepository.findOne({ where: {facility_id}})
        if (!hotelFa) {
            throw new NotFoundException(`Hotel facility with ID ${facility_id} not found`)
        }

        if (updateHotelFacilityDto.hotels_hotel_id) {
            const hotel = await this.hotelRepository.findOne({where: { hotel_id: updateHotelFacilityDto.hotels_hotel_id}})
            if (!hotel) {
                throw new NotFoundException(`Hotel with ID ${updateHotelFacilityDto.hotels_hotel_id} not found`)
            }
            hotelFa.hotel = hotel 
        }

        if (updateHotelFacilityDto.name !== undefined) hotelFa.name = updateHotelFacilityDto.name ;
        if (updateHotelFacilityDto.icon_url !== undefined) hotelFa.icon_url = updateHotelFacilityDto.icon_url ;

        return this.hotelFacilityRepository.save(hotelFa)
    }

    async remove(facility_id: number): Promise<void> {
        const result = await this.hotelFacilityRepository.delete(facility_id);
        if (result.affected === 0) {
            throw new NotFoundException(`Hotel facility with ID ${facility_id} not found`)
        }
    }
}
