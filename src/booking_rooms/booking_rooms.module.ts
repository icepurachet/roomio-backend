import { Module } from '@nestjs/common';
import { BookingRoomsController } from './booking_rooms.controller';
import { BookingRoomsService } from './booking_rooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking_room } from './booking_room.entity';
import { Room } from 'src/rooms/room.entity';
import { Payment } from 'src/payments/payment.entity';

@Module({
  controllers: [BookingRoomsController],
  providers: [BookingRoomsService],
  imports: [TypeOrmModule.forFeature([Booking_room, Room, Payment])]
})
export class BookingRoomsModule {}
