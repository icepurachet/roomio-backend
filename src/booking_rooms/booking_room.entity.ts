import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "src/rooms/room.entity";
import { Payment } from "src/payments/payment.entity";

@Entity('booking_rooms')
export class Booking_room {
    @PrimaryGeneratedColumn()
    booking_id: number ;

    @Column()
    check_in_date: Date ;

    @Column()
    check_out_date: Date ;

    @Column()
    total_price: number ;

    @Column()
    guest: number ;

    @Column()
    rooms_room_id: number ;

    @Column()
    payments_payment_id: number;

    @ManyToOne(() => Room, room => room.booking_rooms)
    @JoinColumn({ name: 'rooms_room_id' })
    room: Room ;

    @ManyToOne(() => Payment, payment => payment.booking_rooms)
    @JoinColumn({ name: 'payments_payment_id' })
    payment: Payment ;
}