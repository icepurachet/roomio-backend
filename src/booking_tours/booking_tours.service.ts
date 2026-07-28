import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking_tour } from './booking_tour.entity';
import { CreateBookingTourDto } from './dto/create-booking_tour.dto';
import { UpdateBookingTourDto } from './dto/update-booking_tour.dto';
import { Tour } from 'src/tours/tour.entity';
import { Payment } from 'src/payments/payment.entity';

@Injectable()
export class BookingToursService {
  constructor(
    @InjectRepository(Booking_tour)
    private readonly bookingTourRepo: Repository<Booking_tour>,

    @InjectRepository(Tour)
    private readonly tourRepo: Repository<Tour>,

    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}

  async create(dto: CreateBookingTourDto): Promise<Booking_tour> {
    const tour = await this.tourRepo.findOne({ where: { tour_id: dto.tours_tour_id } });
    if (!tour) throw new NotFoundException(`Tour ID ${dto.tours_tour_id} not found`);

    const payment = await this.paymentRepo.findOne({ where: { payment_id: dto.payments_payment_id } });
    if (!payment) throw new NotFoundException(`Payment ID ${dto.payments_payment_id} not found`);

    const booking = this.bookingTourRepo.create({
      guest: dto.guest,
      tour,
      payment,
    });

    return this.bookingTourRepo.save(booking);
  }

  findAll(): Promise<Booking_tour[]> {
    return this.bookingTourRepo.find({ relations: ['tour', 'payment'] });
  }

  async findOne(id: number): Promise<Booking_tour> {
    const booking = await this.bookingTourRepo.findOne({
      where: { booking_id: id },
      relations: ['tour', 'payment'],
    });
    if (!booking) throw new NotFoundException(`Booking ID ${id} not found`);
    return booking;
  }

  async update(id: number, dto: UpdateBookingTourDto): Promise<Booking_tour> {
    const booking = await this.findOne(id);

    if (dto.guest !== undefined) booking.guest = dto.guest;

    if (dto.tours_tour_id !== undefined) {
      const tour = await this.tourRepo.findOne({ where: { tour_id: dto.tours_tour_id } });
      if (!tour) throw new NotFoundException(`Tour ID ${dto.tours_tour_id} not found`);
      booking.tour = tour;
    }

    if (dto.payments_payment_id !== undefined) {
      const payment = await this.paymentRepo.findOne({ where: { payment_id: dto.payments_payment_id } });
      if (!payment) throw new NotFoundException(`Payment ID ${dto.payments_payment_id} not found`);
      booking.payment = payment;
    }

    return this.bookingTourRepo.save(booking);
  }

  async remove(id: number): Promise<void> {
    const result = await this.bookingTourRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Booking ID ${id} not found`);
  }
}
