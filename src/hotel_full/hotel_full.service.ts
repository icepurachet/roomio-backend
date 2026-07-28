import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel_facility } from 'src/hotel_facilities/hotel_facility.entity';
import { Hotel_image } from 'src/hotel_images/hotel_image.entity';
import { Nearby_place } from 'src/nearby_places/nearby_place.entity';
import { Room } from 'src/rooms/room.entity';
import { Tour } from 'src/tours/tour.entity';
import { Repository } from 'typeorm';
import { CreateHotelFullDto } from './dto/create-hotel_full.dto';
import { Owner } from 'src/owners/owner.entity';
import { UpdateHotelFullDto } from './dto/update-hotel.dto';
import { Hotel } from './hotel_full.entity';

@Injectable()
export class HotelFullService {
    constructor(
        @InjectRepository(Hotel)
        private readonly hotelRepository: Repository<Hotel>,

        @InjectRepository(Nearby_place)
        private readonly nearbyPlaceRepository: Repository<Nearby_place>,

        @InjectRepository(Hotel_facility)
        private readonly hotelFacilityRepository: Repository<Hotel_facility>,

        @InjectRepository(Hotel_image)
        private readonly hotelImageRepository: Repository<Hotel_image>,

        @InjectRepository(Tour)
        private readonly tourRepository: Repository<Tour>,

        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,

        @InjectRepository(Owner)
        private readonly ownerRepository: Repository<Owner>
    ) {}

    async create(createHotelFullDto: CreateHotelFullDto): Promise<Hotel> {
        const owner = await this.ownerRepository.findOne({ where: { owner_id: createHotelFullDto.owner_id }});
        if(!owner) {
            throw new NotFoundException(`Owner with id ${createHotelFullDto.owner_id} not found`);
        }

        const hotel = this.hotelRepository.create({
            hotel_name: createHotelFullDto.hotel_name,
            country: createHotelFullDto.country,
            rating: createHotelFullDto.rating,
            owner: owner
        })
        await this.hotelRepository.save(hotel)

        const nearbyPlace = createHotelFullDto.nearby_places.map(Nearby_placeDto => this.nearbyPlaceRepository.create({ ...Nearby_placeDto, hotel: hotel }));
        await this.nearbyPlaceRepository.save(nearbyPlace)

        const hotelFa = createHotelFullDto.hotel_facilities.map(Hotel_facilityDto => this.hotelFacilityRepository.create({ ...Hotel_facilityDto, hotel: hotel }));
        await this.hotelFacilityRepository.save(hotelFa)

        const hotelImage = createHotelFullDto.hotel_images.map(Hotel_imageDto => this.hotelImageRepository.create({ ...Hotel_imageDto, hotel:hotel }));
        await this.hotelImageRepository.save(hotelImage)

        const tour = createHotelFullDto.tours.map(TourDto => this.tourRepository.create({ ...TourDto, hotel: hotel}));
        await this.tourRepository.save(tour)

        const room = createHotelFullDto.rooms.map(RoomDto => this.roomRepository.create({ ...RoomDto, hotel: hotel }));
        await this.roomRepository.save(room)

        const savedHotel = await this.hotelRepository.findOne({
            where: { hotel_id: hotel.hotel_id },
            relations: ['owner', 'nearby_places', 'hotel_facilities', 'hotel_images', 'tours', 'rooms'],
        });

        if (!savedHotel) {
            throw new NotFoundException(`Hotel with id ${hotel.hotel_id} not found after creation`);
        }

        return savedHotel;
    }

    async findAll(): Promise<Hotel[]> {
        return this.hotelRepository.find({ relations: [ 'owner', 'nearby_places', 'hotel_facilities', 'hotel_images', 'tours', 'rooms' ]});
    }

    async findOne(hotel_id: number): Promise<Hotel> {
        const hotel = await this.hotelRepository.findOne({ where: {hotel_id}, relations: ['owner', 'nearby_places', 'hotel_facilities', 'hotel_images', 'tours', 'rooms']})
        if(!hotel) {
            throw new NotFoundException(`Hotel with id ${hotel_id} not found`);
        }
        return hotel ;
    }

    async update(hotel_id: number, updateHotelFullDto: UpdateHotelFullDto): Promise<Hotel> {
        const hotel = await this.findOne( hotel_id )

        // hotel.hotel_name = updateHotelFullDto.hotel_name ?? hotel.hotel_name;
        // hotel.country = updateHotelFullDto.country ?? hotel.country;
        // hotel.rating = updateHotelFullDto.rating ?? hotel.rating;

        if (updateHotelFullDto.hotel_name !== undefined) hotel.hotel_name = updateHotelFullDto.hotel_name;
        if (updateHotelFullDto.country !== undefined) hotel.country = updateHotelFullDto.country;
        if (updateHotelFullDto.rating !== undefined) hotel.rating = updateHotelFullDto.rating;

        if (updateHotelFullDto.owner_id) {
            const owner = await this.ownerRepository.findOne({ where: { owner_id: updateHotelFullDto.owner_id}});
            if(!owner) {
                throw new NotFoundException(`Owner with id ${updateHotelFullDto.owner_id} not found`);
            }
            hotel.owner = owner;
        }
        await this.hotelRepository.save(hotel)

         if (updateHotelFullDto.nearby_places && updateHotelFullDto.nearby_places.length > 0) {
            for (const nearbyPlaceDto of updateHotelFullDto.nearby_places) {
                if (nearbyPlaceDto.hotels_hotel_id) {
                    await this.nearbyPlaceRepository.update(nearbyPlaceDto.hotels_hotel_id, { 
                        ...nearbyPlaceDto, 
                        hotel: hotel 
                    });
                } else {
                    const newNearbyPlace = this.nearbyPlaceRepository.create({ 
                        ...nearbyPlaceDto, 
                        hotel: hotel 
                    });
                    await this.nearbyPlaceRepository.save(newNearbyPlace);
                }
            }
        }

        // อัปเดต hotel facilities ถ้ามี
        if (updateHotelFullDto.hotel_facilities && updateHotelFullDto.hotel_facilities.length > 0) {
            for (const facilityDto of updateHotelFullDto.hotel_facilities) {
                if (facilityDto.hotels_hotel_id) {
                    await this.hotelFacilityRepository.update(facilityDto.hotels_hotel_id, { 
                        ...facilityDto, 
                        hotel: hotel 
                    });
                } else {
                    const newFacility = this.hotelFacilityRepository.create({ 
                        ...facilityDto, 
                        hotel: hotel 
                    });
                    await this.hotelFacilityRepository.save(newFacility);
                }
            }
        }

        // อัปเดต hotel images ถ้ามี
        if (updateHotelFullDto.hotel_images && updateHotelFullDto.hotel_images.length > 0) {
            for (const imageDto of updateHotelFullDto.hotel_images) {
                if (imageDto.hotel_id) {
                    await this.hotelImageRepository.update(imageDto.hotel_id, { 
                        ...imageDto, 
                        hotel: hotel 
                    });
                } else {
                    const newImage = this.hotelImageRepository.create({ 
                        ...imageDto, 
                        hotel: hotel 
                    });
                    await this.hotelImageRepository.save(newImage);
                }
            }
        }

        // อัปเดต tours ถ้ามี
        if (updateHotelFullDto.tours && updateHotelFullDto.tours.length > 0) {
            for (const tourDto of updateHotelFullDto.tours) {
                if (tourDto.hotels_hotel_id) {
                    await this.tourRepository.update(tourDto.hotels_hotel_id, { 
                        ...tourDto, 
                        hotel: hotel 
                    });
                } else {
                    const newTour = this.tourRepository.create({ 
                        ...tourDto, 
                        hotel: hotel 
                    });
                    await this.tourRepository.save(newTour);
                }
            }
        }

        // อัปเดต rooms ถ้ามี
        if (updateHotelFullDto.rooms && updateHotelFullDto.rooms.length > 0) {
            for (const roomDto of updateHotelFullDto.rooms) {
                if (roomDto.hotel_id) {
                    await this.roomRepository.update(roomDto.hotel_id, { 
                        ...roomDto, 
                        hotel: hotel 
                    });
                } else {
                    const newRoom = this.roomRepository.create({ 
                        ...roomDto, 
                        hotel: hotel 
                    });
                    await this.roomRepository.save(newRoom);
                }
            }
        }

        // return this.hotelRepository.findOne({ 
        //     where: { hotel_id }, 
        //     relations: ['owner', 'nearby_places', 'hotel_facilities', 'hotel_images', 'tours', 'rooms']
        // });
        const updatedHotel = await this.hotelRepository.findOne({
            where: { hotel_id },
            relations: ['owner', 'nearby_places', 'hotel_facilities', 'hotel_images', 'tours', 'rooms'],
            });

            if (!updatedHotel) {
            throw new NotFoundException(`Hotel with id ${hotel_id} not found after update`);
            }

            return updatedHotel;
    }
    async remove(hotel_id: number): Promise<void> {

        await this.hotelFacilityRepository.delete({ hotel: { hotel_id } });
        await this.hotelImageRepository.delete({ hotel: { hotel_id } });
        await this.nearbyPlaceRepository.delete({ hotel: { hotel_id } });
        await this.roomRepository.delete({ hotel: { hotel_id } });
        await this.tourRepository.delete({ hotel: { hotel_id } });
        
        const result = await this.hotelRepository.delete(hotel_id);
        if(result.affected === 0) {
            throw new NotFoundException(`Hotel with id ${hotel_id} not found`)
        }
    }
}
