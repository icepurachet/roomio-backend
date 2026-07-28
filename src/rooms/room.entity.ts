import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Hotel } from "src/hotels/hotel.entity";
import { Room_feature } from 'src/room_features/room_features.entity'
import { Booking_room } from "src/booking_rooms/booking_room.entity";

@Entity('rooms')
export class Room { 
    @PrimaryGeneratedColumn()
    room_id: number;

    @Column()
    room_type: string;

    @Column()
    image_url: string;

    @Column()
    price: number;

    @Column()
    extra_bed: number;

    @Column()
    capacity: number;

    @Column()
    hotels_hotel_id: number;

    @ManyToOne(() => Hotel, hotel => hotel.rooms, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'hotels_hotel_id'})
    hotel: Hotel

    @OneToMany(() => Room_feature, room_feature => room_feature.room)
    room_features: Room_feature[];

    @OneToMany(() => Booking_room, booking_room => booking_room.room)
    booking_rooms: Booking_room[]
}