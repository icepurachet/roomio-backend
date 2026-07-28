import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Owner } from 'src/owners/owner.entity'
import { Room } from 'src/rooms/room.entity'
import { Hotel_image } from 'src/hotel_images/hotel_image.entity'
import { Tour } from 'src/tours/tour.entity'
import { Nearby_place } from 'src/nearby_places/nearby_place.entity'
import { Hotel_facility } from "src/hotel_facilities/hotel_facility.entity";

@Entity('hotels')
export class Hotel {
    @PrimaryGeneratedColumn()
    hotel_id: number;

    @Column()
    hotel_name: string;

    @Column()
    country: string;

    @Column()
    rating: number;

    @Column()
    owners_owner_id: number;
    
    @ManyToOne(() => Owner, owner => owner.hotels)
    @JoinColumn({ name: 'owners_owner_id'})
    owner: Owner;

    @OneToMany(() => Room, room => room.hotel)
    rooms: Room[];

    @OneToMany(() => Hotel_image, hotel_image => hotel_image.hotel)
    hotel_images: Hotel_image[] ;

    @OneToMany(() => Tour, tour => tour.hotel)
    tours: Tour[] ;

    @OneToMany(() => Nearby_place, nearby_place => nearby_place.hotel)
    nearby_places: Nearby_place[] ;

    @OneToMany(() => Hotel_facility, hotel_facility => hotel_facility.hotel)
    hotel_facilities: Hotel_facility[] ;
}