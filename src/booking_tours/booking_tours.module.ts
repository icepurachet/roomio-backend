import { Module } from '@nestjs/common';
import { BookingToursController } from './booking_tours.controller';
import { BookingToursService } from './booking_tours.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking_tour } from './booking_tour.entity';
import { Tour } from 'src/tours/tour.entity';
import { Payment } from 'src/payments/payment.entity';

@Module({
  controllers: [BookingToursController],
  providers: [BookingToursService],
  imports: [TypeOrmModule.forFeature([Booking_tour, Tour, Payment])]
})
export class BookingToursModule {}
