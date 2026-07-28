import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from './tour.entity';
import { Hotel } from 'src/hotels/hotel.entity';

@Module({
  controllers: [ToursController],
  providers: [ToursService],
  imports: [TypeOrmModule.forFeature([Tour, Hotel])]
})
export class ToursModule {}
