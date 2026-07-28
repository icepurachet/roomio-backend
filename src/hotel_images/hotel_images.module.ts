import { Module } from '@nestjs/common';
import { HotelImagesService } from './hotel_images.service';
import { HotelImagesController } from './hotel_images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel_image } from './hotel_image.entity';
import { Hotel } from 'src/hotels/hotel.entity';

@Module({
  providers: [HotelImagesService],
  controllers: [HotelImagesController],
  imports: [TypeOrmModule.forFeature([Hotel_image, Hotel])]
})
export class HotelImagesModule {}
