import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hotel } from 'src/hotels/hotel.entity'
@Entity('hotel_facilities')
export class Hotel_facility {
    @PrimaryGeneratedColumn()
    facility_id: number ;

    @Column()
    name: string ;

    @Column()
    icon_url: string ;

    @ManyToOne(() => Hotel, hotel => hotel.hotel_facilities, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'hotels_hotel_id'})
    hotel: Hotel ;
}