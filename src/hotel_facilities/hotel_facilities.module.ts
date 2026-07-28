import { Module } from '@nestjs/common';
import { HotelFacilitiesService } from './hotel_facilities.service';
import { HotelFacilitiesController } from './hotel_facilities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel_facility } from './hotel_facility.entity';
import { Hotel } from 'src/hotels/hotel.entity';

@Module({
  providers: [HotelFacilitiesService],
  controllers: [HotelFacilitiesController],
  imports: [TypeOrmModule.forFeature([Hotel_facility, Hotel])]
})
export class HotelFacilitiesModule {}
