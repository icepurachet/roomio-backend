import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelFullService } from './hotel_full.service';
import { HotelFullController } from './hotel_full.controller';
import { Nearby_place } from 'src/nearby_places/nearby_place.entity';
import { Hotel_facility } from 'src/hotel_facilities/hotel_facility.entity';
import { Hotel_image } from 'src/hotel_images/hotel_image.entity';
import { Tour } from 'src/tours/tour.entity';
import { Room } from 'src/rooms/room.entity';
import { Owner } from 'src/owners/owner.entity';
import { Hotel } from './hotel_full.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Hotel,
      Nearby_place,
      Hotel_facility,
      Hotel_image,
      Tour,
      Room,
      Owner,
    ]),
  ],
  providers: [HotelFullService],
  controllers: [HotelFullController],
})
export class HotelFullModule {}
