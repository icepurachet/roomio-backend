import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { Owner } from 'src/owners/owner.entity';
import { Hotel_image } from 'src/hotel_images/hotel_image.entity';
import { Nearby_place } from 'src/nearby_places/nearby_place.entity';
import { Hotel_facility } from 'src/hotel_facilities/hotel_facility.entity';

@Module({
  providers: [HotelsService],
  controllers: [HotelsController],
  imports: [TypeOrmModule.forFeature([Hotel, Owner, Hotel_image, Nearby_place, Hotel_facility])]
})
export class HotelsModule {}
