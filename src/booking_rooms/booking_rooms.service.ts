import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking_room } from './booking_room.entity';
import { CreateBookingRoomDto } from './dto/create-booking_room.dto';
import { UpdateBookingRoomDto } from './dto/update-booking_room.dto';
import { Room } from 'src/rooms/room.entity';
import { Payment } from 'src/payments/payment.entity';

@Injectable()
export class BookingRoomsService {
  constructor(
    @InjectRepository(Booking_room) private bookingRepo: Repository<Booking_room>,
    @InjectRepository(Room) private roomRepo: Repository<Room>,
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
  ) {}

  // แปลง string เป็น Date แบบ UTC ไม่ให้ timezone เบี้ยว
  private toDateOnlyUTC(dateStr: string): Date {
    const [year, month, day] = dateStr.split('-').map(Number);
    // month ใน JS Date เริ่ม 0 ดังนั้นต้อง -1
    return new Date(Date.UTC(year, month - 1, day));
  }

  // แปลง Date เป็น string (เฉพาะวัน) แบบ UTC
  private formatDateOnlyUTC(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  async create(dto: CreateBookingRoomDto): Promise<Booking_room> {
    const room = await this.roomRepo.findOne({ where: { room_id: dto.rooms_room_id } });
    if (!room) throw new NotFoundException(`Room ${dto.rooms_room_id} not found`);

    const payment = await this.paymentRepo.findOne({ where: { payment_id: dto.payments_payment_id } });
    if (!payment) throw new NotFoundException(`Payment ${dto.payments_payment_id} not found`);

    const newBooking = this.bookingRepo.create({
      check_in_date: this.toDateOnlyUTC(dto.check_in_date),
      check_out_date: this.toDateOnlyUTC(dto.check_out_date),
      total_price: dto.total_price,
      guest: dto.guest,
      room,
      payment,
    });

    const saved = await this.bookingRepo.save(newBooking);

    saved.check_in_date = this.formatDateOnlyUTC(saved.check_in_date) as any;
    saved.check_out_date = this.formatDateOnlyUTC(saved.check_out_date) as any;
    return saved;
  }

  async findAll(): Promise<Booking_room[]> {
    const bookings = await this.bookingRepo.find({ relations: ['room', 'payment'] });
    return bookings.map(b => {
      b.check_in_date = this.formatDateOnlyUTC(b.check_in_date) as any;
      b.check_out_date = this.formatDateOnlyUTC(b.check_out_date) as any;
      return b;
    });
  }

  async findOne(id: number): Promise<Booking_room> {
    const booking = await this.bookingRepo.findOne({ where: { booking_id: id }, relations: ['room', 'payment'] });
    if (!booking) throw new NotFoundException(`Booking ${id} not found`);
    booking.check_in_date = this.formatDateOnlyUTC(booking.check_in_date) as any;
    booking.check_out_date = this.formatDateOnlyUTC(booking.check_out_date) as any;
    return booking;
  }

  async update(id: number, dto: UpdateBookingRoomDto): Promise<Booking_room> {
    const booking = await this.bookingRepo.findOne({ where: { booking_id: id } });
    if (!booking) throw new NotFoundException(`Booking ${id} not found`);

    if (dto.rooms_room_id) {
      const room = await this.roomRepo.findOne({ where: { room_id: dto.rooms_room_id } });
      if (!room) throw new NotFoundException(`Room ${dto.rooms_room_id} not found`);
      booking.room = room;
    }

    if (dto.payments_payment_id) {
      const payment = await this.paymentRepo.findOne({ where: { payment_id: dto.payments_payment_id } });
      if (!payment) throw new NotFoundException(`Payment ${dto.payments_payment_id} not found`);
      booking.payment = payment;
    }

    if (dto.check_in_date) booking.check_in_date = this.toDateOnlyUTC(dto.check_in_date);
    if (dto.check_out_date) booking.check_out_date = this.toDateOnlyUTC(dto.check_out_date);
    if (dto.total_price !== undefined) booking.total_price = dto.total_price;
    if (dto.guest !== undefined) booking.guest = dto.guest;

    const updated = await this.bookingRepo.save(booking);

    updated.check_in_date = this.formatDateOnlyUTC(updated.check_in_date) as any;
    updated.check_out_date = this.formatDateOnlyUTC(updated.check_out_date) as any;
    return updated;
  }

  async remove(id: number): Promise<void> {
    const result = await this.bookingRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Booking ${id} not found`);
  }
}
