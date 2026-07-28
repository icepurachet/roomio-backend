import { Hotel_facility } from 'src/hotel_facilities/hotel_facility.entity';
import { Hotel_image } from 'src/hotel_images/hotel_image.entity';
import { Nearby_place } from 'src/nearby_places/nearby_place.entity';
import { Owner } from 'src/owners/owner.entity';
import { Room } from 'src/rooms/room.entity';
import { Tour } from 'src/tours/tour.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'hotels' })
export class Hotel {
  @PrimaryGeneratedColumn()
  hotel_id: number;

  @Column({ length: 50 })
  hotel_name: string;

  @Column({ length: 50 })
  country: string;

  @Column('decimal', { precision: 3, scale: 1 })
  rating: number;

  @ManyToOne(() => Owner, owner => owner.hotels, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owners_owner_id' })
  owner: Owner;

  @OneToMany(() => Nearby_place, nearby_place => nearby_place.hotel, { cascade: true })
  nearby_places: Nearby_place[];

  @OneToMany(() => Hotel_facility, hotel_facility => hotel_facility.hotel, { cascade: true })
  hotel_facilities: Hotel_facility[];

  @OneToMany(() => Hotel_image, hotel_image => hotel_image.hotel, { cascade: true })
  hotel_images: Hotel_image[];

  @OneToMany(() => Tour, tour => tour.hotel, { cascade: true })
  tours: Tour[];

  @OneToMany(() => Room, room => room.hotel, { cascade: true })
  rooms: Room[];
}
