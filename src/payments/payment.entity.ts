import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking_tour } from "src/booking_tours/booking_tour.entity";
import { Booking_room } from "src/booking_rooms/booking_room.entity";
import { User } from "src/users/user.entity";

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn()
    payment_id: number ;

    @Column()
    payment_type: string ;

    @Column()
    amount: number ;

    @OneToMany(() => Booking_tour, booking_tour => booking_tour.payment)
    booking_tours: Booking_tour[] ;

    @OneToMany(() => Booking_room, booking_room => booking_room.payment)
    booking_rooms: Booking_room[] ;

    @ManyToOne(() => User, user => user.payments)
    @JoinColumn({ name: 'users_user_id'})
    user: User ;

}