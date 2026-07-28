import { Injectable, NotFoundException } from '@nestjs/common';
import { Room } from './room.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Hotel } from 'src/hotels/hotel.entity';

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(Room)
        private readonly roomRopository: Repository<Room>,

        @InjectRepository(Hotel)
        private readonly hotelRepository: Repository<Hotel>
    ) {}

    async create(createRoomDto: CreateRoomDto): Promise<Room> {
        const hotel = await this.hotelRepository.findOne({ where: {hotel_id: createRoomDto.hotel_id}})
        if (!hotel) {
            throw new NotFoundException(`Hotel with hotel_id ${createRoomDto.hotel_id} not found`)
        }
        const room = this.roomRopository.create({
            room_type: createRoomDto.room_type,
            image_url: createRoomDto.image_url,
            price: createRoomDto.price,
            extra_bed: createRoomDto.extra_bed,
            capacity: createRoomDto.capacity,
            hotel: hotel
        })
        return this.roomRopository.save(room);
    }

    findAll(): Promise<Room[]> {
        return this.roomRopository.find();
    }

    async findOne(id: number): Promise<Room> {
        const room = await this.roomRopository.findOne({ where: {room_id: id}}) ;
        if (!room) {
            throw new NotFoundException(`Room with id ${id} not found`);
        }
        return room ;
    }

    async update(id: number, updateRoomDto: UpdateRoomDto): Promise<Room> {
        const room = await this.roomRopository.findOne({ where: {room_id: id}})
        if (!room) {
            throw new NotFoundException(`room with id ${id} not found`)
        }
        
        if (updateRoomDto.hotel_id) {
            const hotel = await this.hotelRepository.findOne({ where: {hotel_id: updateRoomDto.hotel_id}})
            if (!hotel) {
                throw new NotFoundException(`Hotel with id ${updateRoomDto.hotel_id} not found`)
            }
            room.hotel = hotel;
        }

        if (updateRoomDto.room_type !== undefined) room.room_type = updateRoomDto.room_type ; 
        if (updateRoomDto.image_url !== undefined) room.image_url = updateRoomDto.image_url ;
        if (updateRoomDto.price !== undefined) room.price = updateRoomDto.price ;
        if (updateRoomDto.extra_bed !== undefined) room.extra_bed = updateRoomDto.extra_bed ;
        if (updateRoomDto.capacity !== undefined) room.capacity = updateRoomDto.capacity ;

        return this.roomRopository.save(room)
    }

    async remove(id: number): Promise<void> {
        const result = await this.roomRopository.delete(id) ;
        if (result.affected === 0) {         // result.affected === 0 คือ ไม่ได้ลบให้ ถ้าลบให้จะเป็น > 0
            throw new NotFoundException(`Room with id ${id} not found`) ;
        }
    }
}
