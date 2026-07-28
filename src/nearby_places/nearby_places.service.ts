import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nearby_place } from './nearby_place.entity';
import { Repository } from 'typeorm';
import { Hotel } from 'src/hotels/hotel.entity';
import { CreateNearbyPlaceDto } from './dto/create-nearby_place.dto';
import { UpdateNearbyPlaceDto } from './dto/update-nearby_place.dto';

@Injectable()
export class NearbyPlacesService {
    constructor(
        @InjectRepository(Nearby_place)
        private readonly nearbyPlaceRepository: Repository<Nearby_place>,
        
        @InjectRepository(Hotel)
        private readonly hotelRepository: Repository<Hotel>
    ) {}

    async create(createNearbyPlaceDto: CreateNearbyPlaceDto): Promise<Nearby_place> {
        const hotel = await this.hotelRepository.findOne({ where: {hotel_id: createNearbyPlaceDto.hotels_hotel_id}})
        if(!hotel) {
            throw new NotFoundException('Hotel Not Found')
        }
        const nearbyPlace = this.nearbyPlaceRepository.create({ name: createNearbyPlaceDto.name, hotel}) ;
        return this.nearbyPlaceRepository.save(nearbyPlace);
    }

    findAll(): Promise<Nearby_place[]> {
        return this.nearbyPlaceRepository.find({ relations: ['hotel'] });
    }

    async findOne(place_id: number): Promise<Nearby_place> {
        const nearbyPlace = await this.nearbyPlaceRepository.findOne({ where: { place_id }, relations: ['hotel'] })
        if (!nearbyPlace) {
            throw new NotFoundException(`Nearby place with ID ${place_id} not found`) ;
        }
        return nearbyPlace;
    }

    async update(place_id: number, updateNearbyPlaceDto: UpdateNearbyPlaceDto): Promise<Nearby_place> {
        const nearbyPlace = await this.nearbyPlaceRepository.findOne({ where: {place_id} } );
        if (!nearbyPlace) {
            throw new NotFoundException('NearbyPlace Not Found')
        }

        if (updateNearbyPlaceDto.hotels_hotel_id) {
            const hotel = await this.hotelRepository.findOne({ where: {hotel_id: updateNearbyPlaceDto.hotels_hotel_id }})
            if (!hotel) {
                throw new NotFoundException('Hotel Not Found')
            }
            nearbyPlace.hotel = hotel;
        }
            if(updateNearbyPlaceDto.name !== undefined) {
                nearbyPlace.name = updateNearbyPlaceDto.name;
            }
            return this.nearbyPlaceRepository.save(nearbyPlace);
    }

    async remove(place_id: number): Promise<void> {
        const nearbyPlace = await this.findOne(place_id);
        await this. nearbyPlaceRepository.remove(nearbyPlace)
        }
}
