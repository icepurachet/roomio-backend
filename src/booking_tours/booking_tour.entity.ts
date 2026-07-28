import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Tour } from "src/tours/tour.entity";
import { Payment } from "src/payments/payment.entity";

@Entity('booking_tours')
export class Booking_tour {
  @PrimaryGeneratedColumn()
  booking_id: number;

  @Column()
  guest: number;

  @ManyToOne(() => Tour, tour => tour.booking_tours, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tours_tour_id' })
  tour: Tour;

  @ManyToOne(() => Payment, payment => payment.booking_tours, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'payments_payment_id' })
  payment: Payment;
}


