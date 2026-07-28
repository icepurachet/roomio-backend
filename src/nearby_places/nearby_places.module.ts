import { Module } from '@nestjs/common';
import { NearbyPlacesService } from './nearby_places.service';
import { NearbyPlacesController } from './nearby_places.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nearby_place } from './nearby_place.entity';
import { Hotel } from 'src/hotels/hotel.entity';

@Module({
  providers: [NearbyPlacesService],
  controllers: [NearbyPlacesController],
  imports: [TypeOrmModule.forFeature([Nearby_place, Hotel])]
})
export class NearbyPlacesModule {}
