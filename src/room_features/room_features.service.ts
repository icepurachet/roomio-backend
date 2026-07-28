import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room_feature } from './room_features.entity';
import { Repository } from 'typeorm';
import { CreateRoomFeatureDto } from './dto/create-room_feature.dto';
import { UpdateRoomFeatureDto } from './dto/update-room_feature.dto';
import { Room } from 'src/rooms/room.entity';

@Injectable()
export class RoomFeaturesService {
    constructor(
        @InjectRepository(Room_feature)
        private readonly roomFeatureRepository: Repository<Room_feature>,

        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>
    ) {}

    async create(createRoomFeatureDto: CreateRoomFeatureDto): Promise<Room_feature> {
        const room = await this.roomRepository.findOne({ where: {room_id: createRoomFeatureDto.rooms_room_id}})
        if (!room) {
            throw new NotFoundException('Room not found')
        }
        const roomFeature = this.roomFeatureRepository.create({
            name: createRoomFeatureDto.name,
            icon_url: createRoomFeatureDto.icon_url,
            room: room
        });
        return this.roomFeatureRepository.save(roomFeature);
    }

    findAll(): Promise<Room_feature[]> {
        return this.roomFeatureRepository.find({ relations: ['room']});
    }

    async findOne(feature_id: number): Promise<Room_feature> {
        const roomFeature = await this.roomFeatureRepository.findOne({ where: {feature_id: feature_id}, relations: ['room']});
        if (!roomFeature) {
            throw new NotFoundException(`Room_feature with id ${feature_id} not found`)
        }
        return roomFeature;
    }

    async update(feature_id: number, updateRoomFeatureDto: UpdateRoomFeatureDto): Promise<Room_feature> {
        const roomFeature = await this.roomFeatureRepository.findOne({ where: {feature_id}})
        if (!roomFeature) {
            throw new NotFoundException(`Room_feature with id ${feature_id} not found`);
        }
        if (updateRoomFeatureDto.rooms_room_id) {
            const room = await this.roomRepository.findOne({ where: {room_id: updateRoomFeatureDto.rooms_room_id} })
            if (!room) {
                throw new NotFoundException(`Room ${updateRoomFeatureDto.rooms_room_id} not found`);
            }
            roomFeature.room = room;
        }
        if ( updateRoomFeatureDto.name !== undefined ) roomFeature.name = updateRoomFeatureDto.name;
        if (updateRoomFeatureDto.icon_url !== undefined ) roomFeature.icon_url = updateRoomFeatureDto.icon_url;

        return this.roomFeatureRepository.save(roomFeature)
    }

    async remove(feature_id: number): Promise<void> {
        const result = await this.roomFeatureRepository.delete(feature_id);
        if (result.affected === 0) {
            throw new NotFoundException(`Room_feature with id ${feature_id} not found`)
        }
    }
}
