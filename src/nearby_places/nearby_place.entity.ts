import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hotel } from 'src/hotels/hotel.entity'
@Entity('nearby_places')
export class Nearby_place { 
    @PrimaryGeneratedColumn()
    place_id: number ; 

    @Column()
    name: string ; 
    
    @Column()
    hotels_hotel_id: number;

    @ManyToOne(() => Hotel, hotel => hotel.nearby_places, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'hotels_hotel_id' })
    hotel: Hotel ;
}