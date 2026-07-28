import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { Hotel } from 'src/hotels/hotel.entity';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports: [TypeOrmModule.forFeature([Room, Hotel])]
})
export class RoomsModule {}
