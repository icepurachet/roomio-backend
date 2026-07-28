import { Module } from '@nestjs/common';
import { RoomFeaturesService } from './room_features.service';
import { RoomFeaturesController } from './room_features.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room_feature } from './room_features.entity';
import { Room } from 'src/rooms/room.entity';

@Module({
  providers: [RoomFeaturesService],
  controllers: [RoomFeaturesController],
  imports: [TypeOrmModule.forFeature([Room_feature, Room])]
})
export class RoomFeaturesModule {}
